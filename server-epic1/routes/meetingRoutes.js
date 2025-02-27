import express from "express";
import { user } from "../models/user.js";

import { meeting } from "../models/meeting.js";
import mongoose from "mongoose";
import pkg from "jsonwebtoken";
const { verify } = pkg;

const router = express.Router();

router.post("/schedule-meeting", async (req, res) => {
  const { title, url, date, time, interviewee, participants } = req.body;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newMeeting = new meeting({
      title,
      url,
      date,
      time,
      interviewee,
      participants,
    });
    const savedMeeting = await newMeeting.save({ session });

    if (!savedMeeting) {
      throw new Error("Meeting could not be saved");
    }

    //Update candidate status to "scheduled"
    const updatedCandidate = await user.findOneAndUpdate(
      { email: interviewee },
      { interview: "scheduled" },
      { session, new: true }
    );

    if (!updatedCandidate) {
      throw new Error("Candidate not found or status update failed");
    }

    // Commit the transaction if both steps succeed
    await session.commitTransaction();
    session.endSession();

    res
      .status(200)
      .json({
        success: true,
        message: "Meeting scheduled & candidate updated successfully",
      });
  } catch (error) {
    await session.abortTransaction(); //Rollback if anything fails
    session.endSession();

    console.error("Error scheduling meeting:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Read all meetings
router.get("/meetings", async (req, res) => {
  try {
    const meetings = await meeting.find();
    res.status(200).json(meetings);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email query parameter is required" });
    }

    const meetings = await meeting.find({
      participants: { $regex: new RegExp(email, "i") },
    });

    if (meetings.length === 0) {
      return res
        .status(404)
        .json({ message: "No meetings found for this email" });
    }

    res.json(meetings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/meetings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url, date, time, interviewee, participants } = req.body;
    const updatedMeeting = await meeting.findByIdAndUpdate(
      id,
      { title, url, date, time, interviewee, participants },
      { new: true, runValidators: true }
    );
    if (!updatedMeeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }
    res
      .status(200)
      .json({ message: "Meeting updated successfully", updatedMeeting });
  } catch (error) {
    console.error("Error updating meeting:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a meeting by title

router.delete("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Extract token from headers
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify token
    try {
      verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const deletedMeeting = await meeting.findOneAndDelete({
      interviewee: email,
    });
    if (!deletedMeeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.status(200).json({ message: "Meeting deleted successfully" });
  } catch (error) {
    console.error("Error deleting meeting:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as meetingRouter };
