import mongoose from "mongoose";
import "dotenv/config";

const Connection = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("DB CONNECTED");
  } catch (err) {
    console.log("Error connecting to the database:", err);
  }
};

Connection();
