import "./db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { adminRouter } from "./Routes/auth.js";
import StudentRouter from "./Routes/studentRoutes.js";

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173/"],
    credentials: true,
  })
);
app.use("/auth", adminRouter);
app.use("/student", StudentRouter);


app.listen(process.env.PORT, () => {
  console.log("Server Created");
});