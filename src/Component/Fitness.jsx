import React from "react";

const Fitness = () => {
  return (
    <div className="text-white bg-black flex items-center justify-center flex-col py-10">
      <h1 className="text-3xl font-bold mb-6">Our Fitness</h1>

      <div className="flex flex-col items-center">
        <h4 className="text-lg text-center max-w-md mb-8">
          Access a variety of tools to help you reach your fitness goals more
          effectively
        </h4>

        <div className="flex flex-wrap justify-center gap-5">
          <div className="flex items-center justify-center gap-4 w-72 h-80 bg-fitness m-5 flex-col text-center">
            <img
              src="src/assets/images/iconmonstr-calculator-8-240.png"
              alt="Calories Calculator"
              className="w-32 h-32 filter invert brightness-0"
            />
            <h1 className="text-2xl">Calories Calculator</h1>
          </div>

          <div className="flex items-center justify-center gap-4 w-72 h-80 bg-fitness m-5 flex-col text-center">
            <img
              src="src/assets/images/seafood_11645217.png"
              alt="Micronutrients Calculator"
              className="w-32 h-32 filter invert brightness-0"
            />
            <h1 className="text-2xl">Micronutrients Calculator</h1>
          </div>

          <div className="flex items-center justify-center gap-4 w-72 h-80 bg-fitness m-5 flex-col text-center">
            <img
              src="src/assets/bodybuilder_3889169.png"
              alt="Fitness Setting Goals"
              className="w-32 h-32 filter invert brightness-0"
            />
            <h1 className="text-2xl">Fitness Setting Goals</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fitness;
