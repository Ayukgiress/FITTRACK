import React from "react";  
import caloriesCalculatorImg from "../../src/assets/images/iconmonstr-calculator-8-240.png";  
import micronutrientsCalculatorImg from "../../src/assets/images/seafood_11645217.png";  
import fitnessGoalsImg from "../../src/assets/images/bodybuilder_3889169.png";

const Fitness = () => {  
  return (  
    <div className="text-white bg-black flex flex-col lg:h-[32rem] items-center py-10">  
      <h1 className="text-3xl font-bold mb-6">Our Fitness</h1>  

      <h4 className="text-lg text-center max-w-md mb-8">  
        Access a variety of tools to help you reach your fitness goals more  
        effectively  
      </h4>  

      <div className="flex flex-wrap justify-center gap-8 md:gap-12">  
        <div className="flex flex-col items-center justify-center w-80 md:w-96 h-96 bg-fitness p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105">  
          <img  
            src={caloriesCalculatorImg}  
            alt="Calories Calculator"  
            className="w-32 h-32 md:w-40 md:h-40 filter invert brightness-0"  
          />  
          <h1 className="text-2xl md:text-3xl mt-4">Calories Calculator</h1>  
        </div>  

        <div className="flex flex-col items-center justify-center w-80 md:w-96 h-96 bg-fitness p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105">  
          <img  
            src={micronutrientsCalculatorImg}  
            alt="Micronutrients Calculator"  
            className="w-32 h-32 md:w-40 md:h-40 filter invert brightness-0"  
          />  
          <h1 className="text-2xl md:text-3xl mt-4">Micronutrients Calculator</h1>  
        </div>  

        <div className="flex flex-col items-center justify-center w-80 md:w-96 h-96 bg-fitness p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105">  
          <img  
            src={fitnessGoalsImg}  
            alt="Fitness Setting Goals"  
            className="w-32 h-32 md:w-40 md:h-40 filter invert brightness-0"  
          />  
          <h1 className="text-2xl md:text-3xl mt-4">Fitness Setting Goals</h1>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default Fitness;  
