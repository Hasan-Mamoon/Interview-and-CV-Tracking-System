import mongoose from "mongoose";
const applySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  uniname: { type: String, required: true, unique: true },
  department: { type: String, required: true, unique: true },
  gpa: { type: String, required: true, unique: true },
});
export default mongoose.model("apply", applySchema);
