import mongoose from "mongoose";
const applySchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mockInterviews: [
    {
      preferredTimeAndDate: { type: String, required: true },
      interviewFormat: { type: String, required: true },
      specificInterviewRequests: { type: String },
      additionalNotes: { type: String },
    },
  ],
});
export default mongoose.model("apply", applySchema);
