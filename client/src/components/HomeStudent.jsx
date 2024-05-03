import React from "react";
import StudentAppBar from "../components/StudentAppBar";
import studentImage from "../../../client/src/picture.jpg";

const Home = () => {
  return (
    <>
      <StudentAppBar />
      <div className="home-content">
        <div className="student-text">StudentHome</div>
        <img src={studentImage} alt="Student" className="student-image" />
      </div>
    </>
  );
};

export default Home;
