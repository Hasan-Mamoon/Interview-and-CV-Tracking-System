import bcrypt from "bcrypt";
import applyModel from "../models/apply.js";
import express from "express";

const app = express.Router();

app.post("/for-interview", async (req, res) => {
  try {
    const { rollno, email, grade, password, mockInterviews } = req.body;
    const existing = await applyModel.findOne({ email: email });
    if (existing) {
      return res.json({ success: false, message: "Email Already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await applyModel.create({
      rollno,
      email,
      grade,
      password: hashedPassword,
      mockInterviews,
    });
    return res.json({ success: true, message: "Applied for Interview" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default app;
