// import React from "react";
// import { Box, Typography } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import { ProgressBar } from "react-step-progress-bar";
// import "react-step-progress-bar/styles.css";

// const statusSteps = [
//   { label: "Application Filled", value: "application-filled" },
//   { label: "CV Pending Review", value: "cv-pending-review" },
//   { label: "Interview Scheduled", value: "interview-scheduled" },
// ];

// const ApplicationProgress = ({ status }) => {
//   // Determine progress percentage
//   const stepIndex = statusSteps.findIndex((step) => step.value === status);
//   const progress = stepIndex >= 0 ? (stepIndex / (statusSteps.length - 1)) * 100 : 0;

//   return (
//     <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", textAlign: "center", mt: 3 }}>
//       <Typography variant="h6" sx={{ mb: 2 }}>
//         Application Progress
//       </Typography>
//       <ProgressBar
//         percent={progress}
//         filledBackground="linear-gradient(to right, #3f51b5, #2196f3)"
//       />
//       <Grid container spacing={2} justifyContent="space-between" sx={{ mt: 1 }}>
//         {statusSteps.map((step, index) => (
//           <Grid key={index} xs={4} sx={{ textAlign: "center" }}>
//             <Typography variant="caption" sx={{ fontWeight: stepIndex === index ? "bold" : "normal" }}>
//               {step.label}
//             </Typography>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default ApplicationProgress;

// import React, { useState, useEffect } from "react";
// import { Box, Typography } from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid2";
// import { ProgressBar } from "react-step-progress-bar";
// import "react-step-progress-bar/styles.css";

// const statusSteps = [
//   { label: "Application Filled", value: "application-filled" },
//   { label: "CV Pending Review", value: "cv-pending-review" },
//   { label: "Interview Scheduled", value: "interview-scheduled" },
// ];

// const ApplicationProgress = ({ userId }) => {
//   const [status, setStatus] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStatus = async () => {
//       try {
//         const response = await fetch(`/api/application-status/${userId}`);
//         const data = await response.json();
//         setStatus(data.status); // Assuming API returns { status: "cv-pending-review" }
//       } catch (error) {
//         console.error("Error fetching application status:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStatus();
//   }, [userId]);

//   // Determine progress percentage
//   const stepIndex = statusSteps.findIndex((step) => step.value === status);
//   const progress = stepIndex >= 0 ? (stepIndex / (statusSteps.length - 1)) * 100 : 0;

//   return (
//     <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", textAlign: "center", mt: 3 }}>
//       <Typography variant="h6" sx={{ mb: 2 }}>
//         Application Progress
//       </Typography>

//       {loading ? (
//         <Typography variant="body2">Loading...</Typography>
//       ) : (
//         <>
//           <ProgressBar percent={progress} filledBackground="linear-gradient(to right, #3f51b5, #2196f3)" />
//           <Grid container spacing={2} justifyContent="space-between" sx={{ mt: 1 }}>
//             {statusSteps.map((step, index) => (
//               <Grid key={index} xs={4} sx={{ textAlign: "center" }}>
//                 <Typography variant="caption" sx={{ fontWeight: stepIndex === index ? "bold" : "normal" }}>
//                   {step.label}
//                 </Typography>
//               </Grid>
//             ))}
//           </Grid>
//         </>
//       )}
//     </Box>
//   );
// };

// export default ApplicationProgress;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ProgressBar } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

const statusSteps = [
  { label: "Application Filled", value: "application-filled" },
  { label: "Pending Review", value: "Pending" },
  { label: "Interview Scheduled", value: "Scheduled" },
  { label: "Results announced", value: "accepted" || "rejected" },
];

const ApplicationProgress = ({ userEmail}) => {
  const [status, setStatus] = useState(null);
  const [interviewStatus, setInterviewStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_EPIC2_URL}/applicant/application-status/${userEmail}`);
        const data = await response.json();
        setStatus(data.status); 
        setInterviewStatus(data.interview);
      } catch (error) {
        console.error("Error fetching application status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [userEmail]);

  // If the user hasn't started the application
  if (!loading && !status) {
    return (
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          No Application Found
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          Apply now to track your progress here.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/applicant/dashboard/apply">
          Apply Now
        </Button>
      </Box>
    );
  }

  // Determine progress percentage
  const stepIndex = statusSteps.findIndex((step) => step.value === status || step.value === interviewStatus);
  const progress = stepIndex >= 0 ? (stepIndex / (statusSteps.length - 1)) * 100 : 0;

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", textAlign: "center", mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Application Progress
      </Typography>

      {loading ? (
        <Typography variant="body2">Loading...</Typography>
      ) : (
        <>
          <ProgressBar percent={progress} filledBackground="linear-gradient(to right, #3f51b5, #2196f3)" />
          <Grid container spacing={4} justifyContent="space-between" sx={{ mt: 1 }}>
            {statusSteps.map((step, index) => (
              <Grid key={index} xs={4} sx={{ textAlign: "center" }}>
                <Typography variant="caption" sx={{ fontWeight: stepIndex === index ? "bold" : "normal" }}>
                  {step.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default ApplicationProgress;
