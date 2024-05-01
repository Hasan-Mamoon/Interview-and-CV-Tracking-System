import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
});
const mentorModel = mongoose.model("Mentor", mentorSchema);
export { mentorModel as mentor };