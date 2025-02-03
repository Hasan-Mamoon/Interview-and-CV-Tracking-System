import React from "react";
import PropTypes from "prop-types";
import { Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import RateReviewIcon from '@mui/icons-material/RateReview';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleListItemClick = (text) => {
    switch (text) {
      case "Home":
        navigate("/mentor/dashboard");
        break;
      case "Review CVs":
        navigate("/mentor/dashboard/review-cvs");
        break;
      case "Schedule Interviews":
        navigate("/mentor/dashboard/schedule");
        break;
      default:
        break;
    }
  };

  const drawerContent = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["Home", "Review CVs", "Schedule Interviews"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            selected={
              (text === "Home" && location.pathname === "/mentor/dashboard") ||
              (text === "Review CVs" && location.pathname === "/mentor/dashboard/review-cvs") ||
              (text === "Schedule Interviews" && location.pathname === "/mentor/dashboard/schedule")
            }
            sx={{
              '&.Mui-selected': {
                backgroundColor: theme.palette.action.selected,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              },
            }}
          >
            <ListItemButton onClick={() => handleListItemClick(text)}>
              <ListItemIcon>
                {index === 0 ? <DashboardIcon /> : index === 1 ? <RateReviewIcon /> : <HistoryToggleOffIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
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
        {props.children}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  children: PropTypes.node,
};

export default ResponsiveDrawer;