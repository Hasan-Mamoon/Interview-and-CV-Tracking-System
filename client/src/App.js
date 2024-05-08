import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./components/Home";
import HomeStudent from "./components/HomeStudent";
import Dashboard from "./components/Dashboard";
import Apply from "./components/Apply";
import Details from "./components/Details";
import Feedback from "./components/Feedback";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
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
    </>
  );
}

export default App;
