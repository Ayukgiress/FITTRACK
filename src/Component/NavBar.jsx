import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logoImage from "../../src/assets/96ef8bf31735460fbde3e1c404a3212f-free (1).png"; // Adjust the import path as necessary

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black p-4 w-full flex flex-col md:flex-row justify-between nav items-center">
      {/* Logo Section */}
      <div className="flex items-center mb-4 md:mb-0">
        <img
          src={logoImage}
          alt="logo"
          className="h-18 w-24"
        />
        <div className="text-white ml-2">
          <span className="font-bold text-lg">Active</span>
          <span className="text-red-600 font-bold text-lg">Pulse</span>
          <h5 className="text-xs">Transform Your Body</h5>
        </div>
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white">
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className="hidden md:flex justify-center w-full">
        <Link to="/" className="text-white">
          Home
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-5">
        <Link to="/about" className="text-white">
          About
        </Link>
        <Link to="/login">
          <button className="rounded-md border-2 h-9 w-24 border-red-700 text-rose-400 font-medium shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:text-white">
            Login
          </button>
        </Link>
        <Link to="/registration">
          <button className="bg-red-700 h-9 w-24 rounded-md">
            Register
          </button>
        </Link>
      </div>

      {/* Mobile View */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col items-center text-white">
            <li className="py-2 w-full text-center border-b border-red-700">
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li className="py-2 w-full text-center border-b border-red-700">
              <Link to="/about" onClick={toggleMenu}>
                About
              </Link>
            </li>
            <li className="py-2 w-full text-center border-b border-red-700">
              <Link to="/login" onClick={toggleMenu}>
                <button className=" btns rounded-md border-2 h-9 w-24 border-red-700 text-rose-400 font-medium shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:text-white">
                  Login
                </button>
              </Link>
            </li>
            <li className="py-2 w-full text-center">
              <Link to="/registration" onClick={toggleMenu}>
                <button className="bg-red-700 h-10 w-28 rounded-md btns p-6">
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
