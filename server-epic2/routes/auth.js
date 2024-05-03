import bcrypt from "bcrypt";
import  {mentor} from "../models/mentor.js";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/mentor/signin",async(req,res)=>{
    try {
        const { email, password } = req.body;
          const mentoro = await mentor.findOne({ email });
          if (!mentoro) {
            return res.status(401).json({ message: "Invalid Email" });
          }
          const validpassword = await bcrypt.compare(password, mentoro.password);
          if (!validpassword) {
            return res.status(401).json({ message: "Wrong Password" });
          }
          const token = jwt.sign(
            { email: mentoro.email},
            process.env.Mentor_key,
            { expiresIn: "1m" }
          );
          res.cookie("token", token, { httpOnly: true, maxAge: 60 * 1000 });
          return res.json({ login: true,});
        
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

});

router.post("/mentor/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { firstname,lastname, username, email, password } = req.body;
    const existing = await mentor.find({ email });
    const existing2 = await mentor.find({username})
    if (existing.length>0) {
      return res.json({ success: false, message: "Email Already Exists" });
    } else if(existing2.length>0){
        return res.json({ success: false, message: "Username Already Taken" });

    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const newMentor = new mentor({
      firstname,
      lastname,
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