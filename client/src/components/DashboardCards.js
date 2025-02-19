// import React from "react";
// import {
//   Typography,
//   Card,
//   Box,
//   Stack,
//   Chip,
//   Divider,
// } from "@mui/material";

// import Grid from "@mui/material/Grid2";



// const cardData = [
//   {
//     title: "Pending CVs",
//     count: 6,
//     description: "You have 6 CVs pending approval.",
//     desc2: "Review CVS now >>>",
//   },

//   {
//     title: "Upcoming Meetings",
//     count: 3,
//     description: "You have 3 meetings scheduled.",
//     desc2: "View Schedule >>>",
//   },
// ];

// //Reusable Card Component
// const DashboardCard = ({ title, count, description, desc2 }) => (
//   <Card variant="outlined" sx={{ minWidth:360 ,maxWidth: 360, width: "100%", p: 2 }}>
//     <Box>
//       <Stack direction="row" justifyContent="space-between" alignItems="center">
//         <Typography variant="h6">{title}</Typography>
//         <Chip label={count} color="primary" />
//       </Stack>
//       <Typography variant="body2" sx={{mt:2}}>{description}</Typography>
//       <Divider sx={{ my: 1 }} />
//       <Typography variant="body2" sx={{mt:2,textAlign: 'right'}}>{desc2}</Typography>
//       {/* <Stack direction="row" spacing={1}>
//         {reminders.map((reminder, index) => (
//           <Chip key={index} label={reminder} />
//         ))}
//       </Stack> */}
//     </Box>
//   </Card>
// );



// const DashboardCards = () => (
//     <Grid container spacing={5} justifyContent="center">
//       {cardData.map((card, index) => (
//         <Grid key={index} xs={12} sm={6} md={4} >
//           <DashboardCard {...card} />
//         </Grid>
//       ))}
//     </Grid>

//   );
//   export default DashboardCards;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Card, Box, Stack, Chip, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";

const DashboardCard = ({ title, count, description, desc2 }) => (
  <Card variant="outlined" sx={{ minWidth: 360, maxWidth: 360, width: "100%", p: 2 }}>
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{title}</Typography>
        <Chip label={count} color="primary" />
      </Stack>
      <Typography variant="body2" sx={{ mt: 2 }}>
        {description}
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body2" sx={{ mt: 2, textAlign: "right" }}>{desc2}</Typography>
    </Box>
  </Card>
);

const DashboardCards = () => {
  const [pendingCVs, setPendingCVs] = useState(0);
  const [upcomingMeetings, setUpcomingMeetings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const meetingsRes = await fetch("http://localhost:3070/appdata/meetings/count");
        const usersRes = await fetch("http://localhost:3070/appdata/users/count-pending");

        if (!meetingsRes.ok || !usersRes.ok) throw new Error("Failed to fetch data");

        const meetingsData = await meetingsRes.json();
        const usersData = await usersRes.json();

        setUpcomingMeetings(meetingsData.totalMeetings);
        setPendingCVs(usersData.pendingUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  const cardData = [
    {
      title: "Pending CVs",
      count: pendingCVs,
      description: `You have ${pendingCVs} CVs pending approval.`,
      desc2: <Link to="/mentor/dashboard/review-cvs">Review CVs now</Link>,
    },
    {
      title: "Upcoming Meetings",
      count: upcomingMeetings,
      description: `You have ${upcomingMeetings} meetings scheduled.`,
      desc2: <Link to="/mentor/dashboard/scheduled-interviews">Review CVs now</Link>,
    },
  ];

  return (
    <Grid container spacing={5} justifyContent="center">
      {cardData.map((card, index) => (
        <Grid key={index} xs={12} sm={6} md={4}>
          <DashboardCard {...card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCards;
