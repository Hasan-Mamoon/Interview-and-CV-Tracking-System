import "./db.js"
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { applyRouter } from "./routes/apply.js";
import { dataRouter } from "./routes/dataFetch.js";


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

//Handle Preflight Requests (OPTIONS)
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204); // Respond with No Content (Preflight OK)
});


app.use("/apply", applyRouter);
app.use("/applicant", dataRouter);



app.listen(process.env.PORT, () => {
  console.log("Server Created");
});