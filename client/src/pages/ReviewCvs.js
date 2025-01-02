// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   Grid,
//   Container,
//   CardContent,
//   Button,
//   Collapse,
// } from "@mui/material";
// import axios from "axios";

// export default function ReviewCvs() {
//   const [details, setDetails] = useState([]);
//   const [expandedId, setExpandedId] = useState(null); // Track which card is expanded

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const response = await axios.get("http://localhost:3070/appdata/applicant-data");
//         console.log(response);
//         setDetails(response.data);
//       } catch (error) {
//         console.error("Error fetching details:", error);
//       }
//     };

//     fetchDetails();
//   }, []);

//   const handleExpandClick = (id) => {
//     setExpandedId((prevId) => (prevId === id ? null : id)); // Toggle expand state
//   };

//   const handleScheduleInterview = (id) => {
//     console.log(`Scheduled interview for candidate with ID: ${id}`);
//     // Add API call or logic to schedule an interview here
//   };

//   const handleRejectCandidate = (id) => {
//     console.log(`Rejected candidate with ID: ${id}`);
//     // Add API call or logic to reject the candidate here
//   };

//   return (
//     <Container>
//       <Typography variant="h2" gutterBottom align="center">
//         Available CVs
//       </Typography>
//       <Grid container spacing={3}>
      
//       {details && details.length > 0 ? (
//         details.map((detail) => (
//           <Grid item xs={12} sm={6} md={4} key={detail._id}>
//             <Card variant="outlined">
//               <CardContent>
//                 {/* Summary */}
//                 <Typography variant="h5" component="div">
//                   {detail.firstname}
//                 </Typography>
//                 <Typography color="text.secondary" variant="body2">
//                   {detail.email}
//                 </Typography>
//                 <Typography variant="body2" sx={{ mt: 1 }}>
//                   Grade: {detail.grade}
//                 </Typography>
//                 <Button
//                   size="small"
//                   onClick={() => handleExpandClick(detail._id)}
//                   sx={{ mt: 2 }}
//                 >
//                   {expandedId === detail._id ? "Show Less" : "Show More"}
//                 </Button>
//               </CardContent>

//               {/* Collapsible Details */}
//               <Collapse in={expandedId === detail._id} timeout="auto" unmountOnExit>
//                 <CardContent>
//                   <Typography variant="body1">
//                     Contact Information: {detail.email}
//                   </Typography>
//                   <Typography variant="body1">
//                     Educational Background: {detail.grade}
//                   </Typography>
//                   <Typography variant="body1">
//                     Resume:{" "}
//                     <a
//                       href={detail.mockInterviews}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       View
//                     </a>
//                   </Typography>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => handleScheduleInterview(detail._id)}
//                       sx={{
//                         width: '150px', 
//                         height: '50px', 
                         
//                       }}
//                     >
//                       Schedule Interview
//                     </Button>
//                     <Button
//                       variant="outlined"
//                       color="error"
//                       onClick={() => handleRejectCandidate(detail._id)}
//                       sx={{
//                         width: '150px', 
//                         height: '50px', 
                        
//                       }}
//                     >
//                       Reject Candidate
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Collapse>
//             </Card>
//           </Grid>
//         ))
//       ) : (
//         <Typography variant="h6" align="center" sx={{ width: "100%" }}>
          
//           No details available
          
//         </Typography>
//       )}
//       </Grid>
//     </Container>
//   );
// }

import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Container,
  CardContent,
  Button,
  Collapse,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CandidateContext } from "../Context/CandidateContext";

export default function ReviewCvs() {
  const [details, setDetails] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // Track which card is expanded
  const navigate = useNavigate();
  const { setCandidateId,setCandidateEmail } = useContext(CandidateContext);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3070/appdata/applicant-data");
        console.log(response);
        
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, []);

  const handleExpandClick = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id)); // Toggle expand state
  };

  const handleScheduleInterview = (id,email) => {
    setCandidateId(id); // Set the candidate ID in context
    setCandidateEmail(email);
    navigate(`/mentor/dashboard/schedule`);
  };

  const handleRejectCandidate = (id) => {
    console.log(`Rejected candidate with ID: ${id}`);
    // Add API call or logic to reject the candidate here
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom align="center">
        Available CVs
      </Typography>
      <Grid container spacing={3}>
        {details && details.length > 0 ? (
          details.map((detail) => (
            <Grid item xs={12} sm={6} md={4} key={detail._id}>
              <Card variant="outlined">
                <CardContent>
                  {/* Summary */}
                  <Typography variant="h5" component="div">
                    {detail.firstname}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {detail.email}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Grade: {detail.grade}
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => handleExpandClick(detail._id)}
                    sx={{ mt: 2 }}
                  >
                    {expandedId === detail._id ? "Show Less" : "Show More"}
                  </Button>
                </CardContent>

                {/* Collapsible Details */}
                <Collapse in={expandedId === detail._id} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography variant="body1">
                      Contact Information: {detail.email}
                    </Typography>
                    <Typography variant="body1">
                      Educational Background: {detail.grade}
                    </Typography>
                    <Typography variant="body1">
                      Resume:{" "}
                      <a
                        href={detail.mockInterviews}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleScheduleInterview(detail._id,detail.email)}
                        sx={{
                          width: '150px', 
                          height: '50px', 
                        }}
                      >
                        Schedule Interview
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRejectCandidate(detail._id)}
                        sx={{
                          width: '150px', 
                          height: '50px', 
                        }}
                      >
                        Reject Candidate
                      </Button>
                    </Box>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" sx={{ width: "100%" }}>
            No details available
          </Typography>
        )}
      </Grid>
    </Container>
  );
}