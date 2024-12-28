// src/ScheduledMeeting.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ScheduledMeeting() {
  const [meetingData, setMeetingData] = useState({
    title: '',
    date: '',
    time: '',
    participants: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingData({
      ...meetingData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3045/schedule-meeting', meetingData);
      alert('Meeting scheduled successfully');
      navigate('/'); // Redirect to the dashboard or another page
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      alert('Scheduled');
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
          <TextField
            fullWidth
            margin="normal"
            label="Meeting Url"
            name="meeting-url"
            value={meetingData.title}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Date"
            name="date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={meetingData.date}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Time"
            name="time"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={meetingData.time}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Participants"
            name="participants"
            value={meetingData.participants}
            onChange={handleChange}
            required
          />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" type="submit">
              Schedule Meeting
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
