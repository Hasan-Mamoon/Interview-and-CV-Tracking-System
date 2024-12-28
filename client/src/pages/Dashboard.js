import React from "react";
import { Typography, Box, CssBaseline } from "@mui/material";
import ResponsiveAppBar from "../components/Appbar";
import ResponsiveDrawer from "../components/PermanentDrawer";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import DashboardCards from "../components/DashboardCards";


// Reusable Card Component
// const DashboardCard = ({ title, count, description, reminders }) => (
//   <Card variant="outlined" sx={{ maxWidth: 360, width: "100%", p: 2 }}>
//     <Box>
//       <Stack direction="row" justifyContent="space-between" alignItems="center">
//         <Typography variant="h6">{title}</Typography>
//         <Chip label={count} color="primary" />
//       </Stack>
//       <Typography variant="body2">{description}</Typography>
//       <Divider sx={{ my: 1 }} />
//       <Typography variant="body2" sx={{ textAlign: 'right' }}>{reminders}</Typography>
//     </Box>
//   </Card>
// );

const Dashboard = () => {
  const location = useLocation();
  const isRoot = location.pathname === "/mentor/dashboard";

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <ResponsiveAppBar />
      <ResponsiveDrawer>
        
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 5 }}>
          {isRoot ? (
            <>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 5 }}>
                <Typography variant="h4" gutterBottom>
                  Welcome, Mr Ali
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ color: "text.secondary", mb: 5 }}>
                  Today is {formattedDate}
                </Typography>
                <DashboardCards/>
              </Box>
            </>
          ) : (
            <Outlet />
          )}
          
        </Box>
       <Footer/>
      </ResponsiveDrawer>
    </Box> 
  );
};

export default Dashboard;

