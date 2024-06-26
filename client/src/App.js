//import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./components/Home";
import HomeStudent from "./components/HomeStudent";
import Dashboard from "./components/Dashboard";
import Apply from "./components/Apply";
import Details from "./components/Details";
import Feedback from "./components/Feedback";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from './components/ProtectedRoutes';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ReviewCvs from './components/ReviewCvs';

function App() {
  return (
    <>
    <AuthProvider>
    <BrowserRouter>
    
    <Routes>
      <Route path="/mentor/signup" element={<SignUp/>}></Route> 
      <Route path="/mentor/signin" element={<SignIn/>}></Route> 
      <Route path="/mentor/dashboard/review-cvs" element={<ReviewCvs/>}></Route> 
      {/* <Route path='/mentor/dashboard' element={<Dashboard/>}></Route> */}
      <Route path="/mentor/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route path="/" element={<Home />}></Route>
      <Route path="/student" element={<HomeStudent />}></Route>
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
          ></Route>
    </Routes>
        
    </BrowserRouter>
    </AuthProvider>
    </>
   


  );
}

export default App;
