import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Mike",
    image: "src/assets/images/pexels-mike-jones-8874913-Photoroom.png",
    quote:
      "I’ve been using ActivePulse for the past three months, and I’m genuinely impressed. The website is easy to navigate, and everything is laid out clearly. I purchased the Premium Plan, and the personalized coaching has been a game-changer for me. My coach is incredibly supportive and always available to answer my questions. The weekly video sessions keep me motivated, and the custom meal plans have helped me stay on track with my goals. Highly recommended for anyone serious about their fitness journey!",
  },
  {
    name: "Smith",
    image: "src/assets/images/pexels-tima-miroshnichenko-5327454-Photoroom.png",
    quote:
      "This fitness tracker app has completely transformed how I approach my workouts. The detailed analytics and goal-setting features help me stay focused and make progress every day. I also love the reminders to move and stay active throughout the day—it's like having a personal trainer in my pocket!",
  },
  {
    name: "Johnson",
    image: "src/assets/images/pexels-mike-jones-8874355-Photoroom.png",
    quote:
      "I've been using this fitness tracker app for a few weeks now, and it's been a game-changer! The real-time tracking and personalized workout suggestions keep me motivated, and I love how it integrates seamlessly with my daily routine. Plus, the progress reports give me that extra push to stay on track. Highly recommend it to anyone serious about their fitness goals!",
  },
  {
    name: "Giress",
    image: "src/assets/images/pexels-panther-1547248-Photoroom.png",
    quote: "I am very well pleased with the fitness tracker tool its one of its kind as it comes with a friendly interface, easy to navgate and more to that, it process tracking tool is many of its kind, "
  }
];

const Customers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const { name, image, quote } = testimonials[currentIndex];

  return (
    <>
      <h1 className="text-white text-2xl text-center">
        What Our <span className="text-red-700"> Customers Say</span>
      </h1>
      <h3 className="text-center text-white mb-6">
        At this part you can see many positive reviews of our customers
      </h3>

      <div className="flex flex-col md:flex-row justify-center items-center gap-7 px-4">
        <div className="flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-48 h-48 md:w-72 md:h-80 rounded-md mb-4 bg-image-backdrop"
          />
        </div>

        <div className="md:w-3/4 flex items-start gap-6 md:gap-24 flex-col bg-red-700 text-white rounded-md p-4 md:h-56">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-start text-white">{quote}</p>
        </div>
      </div>

      <div className="flex justify-between gap-4 mt-4 px-4 md:px-0">
        <button
          onClick={prevTestimonial}
          className="text-blue-500 flex items-center bg-red-700 w-24 h-9 text-center justify-center rounded-md"
        >
          <FaChevronLeft className="mr-2" /> Prev
        </button>
        <button
          onClick={nextTestimonial}
          className="text-blue-500 flex items-center bg-red-700 w-24 h-9 text-center justify-center rounded-md"
        >
          Next <FaChevronRight className="ml-2" />
        </button>
      </div>
    </>
  );
};

export default Customers;
