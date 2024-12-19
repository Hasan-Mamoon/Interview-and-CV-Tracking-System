import React from "react";
import PropTypes from "prop-types";
import { AppBar, Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const navigate = useNavigate();
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
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleListItemClick(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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
      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Responsive Drawer */}
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
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: isSmallScreen ? "100%" : `calc(100% - ${drawerWidth}px)`,
          ml: isSmallScreen ? 0 : `${drawerWidth}px`, // Margin left to prevent overlap
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