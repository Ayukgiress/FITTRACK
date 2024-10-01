import React from "react";
import { Link } from "react-router-dom";
import OurService from "../OurService";
import Fitness from "../../Component/Fitness";
import Customers from "../Customers";
import AboutApp from "../AboutApp";
import myImage from "../../assets/images/pexels-panther-1547248-Photoroom.png";

const Home = () => {
  return (
    <>
      <div className="bg-customGradient h-96 w-full flex items-center justify-around g-2">
        <div className="flex items-center justify-center flex-col text-white gap-6">
          <h1 className="text-white text-3xl gap-2">
            Archive Your <br />
            Fitness With <br />
            Active<span className="text-red-600">Pulse</span>
          </h1>
          <h4 className="text-sm">
            "Join the Active <span className="text-red-600">Pulse</span>{" "}
            community and transform your fitness journey. <br />
            Our expert coaches and personalized programs are designed to help{" "}
            <br />
            you achieve your goals and exceed your expectations. Ready to make a
            change?"
          </h4>
          <Link to="/login">
            <button className="w-96 h-9 rounded-md bg-red-700">
              Start Your Journey
            </button>
          </Link>
        </div>

        <div>
          <img
            src={myImage}
            alt="img"
            className="bg-transparent border-b-2 border-red-600 h-80 rounded-full w-5/6"
          />{" "}
        </div>
      </div>
      <OurService />
      <Fitness />
      <Customers />
      <AboutApp />
      {/* <Footer/> */}
    </>
  );
};

export default Home;
