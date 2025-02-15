import "./db.js"
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {authRouter} from "./routes/auth.js";
import { applicantrouter } from "./routes/applicantdata.js";
import { useRouter } from "./routes/userRoutes.js";
import { meetingRouter } from "./routes/meetingRoutes.js";
//import { ApplicantRouter } from "./routes/applicantdata.js";
//import StudentRouter from "./Routes/studentRoutes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: "http://localhost:3000", // Must match frontend origin exactly
  credentials: true, // Allows cookies
  allowedHeaders: ["Content-Type", "Authorization"], // Explicitly allow Authorization
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow required methods
}));

// ✅ Handle Preflight Requests (OPTIONS)
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204); // Respond with No Content (Preflight OK)
});
app.use("/auth", authRouter);
app.use('/user',useRouter)
app.use("/appdata",applicantrouter);
app.use("/meetings", meetingRouter);
//app.use("/applicant",ApplicantRouter);
//app.use("/student", StudentRouter);


app.listen(process.env.PORT, () => {
  console.log("Server Created");
});