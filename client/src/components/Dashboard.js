// import React from "react";
// import { Typography, Card, Box, Stack, Chip, Grid, Divider, CssBaseline } from "@mui/material";
// import ResponsiveAppBar from "./Appbar";
// import ResponsiveDrawer from "./PermanentDrawer";
// import { Outlet } from "react-router-dom";

// const cardData = [
//   {
//     title: "Pending CVs",
//     count: 6,
//     description: "You have 6 CVs pending approval. Review them soon!",
//     reminders: ["Important", "Mild", "Ignorable"],
//   },
//   {
//     title: "Pending Reviews",
//     count: 4,
//     description: "You have 4 reviews pending. Please review them.",
//     reminders: ["Urgent", "Can Wait"],
//   },
//   {
//     title: "Upcoming Meetings",
//     count: 3,
//     description: "You have 3 meetings scheduled.",
//     reminders: ["Today", "This Week"],
//   },
// ];

// // Reusable Card Component
// const DashboardCard = ({ title, count, description, reminders }) => (
//   <Card variant="outlined" sx={{ maxWidth: 360, width: "100%", p: 2 }}>
//     <Box>
//       <Stack direction="row" justifyContent="space-between" alignItems="center">
//         <Typography gutterBottom variant="h5">
//           {title}
//         </Typography>
//         <Typography variant="h6" color="primary">
//           {count}
//         </Typography>
//       </Stack>
//       <Typography color="text.secondary" variant="body2">
//         {description}
//       </Typography>
//     </Box>
//     <Divider sx={{ my: 2 }} />
//     <Box>
//       <Typography gutterBottom variant="body2">
//         Reminder Types:
//       </Typography>
//       <Stack direction="row" spacing={1}>
//         {reminders.map((reminder, index) => (
//           <Chip
//             key={index}
//             label={reminder}
//             color={index === 0 ? "primary" : "default"}
//             size="small"
//           />
//         ))}
//       </Stack>
//     </Box>
//   </Card>
// );

// const Dashboard = () => {
//   return (
//     <>

//     <ResponsiveDrawer>

//     </ResponsiveDrawer>
//     <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//       <CssBaseline />
//       <ResponsiveAppBar />
//       <Box sx={{ p: 3 }}>
//           <Outlet />
//         </Box>
//       <Box sx={{ p: 3, textAlign: "center" }}>
//         <Typography variant="h3" gutterBottom>
//           Welcome to the Dashboard!
//         </Typography>
//       </Box>
//       <Grid container spacing={3} sx={{ px: 3 }} marginLeft={30}>
//         {cardData.map((card, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <DashboardCard
//               title={card.title}
//               count={card.count}
//               description={card.description}
//               reminders={card.reminders}
//             />
//           </Grid>
//         ))}
//       </Grid>

//     </Box>

//     </>
//   );
// };

// export default Dashboard;

// import React from "react";
// import {
//   Typography,
//   Card,
//   Box,
//   Stack,
//   Chip,
//   Grid,
//   Divider,
//   CssBaseline,
// } from "@mui/material";
// import ResponsiveAppBar from "./Appbar";
// import ResponsiveDrawer from "./PermanentDrawer";
// import { Outlet, useLocation } from "react-router-dom";

// const cardData = [
//   {
//     title: "Pending CVs",
//     count: 6,
//     description: "You have 6 CVs pending approval. Review them soon!",
//     reminders: ["Important", "Mild", "Ignorable"],
//   },
//   {
//     title: "Pending Reviews",
//     count: 4,
//     description: "You have 4 reviews pending. Please review them.",
//     reminders: ["Urgent", "Can Wait"],
//   },
//   {
//     title: "Upcoming Meetings",
//     count: 3,
//     description: "You have 3 meetings scheduled.",
//     reminders: ["Today", "This Week"],
//   },
// ];

// // Reusable Card Component
// const DashboardCard = ({ title, count, description, reminders }) => (
//   <Card variant="outlined" sx={{ maxWidth: 360, width: "100%", p: 2 }}>
//     <Box>
//       <Stack direction="row" justifyContent="space-between" alignItems="center">
//         <Typography variant="h6">{title}</Typography>
//         <Chip label={count} color="primary" />
//       </Stack>
//       <Typography variant="body2">{description}</Typography>
//       <Divider sx={{ my: 1 }} />
//       <Stack direction="row" spacing={1}>
//         {reminders.map((reminder, index) => (
//           <Chip key={index} label={reminder} />
//         ))}
//       </Stack>
//     </Box>
//   </Card>
// );

