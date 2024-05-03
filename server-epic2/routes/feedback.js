import feedbackModel from "../models/feedback.js";
import express from "express";

const app = express.Router();

app.get("/feedback", async (req, res) => {
  try {
    const feedbackData = await feedbackModel.find({}, { feedback: 1 });
    return res.json({ success: true, data: feedbackData });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default app;
