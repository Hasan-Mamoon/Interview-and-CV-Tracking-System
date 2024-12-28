import bcrypt from "bcrypt";
import  {mentor} from "../models/mentor.js";
import { meeting } from "../models/meeting.js";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const checkAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ loggedIn: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.Mentor_key);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ loggedIn: false });
  }
};

// Route to check authentication status
router.get('/mentor/check-auth', checkAuth, (req, res) => {
  return res.json({ loggedIn: true });
});

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
          return res.json({ login: true, loading: false});
        
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


export { router as mentorRouter };