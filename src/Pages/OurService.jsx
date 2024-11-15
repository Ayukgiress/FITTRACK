import React from "react";

// Import images directly
import buildingMusclesImage from "../../src/assets/images/pexels-mike-jones-8874913-Photoroom.png";
import trainingAtHomeImage from "../../src/assets/images/pexels-nappy-935965-Photoroom.png";
import gymPlanImage from "../../src/assets/images/pexels-mike-jones-8875298-Photoroom.png";

const OurService = () => {
  return (
    <div className="bg-customGradient 3xl:m-8 3xl:h-[65rem] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl mb-8  3xl:text-6xl">Our Services</h1>
      
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-12">
        {/* Service Item 1 */}
        <div className="service 3xl:w-[48rem] 3xl:h-[45rem]  flex flex-col md:flex-row w-full md:w-80 lg:w-[28rem] mb-4 md:mb-0">
          <div
            className="flex flex-col 3xl:w-80 justify-between p-4 w-full md:w-3/5 lg:w-2/3 min-h-[30rem] flex-grow"
            style={{ background: "linear-gradient(to right, #4d210e, #191919)" }}
          >
            <h1 className="mb-2 text-lg lg:text-3xl 3xl:text-5xl ">Building Muscles</h1>
            <h3 className="text-lg 3xl:text-4xl  lg:text-2xl leading-snug lg:leading-normal">
              Develop strength and define your muscles with a tailored program designed to help you gain lean mass efficiently.
              Click on the button below and start your journey right now. Don't miss the chance.
            </h3>
          </div>
          <img
            src={buildingMusclesImage}
            alt="Building Muscles"
            className="w-full md:w-2/5 lg:w-1/3 object-cover flex-grow"
            style={{ backgroundColor: "#191919" }}
          />
        </div>
        
        {/* Service Item 2 */}
        <div className="service 3xl:w-[48rem] 3xl:h-[45rem] flex flex-col md:flex-row w-full md:w-80 lg:w-[28rem] mb-4 md:mb-0">
          <div
            className="flex flex-col  3xl:w-80 justify-between p-4 w-full md:w-3/5 lg:w-2/3 min-h-[30rem] flex-grow"
            style={{ background: "linear-gradient(to right, #4d210e, #191919)" }}
          >
            <h1 className="mb-2 text-lg lg:text-3xl 3xl:text-5xl">Training at Home</h1>
            <h3 className="text-lg 3xl:text-5xl  lg:text-2xl leading-snug lg:leading-normal">
              Train effectively from the comfort of your home with a personalized program designed to fit your needs and schedule.
            </h3>
          </div>
          <img
            src={trainingAtHomeImage}
            alt="Training at Home"
            className="w-full md:w-2/5 lg:w-1/3 object-cover flex-grow"
            style={{ backgroundColor: "#191919" }}
          />
        </div>

        {/* Service Item 3 */}
        <div className="service 3xl:w-[48rem] 3xl:h-[45rem] flex flex-col md:flex-row w-full md:w-80 lg:w-[28rem] mb-4 md:mb-0">
          <div
            className="flex flex-col  3xl:w-80 justify-between p-4 w-full md:w-3/5 lg:w-2/3 min-h-[30rem] flex-grow"
            style={{ background: "linear-gradient(to right, #4d210e, #191919)" }}
          >
            <h1 className="mb-2 text-lg lg:text-3xl 3xl:text-5xl">Gym Plan</h1>
            <h3 className="text-lg 3xl:text-5xl  lg:text-2xl leading-snug lg:leading-normal">
              Get a comprehensive gym plan tailored to your goals and current fitness level to help you maximize your results.
            </h3>
          </div>
          <img
            src={gymPlanImage}
            alt="Gym Plan"
            className="w-full md:w-2/5 lg:w-1/3 object-cover flex-grow"
            style={{ backgroundColor: "#191919" }}
          />
        </div>
      </div>
    </div>
  );
};

export default OurService;
