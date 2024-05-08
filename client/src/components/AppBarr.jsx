import React from "react";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="navbar-brand">Dashboard</span>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/student/dashboard/apply" className="navbar-link">
          Apply
        </Link>
        <Link to="/student/dashboard/details" className="navbar-link">
          Details
        </Link>
        <Link to="/student/dashboard/feedback" className="navbar-link">
          Feedback
        </Link>
        <Link to="/" className="navbar-link">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Navbar2;
