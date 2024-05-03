import React from "react";
import HomeAppBar from "../components/HomeAppBar";
import HomeImage from "../../src/picture1.jpg";

const Home = () => {
  return (
    <>
      <HomeAppBar />
      <div className="home-content">
        <img src={HomeImage} alt="Home" className="home-image" />
      </div>
    </>
  );
};

export default Home;
