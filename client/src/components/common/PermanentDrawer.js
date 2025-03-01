import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import WorkIcon from "@mui/icons-material/Work";

const drawerWidth = 240;

function ResponsiveDrawer({ role, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Define menu items based on role
  const mentorMenuItems = [
    { text: "Home", icon: <DashboardIcon />, path: "/mentor/dashboard" },
    { text: "Review CVs", icon: <RateReviewIcon />, path: "/mentor/dashboard/review-cvs" },
    { text: "Scheduled Interviews", icon: <HistoryToggleOffIcon />, path: "/mentor/dashboard/scheduled-interviews" },
  ];

  const applicantMenuItems = [
    { text: "Home", icon: <DashboardIcon />, path: "/applicant/dashboard" },
    { text: "My Applications", icon: <AssignmentIndIcon />, path: "/applicant/dashboard/my-applications" },
    { text: "Job Listings", icon: <WorkIcon />, path: "/applicant/dashboard/job-listings" },
  ];

  const menuItems = role === "mentor" ? mentorMenuItems : applicantMenuItems;

  const handleListItemClick = (path) => {
    navigate(path);
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        background: "linear-gradient(to bottom, rgb(13, 17, 16), rgba(80, 36, 163, 0.42))",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar />
      <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleListItemClick(item.path)}
              selected={location.pathname === item.path}
              sx={{
                color: "white",
                "&.Mui-selected": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                  },
                },
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={!isSmallScreen}
        onClose={() => {}}
        sx={{
          width: isSmallScreen ? "auto" : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isSmallScreen ? "auto" : drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(to bottom, rgb(13, 17, 16), rgba(80, 36, 163, 0.42))",
            color: "white",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          width: isSmallScreen ? "100%" : `calc(100% - ${drawerWidth}px)`,
          mt: 8, // Offset for AppBar
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  role: PropTypes.oneOf(["mentor", "applicant"]).isRequired,
  children: PropTypes.node,
};

export default ResponsiveDrawer;
