import bcrypt from "bcrypt";
import { mentor } from "../models/mentor.js";
import express from "express";

const router = express.Router();

router.post("/signin",async(req,res)=>{


});

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existing = await mentor.find({ email });
    if (existing.length>0) {
      return res.json({ success: false, message: "Email Already Exist" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const newMentor = new mentor({
      username,
      email,
      password: hashedpassword,
    });
    await newMentor.save();
    return res.json({ success: true, message: "Mentor Registered" });
  } catch (err) {
    return res.json(err);
  }
});


export { router as mentorRouter };