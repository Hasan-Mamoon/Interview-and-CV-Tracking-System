import React from "react";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="navbar-brand">SignUp</span>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-link">
          Home
        </Link>
      </div>
    </div>
  );
};

export default Navbar2;
