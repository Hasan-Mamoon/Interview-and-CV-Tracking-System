import bcrypt from "bcrypt";
import detailModel from "../models/details.js";
import express from "express";

const app = express.Router();

app.post("/student-details", async (req, res) => {
  try {
    const { rollno, email, grade, password, uploadedDetails } = req.body;
    const existing = await detailModel.findOne({ email: email });
    if (existing) {
      return res.json({ success: false, message: "Email Already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await detailModel.create({
      rollno,
      email,
      grade,
      password: hashedPassword,
      uploadedDetails,
    });
    return res.json({ success: true, message: "Details Uploaded" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default app;
