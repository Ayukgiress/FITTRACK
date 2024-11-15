import React from "react";

const AboutApp = () => {
  return (
    <div className="flex items-center 3xl:h-[50rem] justify-center gap-6 flex-col py-8">
      <h1 className="text-3xl text-white text-center font-bold mb-6 3xl:text-6xl">FAQ</h1>

      <div className="w-full max-w-full sm:max-w-[80rem] md:max-w-[90rem] lg:max-w-[110rem] xl:max-w-[120rem] 2xl:max-w-[140rem] 3xl:max-w-[160rem] px-4">
        {/* FAQ 1 */}
        <div className="bg-black 3xl:h-70 3xl:p-8 3xl:gap-9 border-2 border-red-700 text-white p-4 mb-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold 3xl:text-5xl">
            What is ActivePulse and how can it help me reach my fitness goals?
          </h2>
          <p className="text-sm sm:text-base md:text-lg 3xl:text-4xl">
            ActivePulse is an online fitness platform that offers personalized
            workout plans, expert coaching, and comprehensive nutritional
            guidance. Whether you're looking to lose weight, build muscle, or
            simply stay fit, our tailored programs and community support will
            help you achieve your fitness goals.
          </p>
        </div>

        {/* FAQ 2 */}
        <div className="bg-black 3xl:h-70 3xl:p-8 border-2 border-red-700 text-white p-4 mb-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold 3xl:text-5xl">
            How do I get started with a workout plan on ActivePulse?
          </h2>
          <p className="text-sm sm:text-base md:text-lg 3xl:text-4xl">
            To get started, simply sign up on the ActivePulse platform, complete
            your profile, and select your fitness goals. Based on your input, we
            will suggest a personalized workout plan tailored to your needs.
          </p>
        </div>

        {/* FAQ 3 */}
        <div className="bg-black 3xl:h-70 3xl:p-8 border-2 border-red-700 text-white p-4 mb-4">
          <h2 className="text-lg 3xl:text-5xl sm:text-xl md:text-2xl font-semibold">
            Can I change my plan after signing up?
          </h2>
          <p className="text-sm sm:text-base md:text-lg 3xl:text-4xl">
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
