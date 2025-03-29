import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Card, Box, Stack, Chip, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";

const DashboardCard = ({ title, count, description, desc2 }) => (
  <Card
    variant="outlined"
    sx={{
      minWidth: 360,
      maxWidth: 360,
      width: "100%",
      p: 3,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: 2,
      boxShadow: 3,
      backdropFilter: "blur(10px)",
      transition: "transform 0.3s ease-in-out",
      "&:hover": {
        transform: "scale(1.05)",
      },
    }}
  >
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" sx={{ color: "#fff" }}>{title}</Typography>
        <Chip label={count} color="primary" sx={{ fontSize: 16, p: 1.5 }} />
      </Stack>
      <Typography variant="body2" sx={{ mt: 2, color: "rgba(255, 255, 255, 0.8)" }}>
        {description}
      </Typography>
      <Divider sx={{ my: 1, backgroundColor: "rgba(255, 255, 255, 0.3)" }} />
      <Typography variant="body2" sx={{ mt: 2, textAlign: "right", color: "#2ebf91" }}>
        {desc2}
      </Typography>
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
        const meetingsRes = await fetch(`${process.env.REACT_APP_EPIC1_URL}/appdata/meetings/count`);
        const usersRes = await fetch(`${process.env.REACT_APP_EPIC1_URL}/appdata/users/count-pending`);

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
      title: "CVs Awaiting Review",
      count: pendingCVs,
      description: `There are ${pendingCVs} CVs awaiting your review.`,
      desc2: <Link to="/mentor/dashboard/review-cvs" style={{ textDecoration: "none", color: "#2ebf91" }}>Review CVs now</Link>,
    },
    {
      title: "Scheduled Interviews",
      count: upcomingMeetings,
      description: `You have ${upcomingMeetings} interviews coming up.`,
      desc2: <Link to="/mentor/dashboard/scheduled-interviews" style={{ textDecoration: "none", color: "#2ebf91" }}>View Meetings</Link>,
    },
  ];

  return (
      <Grid container spacing={5} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <DashboardCard {...card} />
          </Grid>
        ))}
      </Grid>
    
  );
};

export default DashboardCards;
