import mongoose from "mongoose";
const feedbackSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  feedback: [
    {
      interviewFeedback: { type: String, required: true },
      suggestionsForImprovement: { type: String },
      progressTracking: { type: String },
      actionableAdvice: { type: String },
    },
  ],
});
export default mongoose.model("feedback", feedbackSchema);
