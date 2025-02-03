import React, { useState, useContext } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CandidateContext } from '../Context/CandidateContext';

const ScheduleInterviews = () => {
  

  const { candidateId,candidateEmail } = useContext(CandidateContext); // Get candidate ID from context
  const [meetingData, setMeetingData] = useState({
    title: '',
    url: '',
    date: '',
    time: '',
    participants: candidateEmail + ", ",
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
      await axios.post('http://localhost:3070/auth/schedule-meeting', meetingData);
      await axios.put(`http://localhost:3070/appdata/update-status/${candidateId}`, { status: 'scheduled' });
      alert('Meeting scheduled successfully');
      navigate('/mentor/dashboard'); // Redirect to the dashboard or another page
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      alert('Error scheduling meeting');
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
            name="url"
            value={meetingData.url}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Date"
            name="date"
            value={meetingData.date}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Time"
            name="time"
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
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Schedule Meeting
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ScheduleInterviews;