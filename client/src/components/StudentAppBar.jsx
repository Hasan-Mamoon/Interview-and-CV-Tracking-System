import React from "react";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="navbar-brand">Student</span>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/student/sign-up" className="navbar-link">
          Sign Up
        </Link>
        <Link to="/student/sign-in" className="navbar-link">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar2;
