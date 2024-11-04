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
  <div className="bg-customGradient h-[34rem] flex items-center justify-around px-4 md:px-10 Home ">
        <div className="flex items-center justify-center flex-col text-white gap-6 text-center md:text-left">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl gap-2 home-texts">
            Archive Your <br />
            Fitness With <br />
            Active<span className="text-red-600">Pulse</span>
          </h1>
          <h4 className="text-sm md:text-base lg:text-lg home-text">
            "Join the Active <span className="text-red-600">Pulse</span> community and transform your fitness journey. 
            Our <br />expert coaches and personalized programs are designed to help 
            you achieve <br /> your goals and exceed your expectations. Ready to make a change?"
          </h4>
          <Link to="/login">
            <button className=" w-72 max-w-xs h-12 rounded-md bg-red-700 text-white start-btn">
              Start Your Journey
            </button>
          </Link>
        </div>

        <div className="hidden md:flex justify-center">
          <img
            src={myImage}
            alt="Fitness Illustration"
            className="bg-transparent border-b-2 border-red-600 h-96 rounded-full w-96 md:w-5/6 lg:w-2/3 img"
          />
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
