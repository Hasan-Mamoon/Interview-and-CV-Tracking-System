import mongoose, { Schema as _Schema, model } from "mongoose";
import { genSalt, hash as _hash, compare } from "bcrypt";
import validator from "validator"; // Import validator as the default export

const { isEmail, isStrongPassword } = validator; // Destructure the required methods

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
  status: { type: String},
  interview: { type: String },
  cv:{type:String},
});

// userSchema.pre('save', function (next) {
//   if (this.role === 'applicant') {
//     if (!this.image || !this.cv) {
//       return next(new Error('Users must have an image and a CV'));
//     }
//   }
//   next();
// });

// static signup method
userSchema.statics.signup = async function (email, password, firstname, lastname, role) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  console.log("email: ",email,"pass: ", password, role);
  //validate fields
  if (!email || !password || !role) {
    throw Error("All fields must be filled");
  }


  // validate email format
  if (!emailPattern.test(email)) {
    throw Error("Email format is not valid");
  }

  // Split and check email domain parts
  const emailParts = email.split("@");
  if (emailParts.length !== 2) {
    throw Error("Invalid email structure");
  }

  const [localPart, domain] = emailParts;
  const domainParts = domain.split(".");

  // check for invalid domain
  const domainString = domainParts.join(".");
  if (/(\.\w+)\1/.test(domainString)) {
    throw Error("Email contains repetitive domain patterns like .com.com");
  }

  // Check local part length
  if (localPart.length < 2 || localPart.length > 64) {
    throw Error("Email local part must be between 2 and 64 characters long");
  }

  // Check domain parts length and number
  if (
    domainParts.length < 2 ||
    domainParts.some((part) => part.length < 2 || part.length > 63)
  ) {
    throw Error("Invalid email domain structure");
  }

  // Stronger email validations for TLD and subdomains
  const tld = domainParts[domainParts.length - 1];
  if (!/^[a-zA-Z]{2,}$/.test(tld)) {
    throw Error("Invalid top-level domain in email");
  }

  // Additional checks using validator
  if (!isEmail(email)) {
    throw Error("Email is not valid");
  }

  // Password strength validation
  if (!isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  //unique constraints

  console.log("role: ",role);
  if (!["mentor", "applicant"].includes(role)) {
    throw Error("Invalid role");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  // Hash password and create user
  const salt = await genSalt(10);
  const hash = await _hash(password, salt);
  if(role == 'applicant'){
    const user = await this.create({ email, password: hash, firstname, lastname,role,
       interview: 'Not-Scheduled' ,status: "Pending" });
    
    return user;
  }

  const user = await this.create({ email, password: hash, firstname, lastname,role });
  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

const userModel = mongoose.model("User", userSchema);

export { userModel as user };
