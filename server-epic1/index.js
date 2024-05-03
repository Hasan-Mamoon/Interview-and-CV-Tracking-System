import "./db.js"
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {mentorRouter} from "./routes/auth.js";
//import StudentRouter from "./Routes/studentRoutes.js";

const app = express();
dotenv.config();

app.use((req, res, next) => {
  // Set allowed origins (you can customize this based on your needs)
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin

  // Set allowed methods
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');

  // Set allowed headers (customize as needed)
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Continue to the next middleware
  next();
});

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3070/"],
    credentials: true,
  })
);
app.use("/auth", mentorRouter);
//app.use("/student", StudentRouter);


app.listen(process.env.PORT, () => {
  console.log("Server Created");
});