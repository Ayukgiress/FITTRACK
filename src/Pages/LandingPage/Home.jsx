import React from "react";
import { Link } from "react-router-dom";
import {
  FaDumbbell,
  FaUsers,
  FaChartLine,
  FaStar,
  FaBrain
} from "react-icons/fa";

const Home = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-24">

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-full mb-6 border border-white border-opacity-30">
              <FaBrain className="text-white mr-2" />
              <span className="text-white font-semibold">AI-Powered Fitness Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Transform Your
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Fitness Journey
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-12 leading-relaxed">
              Join millions of users who have revolutionized their fitness with our AI-powered platform.
              Get personalized workouts, expert guidance, and real results.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/register">
              <button className="bg-white text-blue-600 font-bold py-5 px-10 rounded-2xl text-lg transition-all transform hover:scale-105 shadow-2xl hover:shadow-white/25 flex items-center justify-center">
                <FaBrain className="mr-2" />
                Start Free Trial
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse ml-2"></div>
              </button>
            </Link>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 py-5 px-10 rounded-2xl font-bold text-lg transition-all transform hover:scale-105">
              Watch Demo
            </button>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">2.5M+</div>
              <p className="text-blue-100 font-medium">Active Users</p>
              <p className="text-sm text-blue-200">Worldwide</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">150+</div>
              <p className="text-blue-100 font-medium">Countries</p>
              <p className="text-sm text-blue-200">Global Reach</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">4.9★</div>
              <p className="text-blue-100 font-medium">App Rating</p>
              <p className="text-sm text-blue-200">User Reviews</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">500K+</div>
              <p className="text-blue-100 font-medium">Workouts</p>
              <p className="text-sm text-blue-200">Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Why Choose <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ActivePulse</span>?
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Experience the future of fitness with our comprehensive AI-powered platform designed for real results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            <div className="bg-gray-800 p-10 rounded-2xl shadow-xl border border-gray-700 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBrain className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Intelligence</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Our advanced machine learning algorithms analyze your performance, predict optimal workout intensity,
                and adapt plans in real-time based on your progress and feedback.
              </p>
              <div className="text-sm text-blue-400 font-semibold">✓ 99.2% Accuracy Rate</div>
            </div>

            <div className="bg-gray-800 p-10 rounded-2xl shadow-xl border border-gray-700 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaChartLine className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Advanced Analytics</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Track every aspect of your fitness journey with detailed metrics, progress visualization,
                and predictive insights that help you understand your body's response to training.
              </p>
              <div className="text-sm text-green-400 font-semibold">✓ Real-time Progress Tracking</div>
            </div>

            <div className="bg-gray-800 p-10 rounded-2xl shadow-xl border border-gray-700 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUsers className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Expert Community</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Connect with certified trainers, nutritionists, and millions of fitness enthusiasts worldwide.
                Share achievements, get motivation, and learn from the best in the industry.
              </p>
              <div className="text-sm text-purple-400 font-semibold">✓ 500+ Certified Experts</div>
            </div>
          </div>

          {/* Additional Features Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">∞</span>
              </div>
              <h4 className="font-bold text-white mb-2">Infinite Workouts</h4>
              <p className="text-gray-300 text-sm">10M+ unique workout combinations</p>
            </div>

            <div className="text-center p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">24/7</span>
              </div>
              <h4 className="font-bold text-white mb-2">Always Available</h4>
              <p className="text-gray-300 text-sm">Round-the-clock support and guidance</p>
            </div>

            <div className="text-center p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">📱</span>
              </div>
              <h4 className="font-bold text-white mb-2">Mobile Optimized</h4>
              <p className="text-gray-300 text-sm">Seamless experience across all devices</p>
            </div>

            <div className="text-center p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">🎯</span>
              </div>
              <h4 className="font-bold text-white mb-2">Goal Focused</h4>
              <p className="text-gray-300 text-sm">Personalized plans for your specific goals</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              About <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ActivePulse</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We're not just another fitness app. We're revolutionizing how people approach health and wellness
              through cutting-edge AI technology and expert-driven content.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  To democratize access to personalized fitness training by combining artificial intelligence
                  with human expertise. We believe everyone deserves a trainer in their pocket, regardless
                  of their location, budget, or experience level.
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  A world where fitness is accessible, enjoyable, and effective for everyone. We envision
                  a future where AI-powered coaching helps billions achieve their health goals while building
                  stronger, more connected communities.
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Our Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Innovation First</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-teal-400 rounded-full"></div>
                    <span className="text-gray-300">Expert-Driven</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    <span className="text-gray-300">Community Focused</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                    <span className="text-gray-300">Results Oriented</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
              <h4 className="text-2xl font-bold text-white mb-6">By The Numbers</h4>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Years of Research</span>
                  <span className="text-2xl font-bold text-blue-400">5+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">AI Models Trained</span>
                  <span className="text-2xl font-bold text-green-400">50+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Expert Contributors</span>
                  <span className="text-2xl font-bold text-purple-400">500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Countries Served</span>
                  <span className="text-2xl font-bold text-pink-400">150+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Success Rate</span>
                  <span className="text-2xl font-bold text-yellow-400">94%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Team/Leadership Section */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-8">Leadership Team</h3>
            <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
              Our diverse team of fitness experts, AI researchers, and technology innovators
              brings together decades of experience in health, wellness, and machine learning.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  DG
                </div>
                <h4 className="font-bold text-white mb-2">Dr. Sarah Mitchell</h4>
                <p className="text-gray-300 text-sm">Chief AI Officer</p>
                <p className="text-gray-400 text-xs mt-2">Former NASA researcher with 15+ years in machine learning</p>
              </div>

              <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  MC
                </div>
                <h4 className="font-bold text-white mb-2">Marcus Chen</h4>
                <p className="text-gray-300 text-sm">Head of Fitness Science</p>
                <p className="text-gray-400 text-xs mt-2">Olympic trainer and sports scientist with 20+ years experience</p>
              </div>

              <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  AG
                </div>
                <h4 className="font-bold text-white mb-2">Dr. Amara Grant</h4>
                <p className="text-gray-300 text-sm">VP of User Experience</p>
                <p className="text-gray-400 text-xs mt-2">Behavioral psychologist specializing in habit formation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Success Stories
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Join thousands of users who've transformed their lives with ActivePulse.
              Real results from real people around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                "ActivePulse completely transformed my fitness routine. The AI-powered plans are incredibly accurate and adapt perfectly to my progress. I've never felt more motivated!"
              </p>
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  SJ
                </div>
                <div>
                  <div className="font-bold text-white text-lg">Sarah Johnson</div>
                  <div className="text-gray-300">Fitness Enthusiast</div>
                  <div className="text-blue-400 text-sm font-semibold">Lost 25 lbs in 3 months</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                "As a personal trainer, I was skeptical about AI coaching. But ActivePulse has become an invaluable tool for my clients. The community and expert guidance are unmatched!"
              </p>
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  MC
                </div>
                <div>
                  <div className="font-bold text-white text-lg">Mike Chen</div>
                  <div className="text-gray-300">Personal Trainer</div>
                  <div className="text-green-400 text-sm font-semibold">500+ clients trained</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                "After years of inconsistent training, ActivePulse helped me build sustainable habits. The app's intelligence and the supportive community keep me accountable every day."
              </p>
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  ER
                </div>
                <div>
                  <div className="font-bold text-white text-lg">Emma Rodriguez</div>
                  <div className="text-gray-300">Busy Professional</div>
                  <div className="text-purple-400 text-sm font-semibold">6-month streak</div>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Rating Section */}
          <div className="bg-gray-50 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold text-black mb-6">Trusted by Millions</h3>
            <div className="flex justify-center items-center mb-8">
              <div className="text-6xl font-bold text-black mr-4">4.9</div>
              <div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-2xl" />
                  ))}
                </div>
                <p className="text-gray-600">Average rating from 2.5M+ reviews</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-red-600 mb-2">94%</div>
                <p className="text-gray-600">Goal Achievement Rate</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600 mb-2">85%</div>
                <p className="text-gray-600">Injury Reduction</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600 mb-2">92%</div>
                <p className="text-gray-600">User Retention</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
                <p className="text-gray-600">Expert Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-red-600 to-red-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center px-6 relative z-10">
          <div className="mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 rounded-full border border-white/30 mb-8">
              <FaBrain className="text-white mr-3 text-lg" />
              <span className="text-white font-semibold">Start Your Transformation Today</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Ready to Transform
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Your Fitness Journey?
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-red-100 mb-12 leading-relaxed max-w-4xl mx-auto">
              Join over 2.5 million users who have already transformed their lives with ActivePulse.
              Start your free trial today and experience the future of personalized fitness training.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-16">
            <Link to="/register">
              <button className="group bg-white text-red-600 font-bold py-6 px-12 rounded-2xl text-xl flex items-center gap-4 transition-all transform hover:scale-105 shadow-2xl hover:shadow-white/25">
                <FaBrain className="text-2xl" />
                Start Free Trial
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
              </button>
            </Link>

            <div className="flex flex-col items-center space-y-2 text-red-100">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <FaStar className="text-yellow-300" />
                  <span className="font-semibold">No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaStar className="text-yellow-300" />
                  <span className="font-semibold">Cancel anytime</span>
                </div>
              </div>
              <p className="text-red-200 text-sm">30-day free trial • Full access to all features</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500K+</div>
              <p className="text-red-100">Success Stories</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">94%</div>
              <p className="text-red-100">Goal Achievement</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <p className="text-red-100">Expert Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-600 rounded-xl blur opacity-25"></div>
                  <div className="relative bg-red-600 p-3 rounded-xl">
                    <FaDumbbell className="text-white text-2xl" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-white">ActivePulse</span>
              </div>

              <p className="text-gray-300 leading-relaxed text-lg mb-6 max-w-md">
                The future of fitness is here. AI-powered workouts that adapt to your body,
                predict your needs, and maximize your potential like never before.
              </p>

              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-gray-700 transition-all">
                  <span className="text-lg font-bold">f</span>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-gray-700 transition-all">
                  <span className="text-lg font-bold">in</span>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-gray-700 transition-all">
                  <span className="text-lg font-bold">IG</span>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-gray-700 transition-all">
                  <span className="text-lg font-bold">YT</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white text-lg mb-4">Platform</h3>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-red-600 transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">AI Training</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Analytics</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Mobile App</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gray-800 rounded-2xl p-8 mb-12">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-6">Get the latest fitness tips, AI updates, and exclusive offers delivered to your inbox.</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2024 ActivePulse. All rights reserved. Built for the future of fitness.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-gray-500 text-sm">Made with</span>
              <div className="flex items-center space-x-2">
                <FaBrain className="text-red-500" />
                <span className="text-gray-500 text-sm">AI</span>
              </div>
              <span className="text-gray-500 text-sm">for fitness enthusiasts</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
