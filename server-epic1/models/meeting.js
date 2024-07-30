import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    date: {type: Date,required:true},
    participants: {type: Array,required:true},
    

  });
  const meetingModel = mongoose.model("Meetings", meetingSchema);
  export { meetingModel as meeting };