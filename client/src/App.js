import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";
import { CandidateProvider } from "./Context/CandidateContext";
import SignUp from "./pages/common/SignUp";
import SignIn from "./pages/common/SignIn";
import Dashboard from "./pages/common/Dashboard";
import ReviewCvs from "./pages/mentor/ReviewCvs";
import ScheduleMeeting from "./pages/mentor/ScheduleInterviews";
import ProtectedRoute from "./components/common/ProtectedRoutes";
import JitsiMeet from "./components/common/JitsiMeet";
import ScheduledInterviews from "./pages/mentor/ScheduledInterviews";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#2ebf91", // Vibrant green (consistent with Sign-In button)
      },
      secondary: {
        main: "#5024a3", // Deep purple (matching the gradient)
      },
      background: {
        default: "linear-gradient(to right, rgb(13, 17, 16), rgba(80, 36, 163, 0.42))", // Gradient Background
        paper: "rgba(30, 30, 30, 0.9)", // Slightly transparent dark background for cards/dialogs
      },
      text: {
        primary: "#ffffff", // White text for readability
        secondary: "rgba(255, 255, 255, 0.8)", // Slightly faded text
      },
      action: {
        hover: "rgba(255, 255, 255, 0.1)", // Subtle hover effect
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            background: "rgba(30, 30, 30, 0.9)", // Making Paper elements match the dashboard
            color: "#ffffff",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none", // Keep buttons modern and clean
            fontWeight: "bold",
            borderRadius: "8px",
          },
          containedPrimary: {
            backgroundColor: "#2ebf91",
            "&:hover": {
              backgroundColor: "#1ea672",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AuthContextProvider>
        <CandidateProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/user/signup" element={<SignUp />} />
              <Route path="/user/signin" element={<SignIn />} />
              <Route path="/mentor/jitsi" element={<JitsiMeet />} />
              <Route
                path="/user/dashboard"
                element={<ProtectedRoute element={<Dashboard />} />}
              >
                <Route path="review-cvs" element={<ReviewCvs />} />
                <Route path="schedule" element={<ScheduleMeeting />} />
                <Route
                  path="scheduled-interviews"
                  element={<ScheduledInterviews />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </CandidateProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
