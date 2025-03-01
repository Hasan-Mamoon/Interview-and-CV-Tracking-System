// import React, { useContext } from "react";
// import { Typography, Box, CssBaseline } from "@mui/material";
// import ResponsiveAppBar from "../components/Appbar";
// import ResponsiveDrawer from "../components/PermanentDrawer";
// import { Outlet, useLocation } from "react-router-dom";
// import Footer from "../components/Footer";
// import DashboardCards from "../components/DashboardCards";
// import { AuthContext } from "../Context/AuthContext";

// const Dashboard = () => {
//   const { auth } = useContext(AuthContext);
//   const location = useLocation();
//   const isRoot = location.pathname === "/mentor/dashboard";

//   const today = new Date();
//   const formattedDate = today.toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//       <CssBaseline />
//       <ResponsiveAppBar />
//       <ResponsiveDrawer>
//         <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 5 }}>
//           {isRoot ? (
//             <>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   mb: 5,
//                 }}
//               >
//                 <Typography variant="h4" gutterBottom>
//                   Welcome, Mr {auth.user.firstname}
//                   {console.log("Dashboard: candidate.firstname", auth)}
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   gutterBottom
//                   sx={{ color: "text.secondary", mb: 5 }}
//                 >
//                   Today is {formattedDate}
//                 </Typography>
//                 <DashboardCards />
//               </Box>
//             </>
//           ) : (
//             <Outlet />
//           )}
//         </Box>
//         <Footer />
//       </ResponsiveDrawer>
//     </Box>
//   );
// };

// export default Dashboard;

// import React, { useContext } from "react";
// import { Typography, Box, CssBaseline } from "@mui/material";
// import ResponsiveAppBar from "../components/Appbar";
// import ResponsiveDrawer from "../components/PermanentDrawer";
// import { Outlet, useLocation } from "react-router-dom";
// import Footer from "../components/Footer";
// import DashboardCards from "../components/DashboardCards";
// import { AuthContext } from "../../Context/AuthContext";

// const Dashboard = () => {
//   const { auth } = useContext(AuthContext);
//   const location = useLocation();
//   const isRoot = location.pathname === "/mentor/dashboard";

//   const today = new Date();
//   const formattedDate = today.toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh",
//         background: "linear-gradient(to right, rgb(13, 17, 16), rgba(80, 36, 163, 0.42))",
//         color: "white",
//       }}
//     >
//       <CssBaseline />
//       <ResponsiveAppBar />
//       <ResponsiveDrawer>
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             mt: 5,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             textAlign: "center",
//           }}
//         >
//           {isRoot ? (
//             <>
//               <Box sx={{ mb: 5 }}>
//                 <Typography variant="h4" gutterBottom>
//                   Welcome, Mr {auth.user.firstname?.charAt(0).toUpperCase() + auth.user.firstname?.slice(1) || "Guest"}
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   gutterBottom
//                   sx={{ color: "rgba(255, 255, 255, 0.8)", mb: 5 }}
//                 >
//                   Today is {formattedDate}
//                 </Typography>
//                 <DashboardCards />
//               </Box>
//             </>
//           ) : (
//             <Outlet />
//           )}
//         </Box>
//         <Footer />
//       </ResponsiveDrawer>
//     </Box>
//   );
// };

// export default Dashboard;
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

  // Determine if this is the root dashboard path
  const isRoot = location.pathname === `/${auth.user.role}/dashboard`;

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Define dynamic content based on role
  const roleTitle = auth.user.role === "mentor" ? "Mentor" : "Applicant";
  const roleDashboardPath = `/${auth.user.role}/dashboard`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background:
          "linear-gradient(to right, rgb(13, 17, 16), rgba(80, 36, 163, 0.42))",
        color: "white",
      }}
    >
      <CssBaseline />
      <ResponsiveAppBar />
      <ResponsiveDrawer role={auth.user.role}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
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
                  Welcome, Mr{" "}
                  {auth.user.firstname.charAt(0).toUpperCase() +
                    auth.user.firstname.slice(1)}
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "text.secondary", mb: 5 }}
                >
                  Today is {formattedDate}
                </Typography>

                {/* Conditionally render dashboard elements */}
                {auth.user.role === "mentor" ? (
                  <DashboardCards />
                ) : (
                  <Typography variant="body1">
                    Here you can manage your applications and view interview
                    schedules.
                  </Typography>
                )}
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
