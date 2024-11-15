import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Import images directly
import mikeImage from "../../src/assets/images/pexels-mike-jones-8874913-Photoroom.png";
import smithImage from "../../src/assets/images/pexels-tima-miroshnichenko-5327454-Photoroom.png";
import johnsonImage from "../../src/assets/images/pexels-mike-jones-8874355-Photoroom.png";
import giressImage from "../../src/assets/images/pexels-panther-1547248-Photoroom.png";

const testimonials = [
  {
    name: "Mike",
    image: mikeImage,
    quote:
      "I’ve been using ActivePulse for the past three months, and I’m genuinely impressed. The website is easy to navigate, and everything is laid out clearly. I purchased the Premium Plan, and the personalized coaching has been a game-changer for me. My coach is incredibly supportive and always available to answer my questions. The weekly video sessions keep me motivated, and the custom meal plans have helped me stay on track with my goals. Highly recommended for anyone serious about their fitness journey!",
  },
  {
    name: "Smith",
    image: smithImage,
    quote:
      "This fitness tracker app has completely transformed how I approach my workouts. The detailed analytics and goal-setting features help me stay focused and make progress every day. I also love the reminders to move and stay active throughout the day—it's like having a personal trainer in my pocket!",
  },
  {
    name: "Johnson",
    image: johnsonImage,
    quote:
      "I've been using this fitness tracker app for a few weeks now, and it's been a game-changer! The real-time tracking and personalized workout suggestions keep me motivated, and I love how it integrates seamlessly with my daily routine. Plus, the progress reports give me that extra push to stay on track. Highly recommend it to anyone serious about their fitness goals!",
  },
  {
    name: "Giress",
    image: giressImage,
    quote: "   ",
  },
];

const Customers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const { name, image, quote } = testimonials[currentIndex];

  return (
    <div className="p-6 rounded-lg 3xl:h-[60rem] shadow-lg text-black m-16 h-90 md:mt-[20rem]">
      <h1 className="text-white text-3xl text-center 3xl:text-6xl mb-4">
        What Our <span className="text-red-700 3xl:text-6xl">Customers Say</span>
      </h1>
      <h3 className="text-center text-gray-300 mb-8 3xl:text-4xl">
        Here are some positive reviews from our customers
      </h3>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6">
        <div className="flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-48 h-48 3xl:w-96 3xl:h-[35rem] md:w-72 md:h-80 rounded-lg shadow-md transition-transform transform hover:scale-105"
          />
        </div>

        <div className="flex 3xl:gap-16 3xl:w-[140rem]  items-center justify-center flex-col md:w-3/4">
          <div className="bg-red-700  3xl:h-[20rem] text-white rounded-lg p-8 shadow-md md:h-44">
            <h3 className="text-lg font-semibold 3xl:text-5xl">{name}</h3>
            <p className="text-gray-200 3xl:text-4xl">{quote}</p>
          </div>

          <div className="flex justify-between mt-4 gap-4 w-full">
            <button
              onClick={prevTestimonial}
              className="flex items-center 3xl:w-52 3xl:text-4xl 3xl:h-16 justify-center w-full sm:w-28 h-10 text-white bg-black rounded-md shadow hover:bg-red-600 transition"
            >
              <FaChevronLeft className="mr-2 3xl:text-4xl" /> Prev
            </button>
            <button
              onClick={nextTestimonial}
              className="flex items-center 3xl:w-52 3xl:text-4xl   3xl:h-16 justify-center w-full sm:w-28 h-10 text-white bg-black rounded-md shadow hover:bg-red-600 transition"
            >
              Next <FaChevronRight className="ml-2 3xl:text-4xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