// const Dashboard = () => {
//   const location = useLocation();
//   const isRoot = location.pathname === "/mentor/dashboard";

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <ResponsiveDrawer />
//       <ResponsiveAppBar />

//       <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 10 }}>
//         {isRoot ? (
//           <>
           
//               <Typography variant="h4" gutterBottom>
//                 Welcome to the Dashboard
//               </Typography>
           
//             <Grid container spacing={2}>
//               {cardData.map((card, index) => (
//                 <Grid item key={index} xs={12} sm={6} md={4}>
//                   <DashboardCard {...card} />
//                 </Grid>
//               ))}
//             </Grid>
//           </>
//         ) : (
//           <Outlet />
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;

// import React from "react";
// import { Typography, Card, Box, Stack, Chip, Grid, Divider, CssBaseline } from "@mui/material";
// import ResponsiveAppBar from "./Appbar";
// import ResponsiveDrawer from "./PermanentDrawer";
// import { Outlet, useLocation } from "react-router-dom";

// const cardData = [
//   {
//     title: "Pending CVs",
//     count: 6,
//     description: "You have 6 CVs pending approval. Review them soon!",
//     reminders: ["Important", "Mild", "Ignorable"],
//   },
//   {
//     title: "Pending Reviews",
//     count: 4,
//     description: "You have 4 reviews pending. Please review them.",
//     reminders: ["Urgent", "Can Wait"],
//   },
//   {
//     title: "Upcoming Meetings",
//     count: 3,
//     description: "You have 3 meetings scheduled.",
//     reminders: ["Today", "This Week"],
//   },
// ];

// // Reusable Card Component
// const DashboardCard = ({ title, count, description, reminders }) => (
//   <Card variant="outlined" sx={{ maxWidth: 360, width: "100%", p: 2 }}>
//     <Box>
//       <Stack direction="row" justifyContent="space-between" alignItems="center">
//         <Typography variant="h6">{title}</Typography>
//         <Chip label={count} color="primary" />
//       </Stack>
//       <Typography variant="body2">{description}</Typography>
//       <Divider sx={{ my: 1 }} />
//       <Stack direction="row" spacing={1}>
//         {reminders.map((reminder, index) => (
//           <Chip key={index} label={reminder} />
//         ))}
//       </Stack>
//     </Box>
//   </Card>
// );

// const Dashboard = () => {
//   const location = useLocation();
//   const isRoot = location.pathname === "/mentor/dashboard";

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//       <CssBaseline />
      
      
//       <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 10,mw:0 }}>
//         {isRoot ? (
//           <>
//           <Box sx={{ display:"flex"}}>
//           <ResponsiveDrawer />
//           </Box>
          
//           <ResponsiveAppBar />
//             <Box sx={{ display:"flex",flexDirection:"column" ,textAlign: "center", mb: 10  }}>
//               <Typography variant="h4" gutterBottom>
//                 Welcome to the Dashboard
//               </Typography>
//               <Grid container spacing={2} justifyContent="center">
//               {cardData.map((card, index) => (
//                 <Grid item key={index} xs={12} sm={6} md={4}>
//                   <DashboardCard {...card} />
//                 </Grid>
//               ))}
//             </Grid>
//             </Box>
            
//           </>
//         ) : (
//           <Outlet />
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;


import React from "react";
import { Typography, Card, Box, Stack, Chip, Grid, Divider, CssBaseline } from "@mui/material";
import ResponsiveAppBar from "./Appbar";
import ResponsiveDrawer from "./PermanentDrawer";
import { Outlet, useLocation } from "react-router-dom";

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
        <Typography variant="h6">{title}</Typography>
        <Chip label={count} color="primary" />
      </Stack>
      <Typography variant="body2">{description}</Typography>
      <Divider sx={{ my: 1 }} />
      <Stack direction="row" spacing={1}>
        {reminders.map((reminder, index) => (
          <Chip key={index} label={reminder} />
        ))}
      </Stack>
    </Box>
  </Card>
);

const Dashboard = () => {
  const location = useLocation();
  const isRoot = location.pathname === "/mentor/dashboard";

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <ResponsiveDrawer>
        <ResponsiveAppBar/>
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 5 }}>
          {isRoot ? (
            <>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 5 }}>
                <Typography variant="h4" gutterBottom>
                  Welcome to the Dashboard
                </Typography>
                <Grid container spacing={8} justifyContent="center">
                  {cardData.map((card, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                      <DashboardCard {...card} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
          ) : (
            <Outlet />
          )}
        </Box>
      </ResponsiveDrawer>
    </Box>
  );
};

export default Dashboard;