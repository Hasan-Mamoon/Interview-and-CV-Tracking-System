import bcrypt from "bcrypt";
import { student } from "../models/student.js";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const studentt = await student.findOne({ email });
    if (!studentt) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const validPassword = await bcrypt.compare(password, studentt.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ email: studentt.email }, process.env.studentkey, {
      expiresIn: "1m",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 1000 });
    return res.json({ message: "Sign-in successful", login: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { firstname, lastname, username, email, password } = req.body;
    const existing = await student.find({ email });
    const existing2 = await student.find({ username });
    if (existing.length > 0) {
      return res.json({ success: false, message: "Email Already Exists" });
    } else if (existing2.length > 0) {
      return res.json({ success: false, message: "Username Already Taken" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const newstudent = new student({
      firstname,
      lastname,
      username,
      email,
      password: hashedpassword,
    });
    await newstudent.save();
    return res.json({ success: true, message: "Student Registered" });
  } catch (err) {
    return res.json(err);
  }
});

export { router as studentRouter };
