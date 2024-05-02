import React from "react";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="navbar-brand">FAST-NU Book Shop</span>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/books" className="navbar-link">
          Books
        </Link>
        <Link to="/addbook" className="navbar-link">
          AddBook
        </Link>
        <Link to="/addstudent" className="navbar-link">
          Add Student
        </Link>
        <Link to="/dashboard" className="navbar-link">
          Dashboard
        </Link>
        <Link to="/sign-up" className="navbar-link">
          Sign Up
        </Link>
        <Link to="/sign-in" className="navbar-link">
          Login
        </Link>
        <Link to="/logout" className="navbar-link">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Navbar2;
