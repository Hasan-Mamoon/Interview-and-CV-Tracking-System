import express from "express";
import { applicantm } from "../models/applicant.js";

const router = express.Router();

router.get("/application-status/:email", async (req, res) => {
    try {
      const { email } = req.params;

  
      // Find the user by email
      const userdata = await applicantm.findOne({ email });
  
      console.log("userdata", userdata);  
      if (!userdata) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Extract the application status
      const applicationStatus = userdata.status || null;
      const interviewStatus = userdata.interview || null;
  
      res.json({ status: applicationStatus, interview:interviewStatus });
    } catch (error) {
      console.error("Error fetching application status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


export {router as dataRouter};