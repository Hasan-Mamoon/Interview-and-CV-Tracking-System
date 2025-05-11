import express from "express";
import axios from "axios";
import { applicantm } from "../models/applicant.js";
import mongoose from "mongoose";
import pkg from "jsonwebtoken";
import { meeting } from "../models/meeting.js";
const { verify } = pkg;

const router = express.Router();

router.get("/applicant-data", async (req, res) => {
  try {
    const applicantdata = await applicantm.find({
      interview: "Not-Scheduled",
    });
    if (!applicantdata) {
      return res.status(401).json({ message: "No applicants found" });
    }
    return res.json(applicantdata);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/meetings/count", async (req, res) => {
  try {
    const count = await meeting.countDocuments();
    res.status(200).json({ totalMeetings: count });
  } catch (error) {
    console.error("Error counting meetings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/users/count-pending", async (req, res) => {
  try {
    const count = await applicantm.countDocuments({
      status: "Pending",
      interview: "Not-Scheduled",
    });
    res.status(200).json({ pendingUsers: count });
  } catch (error) {
    console.error("Error counting pending users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/update-status/:email", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const email = req.params.email;
    const { status, interview } = req.body;
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token found" });
    }

    try {
      verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    //Fetch applicant data inside transaction
    const applicantdata = await applicantm.findOne({ email }).session(session);
    if (!applicantdata) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "User not found" });
    }

    // Update applicant's status inside transaction
    applicantdata.status = status;
    applicantdata.interview = interview;
    await applicantdata.save({ session });

    // If status is "rejected", attempt to delete the meeting inside transaction
    if (status === "rejected") {
      try {
        await axios.delete(`http://localhost:3070/meetings/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Cookie: `token=${token}`,
          },
          withCredentials: true,
        });

        console.log("Meeting deleted successfully.");
      } catch (error) {
        console.error(
          "Error deleting meeting:",
          error.response?.data || error.message
        );

        // Rollback transaction if meeting deletion fails
        await session.abortTransaction();
        session.endSession();

        return res
          .status(500)
          .json({ message: "Failed to delete meeting. Transaction aborted." });
      }
    }

    await session.commitTransaction();
    session.endSession();

    return res.json({ message: "Status updated successfully", applicantdata });
  } catch (err) {
    console.error("Error updating status:", err);
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as applicantrouter };
