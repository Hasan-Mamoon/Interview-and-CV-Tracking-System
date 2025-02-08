import express from "express";
import bcrypt from 'bcrypt';
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



export {router as mentorRouter};
//authRouter.authenticate(['mentor'])