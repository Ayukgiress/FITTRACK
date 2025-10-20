import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logoImage from "../../src/assets/96ef8bf31735460fbde3e1c404a3212f-free (1).png";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-lg p-4 w-full flex flex-col md:flex-row justify-around items-center border-b-4 border-red-500 z-50">
      {/* Logo Section */}
      <div className="flex items-center mb-4 md:mb-0">
        <img
          src={logoImage}
          alt="logo"
          className="h-16 w-20"
        />
        <div className="text-gray-800 ml-3">
          <div className="flex items-center">
            <span className="font-bold text-2xl text-red-600">Active</span>
            <span className="font-bold text-2xl text-gray-800">Pulse</span>
          </div>
          <h5 className="text-sm text-gray-600 font-medium">Transform Your Body</h5>
        </div>
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-gray-800 hover:text-red-600 transition-colors">
          {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      

      <div className="hidden md:flex items-center gap-4">
        <Link to="/about" className="text-gray-800 font-semibold hover:text-red-600 transition-colors px-4 py-2">
          About
        </Link>
        <Link to="/login">
          <button className="rounded-lg border-2 border-red-500 text-red-600 font-semibold px-6 py-2 hover:bg-red-500 hover:text-white transition-all duration-300">
            Login
          </button>
        </Link>
        <Link to="/registration">
          <button className="bg-red-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300">
            Register
          </button>
        </Link>
      </div>

      {/* Mobile View */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 w-full bg-white border-t border-gray-200">
          <ul className="flex flex-col items-center text-gray-800 py-4">
            <li className="py-3 w-full text-center border-b border-gray-200">
              <Link to="/" onClick={toggleMenu} className="font-semibold hover:text-red-600 transition-colors">
                Home
              </Link>
            </li>
            <li className="py-3 w-full text-center border-b border-gray-200">
              <Link to="/about" onClick={toggleMenu} className="font-semibold hover:text-red-600 transition-colors">
                About
              </Link>
            </li>
            <li className="py-3 w-full text-center border-b border-gray-200">
              <Link to="/login" onClick={toggleMenu}>
                <button className="rounded-lg border-2 border-red-500 text-red-600 font-semibold px-6 py-2 hover:bg-red-500 hover:text-white transition-all duration-300">
                  Login
                </button>
              </Link>
            </li>
            <li className="py-3 w-full text-center">
              <Link to="/registration" onClick={toggleMenu}>
                <button className="bg-red-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300">
                  Register
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
