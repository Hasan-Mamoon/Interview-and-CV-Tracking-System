import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  pdf: { type: Buffer, required: true },
  contentType: { type: String, required: true },
  status: { type: String, required: true, default: "Pending" },
  interview: { type: String, required: true, default: "Not-Scheduled" },
});
const applicantModel = mongoose.model("Applicant", applicantSchema);
export { applicantModel as applicant };
