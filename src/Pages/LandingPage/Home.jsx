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
      <div className="bg-customGradient xl:h-[46rem] 3xl:h-[60rem] h-[40rem] flex flex-col md:flex-row items-center justify-around gap-5 md:gap-40 lg:gap-40 3xl:gap-20 2xl:gap-80">
        <div className="flex items-start justify-between flex-col text-white gap-6 text-center md:text-left xl:ml-16">
          <h1 className="text-white 3xl:text-8xl text-4xl md:text-5xl lg:text-6xl gap-2 home-texts 3xl:ml-16">
            Achieve Your
            Fitness <br /> With
            Active<span className="text-red-600">Pulse</span>
          </h1>
          <h4 className="text-sm md:text-base lg:text-lg home-text 3xl:text-3xl 3xl:ml-16">
            "Join the Active <span className="text-red-600">Pulse</span> community and transform your fitness journey. <br /> 
            Our expert coaches and personalized programs are designed to help 
            you <br /> achieve your goals and exceed your expectations. Ready to make a change?"
          </h4>
          <Link to="/login">
            <button className="w-72 3xl:w-[35rem] 3xl:ml-16 3xl:h-[5rem] h-12 3xl:text-4xl rounded-md bg-red-700 text-white start-btn">
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
