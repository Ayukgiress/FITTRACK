import React from "react";
import caloriesCalculatorImg from "../../src/assets/images/iconmonstr-calculator-8-240.png";
import micronutrientsCalculatorImg from "../../src/assets/images/seafood_11645217.png";
import fitnessGoalsImg from "../../src/assets/images/bodybuilder_3889169.png";

const Fitness = () => {
  return (
    <div className="text-white 3xl:h-[50rem] bg-black flex flex-col items-center py-10 px-4 3xl:m-4 lg:h-[30rem]">
      <h1 className="text-3xl font-bold mb-6 text-center 3xl:text-6xl">Our Fitness</h1>

      <h4 className="text-lg text-center max-w-3xl mb-8 px-4 3xl:text-3xl">
        Access a variety of tools to help you reach your fitness goals more
        effectively.
      </h4>

      <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-2">
        <div className="flex flex-col items-center justify-center w-full sm:w-64 md:w-8 lg:w-[15rem] xl:w-[27rem] lg:h-[28rem] xl:h-[30rem]  3xl:w-[47rem] 3xl:h-[36rem] gap-4 m-4 bg-fitness p-4 lg:p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <img
            src={caloriesCalculatorImg}
            alt="Calories Calculator"
            className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 filter invert brightness-0 3xl:w-80 3xl:h-60"
          />
          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl mt-4 text-center 3xl:text-5xl">Calories Calculator</h1>
        </div>

        <div className="flex flex-col items-center justify-center w-full sm:w-64 md:w-80 lg:w-[15rem] xl:w-[27rem] 3xl:w-[50rem] 3xl:h-[37rem] lg:h-[28rem] xl:h-[30rem] gap-4 m-4 bg-fitness p-4 lg:p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <img
            src={micronutrientsCalculatorImg}
            alt="Micronutrients Calculator"
            className="w-32 h-32 md:w-36 3xl:w-80 3xl:h-60 md:h-36 lg:w-40 lg:h-40 filter invert brightness-0"
          />
          <h1 className="text-2xl 3xl:text-5xl sm:text-3xl md:text-3xl lg:text-3xl mt-4 text-center">Micronutrients Calculator</h1>
        </div>

        <div className="flex flex-col items-center justify-center w-full sm:w-64 md:w-80  lg:w-[15rem] xl:w-[27rem] lg:h-[28rem] xl:h-[30rem] gap-4 m-4 bg-fitness  3xl:w-[47rem] 3xl:h-[36rem] p-4 lg:p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <img
            src={fitnessGoalsImg}
            alt="Fitness Setting Goals"
            className="w-32 h-32 md:w-36 md:h-36 3xl:w-80 3xl:h-60 lg:w-40 lg:h-40 filter invert brightness-0"
          />
          <h1 className="text-2xl 3xl:text-5xl sm:text-3xl md:text-3xl lg:text-3xl mt-4 text-center">Fitness Setting Goals</h1>
        </div>
      </div>
    </div>
  );
};

export default Fitness;
