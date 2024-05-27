import React from 'react';
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";

import {Grid} from "@mui/material";
import {Container} from '@mui/material';
import {CardContent} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react';
import axios from 'axios';
export default function ReviewCvs() {
    const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3045/apply/for-interview');
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, []);
  return (
    <Container>
      <Typography variant="h2" gutterBottom align="center">
        User Details
      </Typography>
      <Grid container spacing={3}>
        {details.map((detail) => (
          <Grid item xs={12} sm={6} md={4} key={detail._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  {/* {detail.username} */}
                  ALI
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {detail.email}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">Contact Information: {detail.uploadedDetails.email}</Typography>
                  <Typography variant="body1">Educational Background: {detail.uploadedDetails.grade}</Typography>
                  <Typography variant="body1">Resume: <a href={detail.uploadedDetails.mockInterviews} target="_blank" rel="noopener noreferrer">View</a></Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
  
}
