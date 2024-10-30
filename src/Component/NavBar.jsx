import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black p-4 w-full flex item-center justify-center flex-col">
      <div className="container  flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src="src/assets/96ef8bf31735460fbde3e1c404a3212f-free (1).png"
            alt="img"
            className="h-18 w-24"
          />
          <div className="text-white ml-2">
            Active<span className="text-red-600">Pulse</span>
            <h5 className="text-xs">Transform Your Body</h5>
          </div>
        </div>

        <div className="hidden md:flex flex item-center justify-center">
          <ul className="flex items-center justify-between text-white">
            <li className="mx-4 flex items-center justify-center flex-col">
              <Link to="/">Home</Link>
              <div className="bg-red-600 w-16 h-1 items-center justify-center"></div>
            </li>
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-5">
          <Link to="/about" className="text-white ">
            About
          </Link>
          <Link to="/login">
            <button
              type="button"
              className="rounded-md border-2 h-9 w-24 border-red-700 px-5 py-2 text-sm font-medium text-rose-400 shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:text-white hover:shadow-lg focus:outline-none focus:ring-0 active:bg-rose-600"
            >
              Login
            </button>
          </Link>
          <Link to="/registration">
            <button className="bg-red-700 h-9 w-24 rounded-md">Register</button>
          </Link>
        </div>

        {/* mobile ToggleButton */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

{/* Mobile view */}
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
                <button
                  type="button"
                  className="rounded-md border-2 h-9 w-24 border-red-700 px-5 py-2 text-sm font-medium text-rose-400 shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:text-white hover:shadow-lg focus:outline-none focus:ring-0 active:bg-rose-600"
                >
                  Login
                </button>
              </Link>
            </li>
            <li className="py-2 w-full text-center">
              <Link to="/registration" onClick={toggleMenu}>
                <button className="bg-red-700 h-9 w-24 rounded-md">
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
