import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  status: { type: String, required: true, default: "Pending" },
  interview: { type: String, required: true, default: "Not-Scheduled" },
  cv:{type:String, required:true},
  speciality: { type: String, required:true },
  degree: { type: String, required:true },
  experience: { type: String, required:true },
  about: { type: String, required:true },
});
const applicantModel = mongoose.model("Applicant", applicantSchema);

export { applicantModel as applicantm };

