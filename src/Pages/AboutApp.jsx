import React from "react";

const AboutApp = () => {
  return (
    <div className="flex items-center 3xl:h-[50rem] justify-center gap-6 flex-col py-8 3xl:mt-40">
      <h1 className="text-3xl text-white text-center font-bold mb-6 3xl:text-6xl xl:text-5xl">FAQ</h1>

      <div className="flex flex-col items-center justify-center w-full max-w-full sm:max-w-[80rem] md:max-w-[90rem] lg:max-w-[110rem] xl:max-w-[120rem] 2xl:max-w-[140rem] 3xl:max-w-[160rem] px-4">
        <div className="bg-black 3xl:h-70 3xl:p-8 3xl:gap-9 border-2 border-red-700 text-white p-4 mb-4 xl:w-[80rem] 2xl:w-[109rem] 3xl:w-[150rem]">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold 3xl:text-5xl">
            What is ActivePulse and how can it help me reach my fitness goals?
          </h2>
          <p className="text-sm sm:text-base md:text-lg 3xl:text-4xl  text-gray-500">
            ActivePulse is an online fitness platform that offers personalized
            workout plans, expert coaching, and comprehensive nutritional
            guidance. Whether you're looking to lose weight, build muscle, or
            simply stay fit, our tailored programs and community support will
            help you achieve your fitness goals.
          </p>
        </div>

        <div className="bg-black 3xl:h-70 3xl:p-8 border-2 border-red-700 text-white p-4 mb-4 xl:w-[80rem] 2xl:w-[109rem] 3xl:w-[150rem]">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold 3xl:text-5xl">
            How do I get started with a workout plan on ActivePulse?
          </h2>
          <p className="text-sm sm:text-base md:text-lg 3xl:text-4xl  text-gray-500">
            To get started, simply sign up on the ActivePulse platform, complete
            your profile, and select your fitness goals. Based on your input, we
            will suggest a personalized workout plan tailored to your needs.
          </p>
        </div>

        <div className="bg-black 3xl:h-70 3xl:p-8 border-2 border-red-700 text-white p-4 mb-4 xl:w-[80rem] 2xl:w-[109rem] 3xl:w-[150rem]">
          <h2 className="text-lg 3xl:text-5xl sm:text-xl md:text-2xl font-semibold">
            Can I change my plan after signing up?
          </h2>
          <p className="text-sm sm:text-base md:text-lg 3xl:text-4xl text-gray-500">
            Yes! You can update or change your workout plan anytime. If you want
            to modify your goals, simply reach out to our support team or update
            your preferences in your account settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutApp;