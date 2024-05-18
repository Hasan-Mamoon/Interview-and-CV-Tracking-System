import mongoose from "mongoose";
const detailsSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  dob: { type: String, required: true },
  phoneno: { type: String, required: true },
  gender: { type: String, required: true },
});
export default mongoose.model("details", detailsSchema);
