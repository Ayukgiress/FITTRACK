import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiInfo, FiTrendingUp } from "react-icons/fi";
import logoImage from "../../src/assets/96ef8bf31735460fbde3e1c404a3212f-free (1).png";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <img
              src={logoImage}
              alt="logo"
              className="h-12 w-16"
            />
            <div className="ml-3">
              <div className="flex items-center">
                <span className="font-bold text-xl text-blue-600">Fit</span>
                <span className="font-bold text-xl text-gray-900">Track</span>
              </div>
              <p className="text-xs text-gray-600 font-medium">Track Your Fitness Journey</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium">
              <FiHome className="mr-2" />
              Home
            </a>
            <a href="#dashboard" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium">
              <FiTrendingUp className="mr-2" />
              Dashboard
            </a>
            <a href="#about" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium">
              <FiInfo className="mr-2" />
              About
            </a>
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <button className="text-blue-600 hover:text-blue-700 font-semibold px-4 py-2 transition-colors">
                  Login
                </button>
              </Link>
              <Link to="/registration">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 transition-colors p-2"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/"
                onClick={toggleMenu}
                className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                <FiHome className="mr-3" />
                Home
              </a>
              <a
                href="#dashboard"
                onClick={toggleMenu}
                className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                <FiTrendingUp className="mr-3" />
                Dashboard
              </a>
              <a
                href="#about"
                onClick={toggleMenu}
                className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                <FiInfo className="mr-3" />
                About
              </a>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <Link to="/login" onClick={toggleMenu}>
                  <button className="w-full text-blue-600 hover:text-blue-700 font-semibold py-2 px-3 text-left transition-colors">
                    Login
                  </button>
                </Link>
                <Link to="/registration" onClick={toggleMenu}>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-md mt-2 transition-colors">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
