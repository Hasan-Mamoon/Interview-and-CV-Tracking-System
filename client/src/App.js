//import logo from './logo.svg';
import './App.css';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';


// import Home from "./components/Home";

// import { AuthProvider } from './Context/AuthContext';
import { useAuth } from './Context/AuthContext';
import ProtectedRoute from './components/ProtectedRoutes';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ReviewCvs from './pages/ReviewCvs';
import ScheduleMeeting from "./pages/ScheduleInterviews";

function App() {
  return (
    <>
    <useAuth>
    <BrowserRouter>
    
    <Routes>
      <Route path="/mentor/signup" element={<SignUp/>}></Route> 
      <Route path="/mentor/signin" element={<SignIn/>}></Route> 
      <Route path="/mentor/dashboard" element={<ProtectedRoute element={<Dashboard />} />} >
          <Route path="review-cvs" element={<ReviewCvs />} />
          <Route path="schedule" element={<ScheduleMeeting />} />
        </Route>
      {/* <Route path="/mentor/dashboard/review-cvs" element={<ReviewCvs/>}></Route> 
      <Route path="/mentor/dashboard/schedule" element={<ScheduleMeeting/>}></Route>  */}
      {/* <Route path='/mentor/dashboard' element={<Dashboard/>}></Route> */}
      <Route path="/mentor/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      {/* <Route path="/" element={<Home />}></Route> */}
      {/* <Route path="/student" element={<HomeStudent />}></Route>
      <Route path="/student/sign-up" element={<Signup />}></Route>
      <Route path="/student/sign-in" element={<Signin />}></Route>
      
          <Route path="/student/dashboard" element={<Dashboard />}></Route>
          <Route path="/student/dashboard/apply" element={<Apply />}></Route>
          <Route
            path="/student/dashboard/details"
            element={<Details />}
          ></Route>
          <Route
            path="/student/dashboard/feedback"
            element={<Feedback />}
          ></Route> */}
    </Routes>
        
    </BrowserRouter>
    </useAuth>
    </>
   


  );
}

export default App;
