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
 <div className="bg-customGradient 3xl:h-[65rem] h-[40rem] flex flex-col md:flex-row items-center justify-around gap-6 md:gap-24 px-4 md:px-10">
  <div className="flex items-center justify-center flex-col text-white gap-6 text-center md:text-left">
    <h1 className="text-white 3xl:text-9xl text-4xl md:text-5xl lg:text-6xl gap-2 home-texts">
      Archive Your <br />
      Fitness With <br />
      Active<span className="text-red-600">Pulse</span>
    </h1>
    <h4 className="text-sm md:text-base lg:text-lg home-text 3xl:text-4xl ">
      "Join the Active <span className="text-red-600">Pulse</span> community and transform your fitness journey. 
      Our <br />expert coaches and personalized programs are designed to help 
      you achieve <br /> your goals and exceed your expectations. Ready to make a change?"
    </h4>
    <Link to="/login">
      <button className="w-72 3xl:w-[35rem] 3xl:h-[5rem] h-12 3xl:text-4xl rounded-md bg-red-700 text-white start-btn">
        Start Your Journey
      </button>
    </Link>
  </div>

  <div className="hidden md:flex justify-center">
    <img
      src={myImage}
      alt="Fitness Illustration"
      className="border-b-2 3xl:border-b-4 3xl:w-[56rem] 3xl:h-[40rem] border-red-600 h-72 sm:h-80 md:h-96 lg:h-[28rem] rounded-full w-72 sm:w-80 md:w-96 lg:w-[32rem] object-cover"
    />
  </div>
</div>



      <OurService />
      <Fitness />
      <Customers />
      <AboutApp />
    </>
  );
};

export default Home;
