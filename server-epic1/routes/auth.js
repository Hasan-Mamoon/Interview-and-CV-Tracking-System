// import bcrypt from "bcrypt";
// import  {mentor} from "../models/mentor.js";
// import { meeting } from "../models/meeting.js";
// import express from "express";
// import jwt from "jsonwebtoken";

// const router = express.Router();

// const checkAuth = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ loggedIn: false });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.Mentor_key);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ loggedIn: false });
//   }
// };

// // Route to check authentication status
// router.get('/mentor/check-auth', checkAuth, (req, res) => {
//   return res.json({ loggedIn: true });
// });

// router.post("/mentor/signin",async(req,res)=>{
//     try {
//         const { email, password } = req.body;
//           const mentoro = await mentor.findOne({ email });
//           if (!mentoro) {
//             return res.status(401).json({ message: "Invalid Email" });
//           }
//           const validpassword = await bcrypt.compare(password, mentoro.password);
//           if (!validpassword) {
//             return res.status(401).json({ message: "Wrong Password" });
//           }
//           const token = jwt.sign(
//             { email: mentoro.email},
//             process.env.Mentor_key,
//             { expiresIn: "1m" }
//           );
//           res.cookie("token", token, { httpOnly: true, maxAge: 60 * 1000 });
//           return res.json({ login: true, loading: false});
        
//       } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Internal Server Error" });
//       }

// });

// router.post("/mentor/signup", async (req, res) => {
//   try {
//     console.log(req.body);
//     const { firstname,lastname, username, email, password } = req.body;
//     const existing = await mentor.find({ email });
//     const existing2 = await mentor.find({username})
//     if (existing.length>0) {
//       return res.json({ success: false, message: "Email Already Exists" });
//     } else if(existing2.length>0){
//         return res.json({ success: false, message: "Username Already Taken" });

//     }

//     const hashedpassword = await bcrypt.hash(password, 10);
//     const newMentor = new mentor({
//       firstname,
//       lastname,
//       username,
//       email,
//       password: hashedpassword,
//     });
//     await newMentor.save();
//     return res.json({ success: true, message: "Mentor Registered" });
//   } catch (err) {
//     return res.json(err);
//   }
// });

// router.post('/schedule-meeting', async (req, res) => {
//   const { title,url, date,time, participants } = req.body;

//   try {
//     const newMeeting = new meeting({ title, url, date,time, participants });
//     await newMeeting.save();
//     res.status(200).json({ success: true, message: 'Meeting scheduled successfully' });
//   } catch (error) {
//     console.error('Error scheduling meeting:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });


// export { router as mentorRouter };

// import express, { json } from 'express';
// import cookieParser from 'cookie-parser';
// import { sign, verify } from 'jsonwebtoken';

// const router = express.Router();
// router.use(cookieParser());
// router.use(json());

// const SECRET_KEY = process.env.SECRET_KEY;

// // Login endpoint
// router.post('/auth/signin', (req, res) => {
//   const { email, password } = req.body;
//   // Validate user credentials (this is just an example, use a real validation method)
//   if (email === 'user@example.com' && password === 'password') {
//     const token = sign({ email }, SECRET_KEY, { expiresIn: '1h' });
//     res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
//     res.status(200).json({ message: 'Signed in successfully' });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });

// // Token validation endpoint
// router.post('/auth/validate-token', (req, res) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }
//   try {
//     const decoded = verify(token, SECRET_KEY);
//     res.status(200).json({ user: decoded });
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });

// router.listen(3070, () => {
//   console.log('Server is running on port 3070');
// });

import express, { json } from 'express';
// import { sign, verify } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { user } from '../models/user.js';

import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
const TOKEN_EXPIRATION = '15m'; // Token expiration time
const REFRESH_TOKEN_EXPIRATION = '3d'; // Refresh token expiration time

// Login endpoint
router.post('/auth/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await user.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
    const refreshToken = sign({ email: user.email, role: user.role }, REFRESH_SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRATION });

    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.status(200).json({ message: 'Signed in successfully' });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Middleware to check if the user is authenticated and has the correct role
const authenticate = (roles) => {
  return (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = verify(token, SECRET_KEY);
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = decoded;
      next();
    } catch (error) {
      console.error('Token validation failed:', error);
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

// Example protected route
router.get('/admin', authenticate(['admin']), (req, res) => {
  res.status(200).json({ message: 'Welcome, admin!' });
});

// router.listen(3070, () => {
//   console.log('Server is running on port 3070');
// });

export {router as authRouter}