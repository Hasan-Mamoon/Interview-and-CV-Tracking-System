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
import { UserProvider } from './Context/UserContext';

function App() {
  return (
    <AuthContextProvider>
      <UserProvider>
       <CandidateProvider> 
        <BrowserRouter>
          <Routes>
            <Route path="/user/signup" element={<SignUp />} />
            <Route path="/user/signin" element={<SignIn />} />
            <Route path="/mentor/dashboard" element={<ProtectedRoute element={<Dashboard />} />}>
              <Route path="review-cvs" element={<ReviewCvs />} />
              <Route path="schedule" element={<ScheduleMeeting />} />
            </Route>
          </Routes>
        </BrowserRouter>
       </CandidateProvider>
      </UserProvider>
    </AuthContextProvider>
  );
}

export default App;