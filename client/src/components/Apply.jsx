import React, { useState } from "react";
import AppBarr from "../components/AppBarr";
import axios from "axios";

const Apply = () => {
  const [email, setEmail] = useState("");
  const [firstname, setfname] = useState("");
  const [lastname, setlname] = useState("");
  const [uniname, setuniname] = useState("");
  const [department, setdepartment] = useState("");
  const [gpa, setgpa] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3045/apply/for-interview",
        {
          email,
          firstname,
          lastname,
          uniname,
          department,
          gpa,
        }
      );
      if (response.status === 200) {
        alert("Applied Successfully");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          alert("Email Already Exists");
        } else {
          alert("Applying Failed");
        }
      } else {
        console.error("Applying failed:", error);
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <AppBarr />
      <div className="page">
        <div className="container">
          <h2>Apply For Interview</h2>
          <br />
          <form onSubmit={handlesubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstname">FirstName:</label>
              <input
                type="text"
                placeholder="Enter FirstName"
                value={firstname}
                onChange={(e) => setfname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">LastName:</label>
              <input
                type="text"
                placeholder="Enter LastName"
                value={lastname}
                onChange={(e) => setlname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="uniname">University Name:</label>
              <input
                type="text"
                placeholder="Enter University Name"
                value={uniname}
                onChange={(e) => setuniname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department Name:</label>
              <input
                type="text"
                placeholder="Enter Department Name"
                value={department}
                onChange={(e) => setdepartment(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gpa">GPA:</label>
              <input
                type="text"
                placeholder="Enter GPA"
                value={gpa}
                onChange={(e) => setgpa(e.target.value)}
              />
            </div>
            <button className="btn-login" type="submit">
              Apply
            </button>
            <p></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Apply;
