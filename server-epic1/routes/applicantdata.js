import express from "express";
import { applicantm } from "../models/applicant.js";

const router = express.Router();

router.get("/applicant-data", async (req, res) => {
  try {
    const email = req.body;
    const applicantdata = await applicantm.find({});
    if (!applicantdata) {
      return res.status(401).json({ message: "Invalid Email" });
    }
    return res.json(applicantdata); 
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export {router as applicantrouter}
