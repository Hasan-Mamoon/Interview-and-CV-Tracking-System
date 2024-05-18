import detailModel from "../models/details.js";
import express from "express";

const app = express.Router();

app.post("/student-details", async (req, res) => {
  try {
    const { email, firstname, lastname, dob, phoneno, gender } = req.body;
    const existing = await detailModel.findOne({ email: email });
    if (existing) {
      return res.status(409).json({ message: "Email Already Exists" });
    }
    await detailModel.create({
      email,
      firstname,
      lastname,
      dob,
      phoneno,
      gender,
    });
    return res.json({ success: true, message: "Details Uploaded" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default app;
