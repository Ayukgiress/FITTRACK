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
    <div className="p-12 bg-black rounded-2xl shadow-xl my-16 relative overflow-hidden 3xl:h-[40rem] 3xl:mt-80">
      <h1 className="text-center text-4xl sm:text-5xl font-extrabold text-white mb-8 3xl:text-7xl">
        What Our <span className="text-red-700">Customers</span> Say
      </h1>
      <p className="text-center text-xl text-white mb-12 3xl:text-3xl">
        See how our platform has transformed the fitness journeys of our customers.
      </p>

      <div className="flex flex-col items-center justify-center">
        <div className="relative w-full sm:w-3/4 md:w-2/3 mx-auto transition-opacity duration-500">
          <div className="absolute inset-0 flex justify-center items-center">
            <img
              src={image}
              alt={name}
              className="object-cover w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-full border-4 border-white shadow-xl transition-transform transform hover:scale-110"
            />
          </div>

          <div className="mt-32 sm:mt-40 text-center bg-white p-8 rounded-xl shadow-lg opacity-90 transition-all duration-500">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800">{name}</h3>
            <p className="text-lg sm:text-xl text-gray-600 mt-4">{quote}</p>
          </div>
        </div>

        <div className="flex justify-between w-full sm:w-3/4 mt-8 gap-6">
          <button
            onClick={prevTestimonial}
            className="flex items-center justify-center w-20 sm:w-24 h-12 text-lg font-semibold text-white rounded-full shadow-lg transition duration-300 transform hover:bg-red-700 hover:scale-110"
          >
            <FaChevronLeft className="mr-2" />
            Prev
          </button>
          <button
            onClick={nextTestimonial}
            className="flex items-center justify-center w-20 sm:w-24 h-12 text-lg font-semibold text-white rounded-full shadow-lg transition duration-300 transform hover:bg-red-700 hover:scale-110"
          >
            Next
            <FaChevronRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customers;
