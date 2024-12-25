import React from "react";
import {
  Typography,
  Card,
  Box,
  Stack,
  Chip,
  Divider,
} from "@mui/material";

import Grid from "@mui/material/Grid2";



const cardData = [
  {
    title: "Pending CVs",
    count: 6,
    description: "You have 6 CVs pending approval.",
    desc2: "Review CVS now >>>",
  },

  {
    title: "Upcoming Meetings",
    count: 3,
    description: "You have 3 meetings scheduled.",
    desc2: "View Schedule >>>",
  },
];

//Reusable Card Component
const DashboardCard = ({ title, count, description, desc2 }) => (
  <Card variant="outlined" sx={{ minWidth:360 ,maxWidth: 360, width: "100%", p: 2 }}>
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{title}</Typography>
        <Chip label={count} color="primary" />
      </Stack>
      <Typography variant="body2" sx={{mt:2}}>{description}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body2" sx={{mt:2,textAlign: 'right'}}>{desc2}</Typography>
      {/* <Stack direction="row" spacing={1}>
        {reminders.map((reminder, index) => (
          <Chip key={index} label={reminder} />
        ))}
      </Stack> */}
    </Box>
  </Card>
);



const DashboardCards = () => (
    <Grid container spacing={5} justifyContent="center">
      {cardData.map((card, index) => (
        <Grid key={index} xs={12} sm={6} md={4} >
          <DashboardCard {...card} />
        </Grid>
      ))}
    </Grid>

  );
  export default DashboardCards;
