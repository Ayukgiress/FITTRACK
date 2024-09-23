import React from "react";

const AboutApp = () => {
  return (
    <div className="flex items-center justify-center gap-6 flex-col py-8">
      <h1 className="text-3xl text-white text-center font-bold mb-6">FAQ</h1>

      <div className="w-full max-w-full px-4">
        <div className="bg-black border-2 border-red-700 h-auto text-white p-4 mb-4">
          <h2 className="text-lg font-semibold">
            What is ActivePulse and how can it help me reach my fitness goals?
          </h2>
        </div>

        <div className="bg-black border-2 border-red-700 h-auto text-white p-4 mb-4">
          <h2 className="text-lg">
            ActivePulse is an online fitness platform that offers personalized
            workout plans, expert coaching, and comprehensive nutritional
            guidance. Whether you're looking to lose weight, build muscle, or
            simply stay fit, our tailored programs and community support will
            help you achieve your fitness goals.
          </h2>
        </div>

        <div className="bg-black border-2 border-red-700 h-auto text-white p-4 mb-4">
          <h2 className="text-lg font-semibold">
            How do I get started with a workout plan on ActivePulse?
          </h2>
        </div>

        <div className="bg-black border-2 border-red-700 h-auto text-white p-4 mb-4">
          <h2 className="text-lg font-semibold">
            Can I change my plan after signing up?
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AboutApp;
