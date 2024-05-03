import "./db.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import ApplyRoute from "./routes/apply.js";
import DetailsRoute from "./routes/details.js";
import FeedbackRoute from "./routes/feedback.js";
import { studentRouter } from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/apply", ApplyRoute);
app.use("/upload", DetailsRoute);
app.use("/view", FeedbackRoute);
app.use("/student", studentRouter);
app.listen(process.env.PORT, () => {
  console.log("server Litnening");
});
