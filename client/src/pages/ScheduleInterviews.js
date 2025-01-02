// // src/ScheduledMeeting.js
// import React, { useState } from 'react';
// import { Container, TextField, Button, Typography, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function ScheduledMeeting() {
//   const [meetingData, setMeetingData] = useState({
//     title: '',
//     url:'',
//     date: '',
//     time: '',
//     participants: '',
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setMeetingData({
//       ...meetingData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3070/auth/schedule-meeting', meetingData);
//       alert('Meeting scheduled successfully');
//       navigate('/mentor/dashboard'); // Redirect to the dashboard or another page
//     } catch (error) {
//       console.error('Error scheduling meeting:', error);
//       alert('Scheduled');
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h4" gutterBottom align="center">
//           Schedule a Meeting
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Meeting Title"
//             name="title"
//             value={meetingData.title}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Meeting Url"
//             name="url"
//             value={meetingData.url}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Date"
//             name="date"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             value={meetingData.date}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Time"
//             name="time"
//             type="time"
//             InputLabelProps={{ shrink: true }}
//             value={meetingData.time}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Participants"
//             name="participants"
//             value={meetingData.participants}
//             onChange={handleChange}
//             required
//           />
//           <Box sx={{ mt: 2 }}>
//             <Button variant="contained" color="primary" type="submit">
//               Schedule Meeting
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Container>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { Container, Box, Typography, TextField, Button } from '@mui/material';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// const ScheduleInterviews = () => {
//   const [meetingData, setMeetingData] = useState({
//     title: '',
//     url: '',
//     date: '',
//     time: '',
//     participants: '',
//   });

//   const { id } = useParams(); // Get candidate ID from URL
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch candidate details if needed
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setMeetingData({
//       ...meetingData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3070/auth/schedule-meeting', meetingData);
//       await axios.put(`http://localhost:3070/appdata/update-status/${id}`, { status: 'scheduled' });
//       alert('Meeting scheduled successfully');
//       navigate('/mentor/dashboard'); // Redirect to the dashboard or another page
//     } catch (error) {
//       console.error('Error scheduling meeting:', error);
//       alert('Error scheduling meeting');
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h4" gutterBottom align="center">
//           Schedule a Meeting
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Meeting Title"
//             name="title"
//             value={meetingData.title}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Meeting Url"
//             name="url"
//             value={meetingData.url}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Date"
//             name="date"
//             value={meetingData.date}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Time"
//             name="time"
//             value={meetingData.time}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Participants"
//             name="participants"
//             value={meetingData.participants}
//             onChange={handleChange}
//             required
//           />
//           <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
//             Schedule Meeting
//           </Button>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default ScheduleInterviews;

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