import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import mikeImage from "../../src/assets/images/pexels-mike-jones-8874913-Photoroom.png";
import smithImage from "../../src/assets/images/pexels-tima-miroshnichenko-5327454-Photoroom.png";
import johnsonImage from "../../src/assets/images/pexels-mike-jones-8874355-Photoroom.png";
import giressImage from "../../src/assets/images/pexels-panther-1547248-Photoroom.png";
import abrahemImage from "/src/assets/istockphoto-911795578-1024x1024.jpg"; // Corrected path
import antonioImage from "/src/assets/images/istockphoto-1127995521-1024x1024.jpg"
import thoeodoreImage from "/src/assets/images/istockphoto-678638896-1024x1024.jpg"


const testimonials = [
  {
    name: "Mike",
    image: mikeImage,
    quote:
      "I've been using ActivePulse for the past three months, and I'm genuinely impressed. The website is easy to navigate, and everything is laid out clearly. I purchased the Premium Plan, and the personalized coaching has been a game-changer for me. My coach is incredibly supportive and always available to answer my questions. The weekly video sessions keep me motivated, and the custom meal plans have helped me stay on track with my goals. Highly recommended for anyone serious about their fitness journey!",
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
    quote: "An incredible fitness platform that has revolutionized my approach to health and wellness. The intuitive design and comprehensive tracking features make staying motivated easier than ever!",
  },
  {
    name: "Antonio",
    image: antonioImage,
    quote: "ActivePulse has completely transformed my fitness journey! The platform is so easy to use, and the detailed tracking features have kept me on top of my goals every day. The personalized support I’ve received has been nothing short of amazing, and I feel more motivated than ever to push myself further. If you're looking for a game-changer in your health and wellness routine, this is it!",
  },
  {
    name: "Theodore",
    image: thoeodoreImage,
    quote: "I can’t say enough about how ActivePulse has elevated my health and fitness journey. The platform's user-friendly design and powerful tracking features have made it easier for me to stay consistent with my workouts and meal plans. I’ve seen real progress, and the ongoing motivation is invaluable. If you're serious about your wellness goals, this app is the perfect partner to help you get there."

    ,
  },
  {
    name: "Abraham",
    image: abrahemImage,
    quote: "Using ActivePulse has been a true turning point in my approach to health and fitness. The seamless design and in-depth tracking features have given me the tools to stay accountable and inspired, even on my toughest days. It’s not just about the workouts; it’s about building a lifestyle of wellness. This platform makes it possible to stay on track and keep growing with every step!",
  },
];

const Customers = () => {
  const [startIndex, setStartIndex] = useState(0);

  const nextTestimonials = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonials = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const getDisplayTestimonials = () => {
    return [
      testimonials[(startIndex) % testimonials.length],
      testimonials[(startIndex + 1) % testimonials.length],
      testimonials[(startIndex + 2) % testimonials.length],
    ];
  };

  return (
    <div className="p-8 sm:p-12 bg-black rounded-2xl shadow-xl my-16 relative overflow-hidden">
      <h1 className="text-center text-4xl sm:text-5xl font-extrabold text-white mb-8 3xl:text-7xl">
        What Our <span className="text-red-700">Customers</span> Say
      </h1>
      <p className="text-center text-xl text-white mb-12 3xl:text-3xl">
        See how our platform has transformed the fitness journeys of our customers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {getDisplayTestimonials().map((testimonial, index) => (
          <div
            key={testimonial.name}
            className="gap-8 flex flex-col items-center text-center bg-neutral-950 p-6 rounded-xl shadow-lg"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-red-700 mb-4 transform transition duration-300 hover:scale-110"
            />
            <h3 className="text-3xl font-semibold text-white mb-2">{testimonial.name}</h3>
            <p className="text-white text-base sm:text-lg">{testimonial.quote}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-6 mt-8">
        <button
          onClick={prevTestimonials}
          className=" outline-none flex items-center justify-center w-24 h-12  text-white rounded-full shadow-lg transition duration-300 hover:bg-red-700 hover:scale-110"
        >
          <FaChevronLeft className="mr-2" />
          Prev
        </button>
        <button
          onClick={nextTestimonials}
          className="outline-none flex items-center justify-center w-24 h-12 text-white rounded-full shadow-lg transition duration-300 hover:bg-red-700 hover:scale-110"
        >
          Next
          <FaChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Customers;