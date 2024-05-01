import bcrypt from "bcrypt";
import  {mentor} from "../models/mentor.js";
import express from "express";

const router = express.Router();

router.post("/mentor/signin",async(req,res)=>{


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