import bcrypt from "bcrypt";
import { mentor } from "../models/student.js";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/student/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const mentoro = await mentor.findOne({ email });
    if (!mentoro) {
      return res.json({ message: "Invalid Email" });
    }
    const validpassword = await bcrypt.compare(password, mentoro.password);
    if (!validpassword) {
      return res.json({ message: "Wrong Password" });
    }
    const token = jwt.sign({ email: mentoro.email }, process.env.Mentor_key, {
      expiresIn: "1m",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 1000 });
    return res.json({ login: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
