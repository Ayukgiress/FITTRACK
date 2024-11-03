import React from "react";

// Import images directly
import buildingMusclesImage from "../../src/assets/images/pexels-mike-jones-8874913-Photoroom.png";
import trainingAtHomeImage from "../../src/assets/images/pexels-nappy-935965-Photoroom.png";
import gymPlanImage from "../../src/assets/images/pexels-mike-jones-8875298-Photoroom.png";

const OurService = () => {
  return (
    <div className="bg-customGradient text-white flex flex-col items-center p-4">
      <h1 className="text-2xl mb-8">Our Services</h1>

      <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20">
        {/* Service Item 1 */}
        <div className="flex flex-col md:flex-row w-full md:w-96 h-auto md:h-96">
          <div className="flex flex-col justify-between p-4 w-full md:w-3/5 h-full" style={{ background: "linear-gradient(to right, #4d210e, #191919)" }}>
            <h1 className="mb-2 text-lg">Building Muscles</h1>
            <h3 className="text-sm leading-snug">
              Develop strength and define <br />
              your muscles with a tailored <br />
              program designed to help <br />
              you gain lean mass efficiently. <br />
              Click on the button below and <br />
              start your journey right now. <br />
              Don't miss the chance.
            </h3>
          </div>
          <img
            src={buildingMusclesImage}
            alt="Building Muscles"
            className="w-full md:w-2/5 h-full object-cover"
            style={{ backgroundColor: "#191919" }}
          />
        </div>

        {/* Service Item 2 */}
        <div className="flex flex-col md:flex-row w-full md:w-96 h-auto md:h-96">
          <div className="flex flex-col justify-between p-4 w-full md:w-3/5 h-full" style={{ background: "linear-gradient(to right, #4d210e, #191919)" }}>
            <h1 className="mb-2 text-lg">Training at Home</h1>
            <h3 className="text-sm leading-snug">
              Develop strength and define <br />
              your muscles with a tailored <br />
              program designed to help <br />
              you gain lean mass efficiently. <br />
              Click on the button below and <br />
              start your journey right now. <br />
              Don't miss the chance.
            </h3>
          </div>
          <img
            src={trainingAtHomeImage}
            alt="Training at Home"
            className="w-full md:w-2/5 h-full object-cover"
            style={{ backgroundColor: "#191919" }}
          />
        </div>

        {/* Service Item 3 */}
        <div className="flex flex-col md:flex-row w-full md:w-96 h-auto md:h-96">
          <div className="flex flex-col justify-between p-4 w-full md:w-3/5 h-full" style={{ background: "linear-gradient(to right, #4d210e, #191919)" }}>
            <h1 className="mb-2 text-lg">Gym Plan</h1>
            <h3 className="text-sm leading-snug">
              Develop strength and define <br />
              your muscles with a tailored <br />
              program designed to help <br />
              you gain lean mass efficiently. <br />
              Click on the button below and <br />
              start your journey right now. <br />
              Don't miss the chance.
            </h3>
          </div>
          <img
            src={gymPlanImage}
            alt="Gym Plan"
            className="w-full md:w-2/5 h-full object-cover"
            style={{ backgroundColor: "#191919" }}
          />
        </div>
      </div>
    </div>
  );
};

export default OurService;
