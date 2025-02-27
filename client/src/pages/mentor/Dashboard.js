import React, { useContext } from "react";
import { Typography, Box, CssBaseline } from "@mui/material";
import ResponsiveAppBar from "../../components/common/Appbar";
import ResponsiveDrawer from "../../components/common/PermanentDrawer";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/common/Footer";
import DashboardCards from "../../components/common/DashboardCards";
import { AuthContext } from "../../Context/AuthContext";

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  const isRoot = location.pathname === "/mentor/dashboard";

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <ResponsiveAppBar />
      <ResponsiveDrawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 5 }}>
          {isRoot ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 5,
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Welcome, Mr {auth.user.firstname}
                  {console.log("Dashboard: candidate.firstname", auth)}
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "text.secondary", mb: 5 }}
                >
                  Today is {formattedDate}
                </Typography>
                <DashboardCards />
              </Box>
            </>
          ) : (
            <Outlet />
          )}
        </Box>
        <Footer />
      </ResponsiveDrawer>
    </Box>
  );
};

export default Dashboard;
