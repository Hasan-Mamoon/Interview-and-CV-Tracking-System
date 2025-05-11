import React, { useState, useContext } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CandidateContext } from "../../Context/CandidateContext";
import { AuthContext } from "../../Context/AuthContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

const ScheduleInterviews = () => {
  const { candidateEmail } = useContext(CandidateContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [meetingData, setMeetingData] = useState({
    title: "",
    url: "",
    date: null,
    time: null,
    interviewee: candidateEmail,
    participants: auth.user.email + ", " + candidateEmail,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingData({
      ...meetingData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setMeetingData({
      ...meetingData,
      date,
    });
    console.log("date", meetingData.date);
  };

  const handleTimeChange = (time) => {
    setMeetingData({
      ...meetingData,
      time,
    });
    console.log("time", meetingData.time);
  };

  const generateMeetingUrl = () => {
    if (meetingData.title && meetingData.date && meetingData.time) {
      const formattedDate = dayjs(meetingData.date).format("YYYYMMDD");
      const formattedTime = dayjs(meetingData.time).format("HHmm");
      const roomName = `${meetingData.title}-${formattedDate}-${formattedTime}`;
      return `https://meet.jit.si/${roomName}`;
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!meetingData.date || !meetingData.time) {
      alert("Please select both date and time.");
      return;
    }

    // Merge date and time
    const finalDateTime = dayjs(meetingData.date)
      .hour(dayjs(meetingData.time).hour())
      .minute(dayjs(meetingData.time).minute())
      .second(0) // Reset seconds
      .millisecond(0) // Reset milliseconds
      .toISOString(); // Convert to standard format

    console.log("Final Merged Date-Time:", finalDateTime);

    const meetingUrl = generateMeetingUrl();
    try {
      const finalMeetingData = {
        ...meetingData,
        date: finalDateTime, // Store merged timestamp
        url: meetingUrl,
      };

      await axios.post(
        `${process.env.REACT_APP_EPIC1_URL}/meetings/schedule-meeting`,
        finalMeetingData,
        { withCredentials: true }
      );

      alert("Meeting scheduled successfully");
      navigate("/mentor/dashboard");
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      alert("Failed to schedule meeting");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Schedule a Meeting
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Meeting Title"
            name="title"
            value={meetingData.title}
            onChange={handleChange}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Meeting Date"
              value={meetingData.date}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} fullWidth required sx={{ mb: 2 }} />
              )}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Meeting Time"
              value={meetingData.time}
              onChange={handleTimeChange}
              renderInput={(params) => (
                <TextField {...params} fullWidth required sx={{ mb: 2 }} />
              )}
            />
          </LocalizationProvider>

          <TextField
            fullWidth
            margin="normal"
            label="Participants"
            name="participants"
            value={meetingData.participants}
            onChange={handleChange}
            required
          />

          <Typography variant="body1" sx={{ mt: 2 }}>
            Meeting Link: <strong>{generateMeetingUrl()}</strong>
          </Typography>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Schedule Meeting
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ScheduleInterviews;
