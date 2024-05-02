import React from "react";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="navbar-brand">Mentor</span>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/mentor/sign-up" className="navbar-link">
          Sign Up
        </Link>
        <Link to="/mentor/sign-in" className="navbar-link">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Navbar2;
