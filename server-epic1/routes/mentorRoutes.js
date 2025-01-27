import express from "express";
import { mentor } from "../models/mentor.js";

const router = express.Router();

router.get("/mentor-data", async (req, res) => {
  try {
    const email = req.body;
    const mentordata = await mentor.find({});
    if (!mentordata) {
      return res.status(401).json({ message: "Invalid Email" });
    }
    return res.json(mentordata); 
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/mentor/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { firstname,lastname, email, password } = req.body;
    const existing = await mentor.find({ email });
   
    if (existing.length>0) {
      return res.json({ success: false, message: "Email Already Exists" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const newMentor = new mentor({
      firstname,
      lastname,
      email,
      password: hashedpassword,
    });
    await newMentor.save();
    return res.json({ success: true, message: "Mentor Registered" });
  } catch (err) {
    return res.json(err);
  }
});

router.post('/schedule-meeting', async (req, res) => {
  const { title,url, date,time, participants } = req.body;

  try {
    const newMeeting = new meeting({ title, url, date,time, participants });
    await newMeeting.save();
    res.status(200).json({ success: true, message: 'Meeting scheduled successfully' });
  } catch (error) {
    console.error('Error scheduling meeting:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

export {router as mentorRouter};