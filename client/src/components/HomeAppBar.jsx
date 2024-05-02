import React from "react";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="navbar-brand">INTERVIEW_AND_CV_TRACKING_SYSTEM</span>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/Mentor" className="navbar-link">
          Mentor
        </Link>
        <Link to="/Student" className="navbar-link">
          Student
        </Link>
      </div>
    </div>
  );
};

export default Navbar2;
