// import React from 'react'
// import PermanentDrawerLeft from './PermanentDrawer'
// import ReviewCvs from './ReviewCvs'
// import { BrowserRouter } from 'react-router-dom'

// import Typography from "@mui/material/Typography";

// import Divider from "@mui/material/Divider";
// import ResponsiveAppBar from "./Appbar";
// import { Card } from "@mui/material";
// import {Stack} from "@mui/material";
// import {Chip} from "@mui/material";
// import {Grid} from "@mui/material";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Toolbar from "@mui/material/Toolbar";

// import MenuIcon from "@mui/icons-material/Menu";



// const drawerWidth = 240;

// const cardData = [
//   {
//     title: "No of Pending CV's",
//     count: 6,
//     description: "You have 6 CV's Pending Approval, Review them soon!",
//     reminders: ["Important", "Mild", "Ignorable"]
//   },
//   {
//     title: "No of Completed Projects",
//     count: 12,
//     description: "You have completed 12 projects!",
//     reminders: ["High Priority", "Low Priority"]
//   },
//   {
//     title: "No of Pending Reviews",
//     count: 4,
//     description: "You have 4 reviews pending. Please review them.",
//     reminders: ["Urgent", "Can Wait"]
//   },
//   {
//     title: "Upcoming Meetings",
//     count: 3,
//     description: "You have 3 meetings scheduled.",
//     reminders: ["Today", "This Week"]
//   }
// ];
// export default function Dashboard() {


//   <Grid container spacing={3}>
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
//   return (
    
//     // <PermanentDrawerLeft/>

   
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <ResponsiveAppBar />
//         <AppBar position="fixed">
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               // onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: { sm: "none" } }}
//             >
//               <MenuIcon />
//             </IconButton>
        
//           </Toolbar>
//         </AppBar>
        
//           <Toolbar />
  
//           <Typography variant="h2" gutterBottom align="center"> 
//             Welcome to the Dashboard!
//           </Typography>
          
//       <Grid container spacing={3}>
//           {cardData.map((card, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Card variant="outlined" sx={{ maxWidth: 360 }}>
//                 <Box sx={{ p: 2 }}>
//                   <Stack direction="row" justifyContent="space-between" alignItems="center">
//                     <Typography gutterBottom variant="h5" component="div">
//                       {card.title}
//                     </Typography>
//                     <Typography gutterBottom variant="h6" component="div">
//                       {card.count}
//                     </Typography>
//                   </Stack>
//                   <Typography color="text.secondary" variant="body2">
//                     {card.description}
//                   </Typography>
//                 </Box>
//                 <Divider />
//                 <Box sx={{ p: 2 }}>
//                   <Typography gutterBottom variant="body2">
//                     Reminder type
//                   </Typography>
//                   <Stack direction="row" spacing={1}>
//                     {card.reminders.map((reminder, i) => (
//                       <Chip
//                         key={i}
//                         color={i === 0 ? "primary" : "default"}
//                         label={reminder}
//                         size="small"
//                       />
//                     ))}
//                   </Stack>
//                 </Box>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
  
      
  
      
//         </Box>
        
//       //</Box>
//     );


    
    
  
// }


import React from "react";
import { Typography, Card, Box, Stack, Chip, Grid, Divider, CssBaseline } from "@mui/material";
import ResponsiveAppBar from "./Appbar";
import ResponsiveDrawer from "./PermanentDrawer";
import { Outlet } from "react-router-dom";

const cardData = [
  {
    title: "Pending CVs",
    count: 6,
    description: "You have 6 CVs pending approval. Review them soon!",
    reminders: ["Important", "Mild", "Ignorable"],
  },
  {
    title: "Pending Reviews",
    count: 4,
    description: "You have 4 reviews pending. Please review them.",
    reminders: ["Urgent", "Can Wait"],
  },
  {
    title: "Upcoming Meetings",
    count: 3,
    description: "You have 3 meetings scheduled.",
    reminders: ["Today", "This Week"],
  },
];

// Reusable Card Component
const DashboardCard = ({ title, count, description, reminders }) => (
  <Card variant="outlined" sx={{ maxWidth: 360, width: "100%", p: 2 }}>
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        <Typography variant="h6" color="primary">
          {count}
        </Typography>
      </Stack>
      <Typography color="text.secondary" variant="body2">
        {description}
      </Typography>
    </Box>
    <Divider sx={{ my: 2 }} />
    <Box>
      <Typography gutterBottom variant="body2">
        Reminder Types:
      </Typography>
      <Stack direction="row" spacing={1}>
        {reminders.map((reminder, index) => (
          <Chip
            key={index}
            label={reminder}
            color={index === 0 ? "primary" : "default"}
            size="small"
          />
        ))}
      </Stack>
    </Box>
  </Card>
);

const Dashboard = () => {
  return (
    <>
    
    <ResponsiveDrawer>

    </ResponsiveDrawer>
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <ResponsiveAppBar />
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          Welcome to the Dashboard!
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ px: 3 }} marginLeft={30}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardCard
              title={card.title}
              count={card.count}
              description={card.description}
              reminders={card.reminders}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
    </Box>
    
    </>
  );
};

export default Dashboard;
