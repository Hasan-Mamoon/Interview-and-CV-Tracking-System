import express from "express";
import { user } from "../models/user.js";

const router = express.Router();

router.get("/applicant-data", async (req, res) => {
  try {
    const email = req.body;
    const applicantdata = await user.find({role: "applicant",interview:"Not-Scheduled"});
    if (!applicantdata) {
      return res.status(401).json({ message: "Invalid Email" });
    }
    return res.json(applicantdata); 
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/update-status/:email", async (req, res) => {
  try {
    const email = req.params.email; // Extract email from URL parameters
    const { status } = req.body; // Extract status from request body

    const applicantdata = await user.findOne({ email: email });
    if (!applicantdata) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    // Update the user's status
    applicantdata.interview = status;
    await applicantdata.save();

    return res.json({ message: "Status updated successfully", applicantdata });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export {router as applicantrouter}
