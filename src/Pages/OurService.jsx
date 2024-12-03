import React from "react";
import buildingMusclesImage from "../../src/assets/images/pexels-mike-jones-8874913-Photoroom.png";
import trainingAtHomeImage from "../../src/assets/images/pexels-nappy-935965-Photoroom.png";
import gymPlanImage from "../../src/assets/images/pexels-mike-jones-8875298-Photoroom.png";

const OurService = () => {
  return (
    <div className="bg-customGradient 2xl:h-[28rem] xl:h-[37rem] 3xl:m-8 3xl:h-[50rem] xl:h-[50rem] text-white flex flex-col items-center justify-center p-4 3xl:mt-80">
      <h1 className="text-2xl mb-8 3xl:text-8xl xl:text-6xl sm:text-7xl">Our Services</h1>
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 md:gap-12 lg:gap-10">
        {/* Service Item 1 */}
        <div className="service w-full sm:w-82 lg:w-[32rem] flex flex-col sm:flex-row mb-4 xl:w-[27rem] 2xl:w-[33rem] 3xl:w-[48rem] 3xl:h-[47rem]">
          <div
            className="flex flex-col justify-between p-4 w-full min-h-[35rem] flex-grow"
            style={{ background: "linear-gradient(to right, #4d210e, #191919)" }}
          >
            <h1 className="mb-2 text-lg lg:text-2xl 3xl:text-6xl xl:text-4xl sm:text-5xl">Building Muscles</h1>
            <h3 className="text-sm lg:text-lg 3xl:text-3xl leading-snug lg:leading-normal sm:text-4xl">
              Develop strength and define your muscles with a tailored program designed to help you gain lean mass efficiently. Click on the button below and start your journey right now. Don't miss the chance.
            </h3>
          </div>
          <img
            src={buildingMusclesImage}
            alt="Building Muscles"
            className="w-full sm:w-1/2 object-cover flex-grow"
            style={{ backgroundColor: "#191919" }}
          />
        </div>

        {/* Service Item 2 */}
        <div className="service w-full sm:w-82 lg:w-[32rem] flex flex-col sm:flex-row mb-4 xl:w-[27rem] 2xl:w-[33rem] 3xl:w-[48rem] 3xl:h-[47rem]">
          <div
            className="flex flex-col justify-between p-4 w-full min-h-[35rem] flex-grow"
            style={{ background: "linear-gradient(to right, #4d210e, #191919)" }}
          >
            <h1 className="mb-2 text-lg lg:text-2xl 3xl:text-6xl xl:text-4xl sm:text-5xl">Training at Home</h1>
            <h3 className="text-sm lg:text-lg 3xl:text-3xl leading-snug lg:leading-normal sm:text-4xl">
              Train effectively from the comfort of your home with a personalized program designed to fit your needs and schedule.
            </h3>
          </div>
          <img
            src={trainingAtHomeImage}
            alt="Training at Home"
            className="w-full sm:w-1/2 object-cover flex-grow"
            style={{ backgroundColor: "#191919" }}
          />
        </div>

        {/* Service Item 3 */}
        <div className="service w-full sm:w-82 lg:w-[32rem] flex flex-col sm:flex-row mb-4 xl:w-[27rem] 2xl:w-[33rem] 3xl:w-[48rem] 3xl:h-[47rem]">
          <div
            className="flex flex-col justify-between p-4 w-full min-h-[35rem] flex-grow"
            style={{ background: "linear-gradient(to right, #4d210e, #191919)" }}
          >
            <h1 className="mb-2 text-lg lg:text-2xl 3xl:text-6xl xl:text-4xl sm:text-5xl">Gym Plan</h1>
            <h3 className="text-sm lg:text-lg 3xl:text-3xl leading-snug lg:leading-normal sm:text-4xl">
              Get a comprehensive gym plan tailored to your goals and current fitness level to help you maximize your results.
            </h3>
          </div>
          <img
            src={gymPlanImage}
            alt="Gym Plan"
            className="w-full sm:w-1/2 object-cover flex-grow"
            style={{ backgroundColor: "#191919" }}
          />
        </div>
      </div>
    </div>
  );
};

export default OurService;
