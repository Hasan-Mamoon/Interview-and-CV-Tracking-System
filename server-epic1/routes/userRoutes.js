import express from "express";
import { user } from "../models/user.js";
import {meeting} from "../models/meeting.js";

const router = express.Router();



    router.post('/signup', async (req, res) => {
    
        const { email,firstname,lastname, password, role} = req.body;

        console.log(email,firstname,lastname, password, role);
  
        try {
        // if (role === "applicant") {
        //     // if (!req.file) {
        //     // return res.status(400).json({ message: "Your cv is required" });
        //     // }
        //     // const imageName = randomImageName();
        //     // const buffer = await sharp(req.file.buffer)
        //     //     .resize({ height: 1080, width: 1920, fit: "contain" })
        //     //     .toBuffer();

        //     // // Upload the license image to S3
        //     // const params = {
        //     //     Bucket: bucketName,
        //     //     Key: imageName,
        //     //     Body: buffer,
        //     //     ContentType: req.file.mimetype,
        //     // };

        //     // const command = new PutObjectCommand(params);
        //     // await s3.send(command);
    
        //     // Save doctor to PendingDoctor collection
        //     const newUser = new user({
        //     email,
        //     password,
        //     firstname,
        //     lastname,
        //     role,
        //     interview: 'Not-Scheduled',
        //     status: 'Pending',
        //     });
        //     await newUser.save();
    
        //     return res
        //     .status(200)
        //     .json({ message: "Registration Successful", email, role: newUser.role});
        
        // }
        if(role == 'applicant'){
            const interview = 'Not-Scheduled';
            const status = 'Pending';
            const newUser = await user.signup(email, password, firstname,lastname,status,interview,role);
            return res.status(201).json({ success: true, message: "Applicant Registered", user: newUser });
        }
        // Handle non-doctor signup
        console.log("log2: ",email,firstname,lastname, password, role);
         const newUser = await user.signup(email, password, firstname,lastname,role);
    
        // Create token
    
        return res.status(201).json({ success: true, message: "Mentor Registered", user: newUser });
        } catch (error) {
            console.error('Error signing up:', error);
            return res.status(error.code || 500).json({ success: false, message: error.message });
        }
    });

    // router.post('/schedule-meeting', async (req, res) => {
    //     const { title,url, date,time, participants } = req.body;
    //     try {
    //       const newMeeting = new meeting({ title, url, date,time, participants });
    //       await newMeeting.save();
    //       res.status(200).json({ success: true, message: 'Meeting scheduled successfully' });
    //     } catch (error) {
    //       console.error('Error scheduling meeting:', error);
    //       res.status(500).json({ success: false, message: 'Internal Server Error' });
    //     }
    //   });
  

//   router.post('/login',async(req,res)=>{
//         const { email, password } = req.body;

//         try {
//           const userDetails = await user.login(email, password);
      
//           // Create token
//           const token = createToken(userDetails._id, userDetails.role);
//           res.status(200).json({ email, role: userDetails.role, token });
//         } catch (error) {
//           console.error(error);
//           res.status(400).json({ error: error.message });
//         }
//     });
      
export {router as useRouter}

