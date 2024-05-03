//import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./components/Home";
import HomeStudent from "./components/HomeStudent";
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/mentor/signup" element={<SignUp/>}></Route> 
      <Route path="/mentor/signin" element={<SignIn/>}></Route> 
      <Route path='/mentor/dashboard' element={<Dashboard/>}></Route>
      <Route path="/" element={<Home />}></Route>
          <Route path="/student" element={<HomeStudent />}></Route>
          <Route path="/student/sign-up" element={<Signup />}></Route>
          <Route path="/student/sign-in" element={<Signin />}></Route>
    </Routes>
        
    </BrowserRouter>
    
    </>

  );
}

export default App;
