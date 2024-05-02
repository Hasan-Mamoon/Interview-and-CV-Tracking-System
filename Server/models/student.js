import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
});
const studentModel = mongoose.model("Student", studentSchema);
export { studentModel as student };
