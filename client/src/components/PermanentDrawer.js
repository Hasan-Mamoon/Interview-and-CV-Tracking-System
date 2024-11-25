// import * as React from "react";
// import PropTypes from "prop-types";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import MailIcon from "@mui/icons-material/Mail";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import ResponsiveAppBar from "./Appbar";
// import { Card } from "@mui/material";
// import {Stack} from "@mui/material";
// import {Chip} from "@mui/material";
// import {Grid} from "@mui/material";
// import { useNavigate } from "react-router-dom";



// const drawerWidth = 240;


// // const navigate = useNavigate();
// function ResponsiveDrawer(props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const [isClosing, setIsClosing] = React.useState(false);
//   const navigate = useNavigate();

//   const handleDrawerClose = () => {
//     setIsClosing(true);
//     setMobileOpen(false);
//   };

//   const handleDrawerTransitionEnd = () => {
//     setIsClosing(false);
//   };

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const handleListItemClick = (text) => {
//     console.log(`Clicked on ${text}`);
//     // Perform different actions based on the clicked item
//     switch (text) {
//       case 'Review CVS':
//         // Navigate to the Review CVS page
//         navigate("/mentor/dashboard/review-cvs");
//         break;

//       case 'Schedule Interviews':
//         // Navigate to the Schedule Interviews page
//         navigate("/mentor/dashboard/schedule");
//         break;
//       default:
//         break;
//     }
//   };

//   const drawer = (
//     <div>
//       <Toolbar />
//       <Divider />
//       <List>
//         {[
//           "Review CVS",
//           "Schedule Interviews",
          
//         ].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton onClick={() => handleListItemClick(text)}>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   const container =
//     window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <ResponsiveAppBar />
//       <AppBar position="fixed">
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>
      
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         container={container}
//         variant="temporary"
//         open={mobileOpen}
//         onTransitionEnd={handleDrawerTransitionEnd}
//         onClose={handleDrawerClose}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           display: { xs: "block", sm: "none" },
//           "& .MuiDrawer-paper": { width: drawerWidth },
//         }}
//       >
//         {drawer}
//       </Drawer>
//       <Drawer
//         variant="permanent"
//         open
//         sx={{
//           display: { xs: "none", sm: "block" },
//           "& .MuiDrawer-paper": { width: drawerWidth },
//         }}
//       >
//         {drawer}
//       </Drawer>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           marginTop: "60px", // Adjusted margin to accommodate the AppBar
//           marginLeft: "250px",
//         }}
//       >
//         <Toolbar />

//         <Typography variant="h2" gutterBottom align="center"> 
//           Welcome to the Dashboard!
//         </Typography>
        
//     <Grid container spacing={3}>
//         {cardData.map((card, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <Card variant="outlined" sx={{ maxWidth: 360 }}>
//               <Box sx={{ p: 2 }}>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center">
//                   <Typography gutterBottom variant="h5" component="div">
//                     {card.title}
//                   </Typography>
//                   <Typography gutterBottom variant="h6" component="div">
//                     {card.count}
//                   </Typography>
//                 </Stack>
//                 <Typography color="text.secondary" variant="body2">
//                   {card.description}
//                 </Typography>
//               </Box>
//               <Divider />
//               <Box sx={{ p: 2 }}>
//                 <Typography gutterBottom variant="body2">
//                   Reminder type
//                 </Typography>
//                 <Stack direction="row" spacing={1}>
//                   {card.reminders.map((reminder, i) => (
//                     <Chip
//                       key={i}
//                       color={i === 0 ? "primary" : "default"}
//                       label={reminder}
//                       size="small"
//                     />
//                   ))}
//                 </Stack>
//               </Box>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

    

    
//       </Box>
      
//     </Box>
//   );
// }





// import React from "react";
// import PropTypes from "prop-types";
// import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import { useNavigate } from "react-router-dom";

// const drawerWidth = 240;

// function ResponsiveDrawer(props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const navigate = useNavigate();

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleListItemClick = (text) => {
//     switch (text) {
//       case "Review CVs":
//         navigate("/mentor/dashboard/review-cvs");
//         break;
//       case "Schedule Interviews":
//         navigate("/mentor/dashboard/schedule");
//         break;
//       default:
//         break;
//     }
//   };

//   const drawerContent = (
//     <div>
//       <Toolbar />
//       <Divider />
//       <List>
//         {["Review CVs", "Schedule Interviews"].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton onClick={() => handleListItemClick(text)}>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         container={container}
//         variant="temporary"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{ keepMounted: true }} // Better performance on mobile.
//         sx={{
//           display: { xs: "block", sm: "none" },
//           "& .MuiDrawer-paper": { width: drawerWidth },
//         }}
//       >
//         {drawerContent}
//       </Drawer>
//       <Drawer
//         variant="permanent"
//         sx={{
//           display: { xs: "none", sm: "block" },
//           "& .MuiDrawer-paper": { width: drawerWidth },
//         }}
//         open
//       >
//         {drawerContent}
//       </Drawer>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           mt: 8, // To offset the AppBar height.
//         }}
//       >
//         {props.children}
//       </Box>
//     </Box>
//   );
// }

// ResponsiveDrawer.propTypes = {
//   window: PropTypes.func,
//   children: PropTypes.node,
// };

// export default ResponsiveDrawer;


import React from "react";
import PropTypes from "prop-types";
import { AppBar, Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const navigate = useNavigate();

  const handleListItemClick = (text) => {
    switch (text) {
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
        {["Review CVs", "Schedule Interviews"].map((text, index) => (
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

      {/* Permanent Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
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
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`, // Margin left to prevent overlap
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

