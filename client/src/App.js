import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './Context/AuthContext';
import { CandidateProvider } from './Context/CandidateContext';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import ReviewCvs from './pages/ReviewCvs';
import ScheduleMeeting from './pages/ScheduleInterviews';
import ProtectedRoute from './components/ProtectedRoutes';
import JitsiMeet from './components/JitsiMeet';
import ScheduledInterviews from './pages/ScheduledInterviews';
import { createTheme, ThemeProvider } from '@mui/material/styles';



function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark", // ✅ Enable dark mode
      primary: {
        main: "#90caf9", // Light blue
      },
      background: {
        default: "#121212", // Dark background
        paper: "#1e1e1e", // Slightly lighter dark
      },
      text: {
        primary: "#ffffff", // White text
        secondary: "#b0bec5", // Light gray text
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
            <Route path="/mentor/dashboard" element={<ProtectedRoute element={<Dashboard />} />}>
              <Route path="review-cvs" element={<ReviewCvs />} />
              <Route path="schedule" element={<ScheduleMeeting />} />
              <Route path="scheduled-interviews" element={<ScheduledInterviews />} />
            </Route>
          </Routes>
        </BrowserRouter>
       </CandidateProvider>
    </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;