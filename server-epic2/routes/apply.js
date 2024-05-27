import applyModel from "../models/apply.js";
import express from "express";

const app = express.Router();

app.post("/for-interview", async (req, res) => {
  try {
    const { firstname, lastname, uniname, department, gpa, email } = req.body;
    const existing = await applyModel.findOne({ email: email });
    if (existing) {
      return res.status(409).json({ message: "Email Already Exists" });
    }
    await applyModel.create({
      firstname,
      lastname,
      uniname,
      department,
      gpa,
      email,
    });
    return res.json({ success: true, message: "Applied for Interview" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default app;
