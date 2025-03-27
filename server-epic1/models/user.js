import mongoose, { Schema as _Schema, model } from "mongoose";
import { genSalt, hash as _hash, compare } from "bcrypt";
import validator from "validator";

const { isEmail, isStrongPassword } = validator;

const Schema = _Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["applicant", "mentor"],
    required: true,
  },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },

});

// static signup method
userSchema.statics.signup = async function (email, password, firstname, lastname, role) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  console.log("email: ",email,"pass: ", password, role);
  //validate fields
  if (!email || !password || !role) {
    const error = new Error("All fields must be filled");
    error.code = 400;
    throw error;
  }


  // validate email format
  if (!emailPattern.test(email)) {
    const error = new Error("Email format is not valid");
    error.code = 400;
    throw error;
  }

  // Split and check email domain parts
  const emailParts = email.split("@");
  if (emailParts.length !== 2) {
    const error = new Error("Invalid email structure");
    error.code = 400;
    throw error;
  }

  const [localPart, domain] = emailParts;
  const domainParts = domain.split(".");

  // check for invalid domain
  const domainString = domainParts.join(".");
  if (/(\.\w+)\1/.test(domainString)) {
    const error = new Error("Email contains repetitive domain patterns like .com.com");
    error.code = 400;
    throw error;
  }

  // Check local part length
  if (localPart.length < 2 || localPart.length > 64) {
    const error = new Error("Local part of the email must be between 2 and 64 characters");
    error.code = 400;
    throw error;
  }

  // Check domain parts length and number
  if (
    domainParts.length < 2 ||
    domainParts.some((part) => part.length < 2 || part.length > 63)
  ) {
    
    const error = new Error("Local part of the email must be between 2 and 64 characters");
    error.code = 400;
    throw error;
  }

  // Stronger email validations for TLD and subdomains
  const tld = domainParts[domainParts.length - 1];
  if (!/^[a-zA-Z]{2,}$/.test(tld)) {
    const error = new Error("Invalid top-level domain in email");
    error.code = 400;
    throw error;
  }

  // Additional checks using validator
  if (!isEmail(email)) {
    const error = new Error("Email not valid");
    error.code = 400;
    throw error;
    
  }

  // Password strength validation
  if (!isStrongPassword(password)) {
    const error = new Error("Password not strong");
    error.code = 400;
    throw error;
  }

  //unique constraints

  console.log("role: ",role);
  if (!["mentor", "applicant"].includes(role)) {
    const error = new Error("Invalid role");
    error.code = 400;
    throw error;
  }

  const exists = await this.findOne({ email });

  if (exists) {
    const error = new Error("Email already exists");
    error.code = 409;
    throw error;
  }

  // Hash password and create user
  const salt = await genSalt(10);
  const hash = await _hash(password, salt);

  const user = await this.create({ email, password: hash, firstname, lastname,role });
  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    const error = new Error("All fields must be filled");
    error.code = 400;
    throw error;
  }

  const user = await this.findOne({ email });

  if (!user) {
    const error = new Error("User not Found");
    error.code = 404;
    throw error;
  }

  const match = await compare(password, user.password);

  if (!match) {
    const error = new Error("Unauthorized");
    error.code = 401;
    throw error;
  }

  return user;
};

const userModel = mongoose.model("User", userSchema);

export { userModel as user };
