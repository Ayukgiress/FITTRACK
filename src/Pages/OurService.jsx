import React from "react";

// Import images directly
import buildingMusclesImage from "../../src/assets/images/pexels-mike-jones-8874913-Photoroom.png";
import trainingAtHomeImage from "../../src/assets/images/pexels-nappy-935965-Photoroom.png";
import gymPlanImage from "../../src/assets/images/pexels-mike-jones-8875298-Photoroom.png";

const OurService = () => {
  return (
    <div className="bg-customGradient text-white flex items-center h-[32rem] justify-around flex-col h-auto md:h-[34rem] p-4">
      <h1 className="text-2xl mb-8">Our Services</h1>
      
      <div className="flex flex-wrap items-center justify-around gap-10 md:gap-8 m-5">
        {/* Service Item 1 */}
        <div className="service flex flex-col md:flex-row w-full md:w-96 lg:w-[35rem] h-auto md:h-96 lg:h-[34rem]">
          <div className="flex flex-col justify-between p-4 w-full md:w-3/5 lg:w-2/3 h-full" style={{ background: "linear-gradient(to right, #4d210e, #191919)" }}>
            <h1 className="mb-2 text-lg lg:text-3xl">Building Muscles</h1>
            <h3 className="text-2xl leading-snug lg:leading-normal">
              Develop strength and define your muscles with a tailored program designed to help you gain lean mass efficiently.
              Click on the button below and start your journey right now. Don't miss the chance.
            </h3>
          </div>
          <img src={buildingMusclesImage} alt="Building Muscles" className="w-full md:w-2/5 lg:w-1/3 h-full object-cover" style={{ backgroundColor: "#191919" }} />
        </div>
        
        {/* Service Item 2 */}
        <div className="service flex flex-col md:flex-row w-full md:w-96 lg:w-[35rem] h-auto md:h-96 lg:h-[34rem]">
          <div className="flex flex-col justify-between p-4 w-full md:w-3/5 lg:w-2/3 h-full" style={{ background: "linear-gradient(to right, #4d210e, #191919)" }}>
            <h1 className="mb-2 text-lg lg:text-3xl">Training at Home</h1>
            <h3 className="text-2xl leading-snug lg:leading-normal">
              Develop strength and define your muscles with a tailored program designed to help you gain lean mass efficiently.
              Click on the button below and start your journey right now. Don't miss the chance.
            </h3>
          </div>
          <img src={trainingAtHomeImage} alt="Training at Home" className="w-full md:w-2/5 lg:w-1/3 h-full object-cover" style={{ backgroundColor: "#191919" }} />
        </div>

        {/* Service Item 3 */}
        <div className=" service flex flex-col md:flex-row w-full md:w-96 lg:w-[35rem] h-auto md:h-96 lg:h-[34rem]">
          <div className="flex flex-col justify-between p-4 w-full md:w-3/5 lg:w-2/3 h-full" style={{ background: "linear-gradient(to right, #4d210e, #191919)" }}>
            <h1 className="mb-2 text-lg lg:text-3xl">Gym Plan</h1>
            <h3 className="text-2xl leading-snug lg:leading-normal">
              Develop strength and define your muscles with a tailored program designed to help you gain lean mass efficiently.
              Click on the button below and start your journey right now. Don't miss the chance.
            </h3>
          </div>
          <img src={gymPlanImage} alt="Gym Plan" className="w-full md:w-2/5 lg:w-1/3 h-full object-cover" style={{ backgroundColor: "#191919" }} />
        </div>
      </div>
    </div>
  );
};

export default OurService;
