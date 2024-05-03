import mongoose from "mongoose";
const detailsSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  uploadedDetails: {
    name: { type: String, required: true },
    contactInformation: { type: String, required: true },
    educationalBackground: { type: String, required: true },
    resume: { type: String, required: true },
    areaOfInterest: { type: String, required: true },
    availability: { type: String, required: true },
  },
});
export default mongoose.model("details", detailsSchema);
