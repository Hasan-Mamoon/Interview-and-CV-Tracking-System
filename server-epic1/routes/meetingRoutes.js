import express from 'express';
import { meeting } from '../models/meeting.js';

const router = express.Router();

// Create a new meeting
    router.post('/schedule-meeting', async (req, res) => {
        const { title,url, date,time,interviewee, participants } = req.body;
        try {
          const newMeeting = new meeting({ title, url, date,time,interviewee, participants });
          await newMeeting.save();
          res.status(200).json({ success: true, message: 'Meeting scheduled successfully' });
        } catch (error) {
          console.error('Error scheduling meeting:', error);
          res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
      });

// Read all meetings
router.get('/meetings', async (req, res) => {
  try {
    const meetings = await meeting.find();
    res.status(200).json(meetings);
  } catch (error) {
    console.error('Error fetching meetings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Read a single meeting by email
router.get('/:email', async (req, res) => {
  // try {
  //   const { email } = req.params;
  //   console.log("email",email)
  //   const meetingData = await meeting.find({ participants: { $in: [email] } });
  //   console.log("meeting data",meetingData)
  //   if (!meetingData) {
  //     return res.status(404).json({ message: 'Meeting not found' });
  //   }
  //   res.status(200).json(meetingData);
  // } catch (error) {
  //   console.error('Error fetching meeting:', error);
  //   res.status(500).json({ message: 'Internal Server Error' });
  // }
  try {
    const { email } = req.params;
    console.log("email",email);
    if (!email) {
        return res.status(400).json({ message: "Email query parameter is required" });
    }

    const meetings = await meeting.find({ participants: { $regex: new RegExp(email, "i") } });
    
    if (meetings.length === 0) {
        return res.status(404).json({ message: "No meetings found for this email" });
    }

    res.json(meetings);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
}
});

// Update a meeting by ID
router.put('/meetings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url, date, time, interviewee ,participants } = req.body;
    const updatedMeeting = await meeting.findByIdAndUpdate(
      id,
      { title, url, date, time, interviewee,participants },
      { new: true, runValidators: true }
    );
    if (!updatedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.status(200).json({ message: 'Meeting updated successfully', updatedMeeting });
  } catch (error) {
    console.error('Error updating meeting:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a meeting by ID
router.delete('/meetings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMeeting = await meeting.findByIdAndDelete(id);
    if (!deletedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    console.error('Error deleting meeting:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export { router as meetingRouter };