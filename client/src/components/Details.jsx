import React, { useState } from "react";
import AppBarr from "../components/AppBarr";
import axios from "axios";
const Details = () => {
  const [email, setEmail] = useState("");
  const [firstname, setfname] = useState("");
  const [lastname, setlname] = useState("");
  const [dob, setdob] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [gender, setgender] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3045/upload/student-details",
        {
          email,
          firstname,
          lastname,
          dob,
          phoneno,
          gender,
        }
      );
      if (response.status === 200) {
        alert("Details Uploaded");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          alert("Email Already Exists");
        } else {
          alert("Details Uploading Failed");
        }
      } else {
        console.error("Detail Submission failed:", error);
        alert("An unexpected error occurred");
      }
    }
  };
  return (
    <>
      <AppBarr />
      <div className="page">
        <div className="container">
          <h2>Upload Details</h2>
          <br />
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstname">FirstName:</label>
            <input
              type="text"
              placeholder="Enter FirstName"
              onChange={(e) => setfname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">LastName:</label>
            <input
              type="lastname"
              placeholder="Enter LastName"
              onChange={(e) => setlname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date Of Birth:</label>
            <input
              type="dob"
              placeholder="Enter Date OF Birth"
              onChange={(e) => setdob(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneno">Phone Number:</label>
            <input
              type="phoneno"
              placeholder="Enter Phone Number"
              onChange={(e) => setphoneno(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <input
              type="gender"
              placeholder="Enter Gender"
              onChange={(e) => setgender(e.target.value)}
            />
          </div>
          <button className="btn-login" onClick={handlesubmit}>
            Submit
          </button>
          <p></p>
        </div>
      </div>
    </>
  );
};

export default Details;
