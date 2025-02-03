import express from "express";
import { user } from "../models/user.js";

const router = express.Router();

// router.post("/signup", async (req, res) => {
//     try {
//       console.log(req.body);
//       const { firstname,lastname, email, password } = req.body;
//       const existing = await mentor.find({ email });
     
//       if (existing.length>0) {
//         return res.json({ success: false, message: "Email Already Exists" });
//       }
  
//       const hashedpassword = await bcrypt.hash(password, 10);
//       const newMentor = new mentor({
//         firstname,
//         lastname,
//         email,
//         password: hashedpassword,
//       });
//       await newMentor.save();
//       return res.json({ success: true, message: "Mentor Registered" });
//     } catch (err) {
//       return res.json(err);
//     }
//   });

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

