import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../Pages/AuthContext";  // Assuming you're using an AuthContext
import logoImage from "../../src/assets/96ef8bf31735460fbde3e1c404a3212f-free (1).png"; // Adjust path as necessary

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();  // Retrieve authentication status from context
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page on logout
  };

  return (
    <nav className="bg-black p-4 w-full flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center justify-between w-full mb-4 md:mb-0">
        <div className="flex items-center">
          <img
            src={logoImage}
            alt="logo"
            className="h-16 w-20 md:h-18 3xl:h-52 3xl:w-60 md:w-24 lg:h-24 lg:w-30 rounded-md"
          />
          <div className="text-white ml-2 hidden md:block">
            <span className="font-bold text-lg  3xl:text-5xl">Active</span>
            <span className="text-red-600 font-bold text-lg  3xl:text-5xl">Pulse</span>
            <h5 className="text-xs  3xl:text-4xl">Transform Your Body</h5>
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <div className="hidden md:flex items-center 3xl:gap-12 gap-6">
        <Link to="/" className="text-white hover:text-red-600 px-3 py-2 3xl:text-4xl">
          Home
        </Link>
        <Link to="/about" className="text-white hover:text-red-600 px-3 py-2 3xl:text-4xl">
          About
        </Link>

        {/* Only show Dashboard link if authenticated */}
        {isAuthenticated && (
          <Link to="/dashboard" className="text-white hover:text-red-600 px-3 py-2 3xl:text-4xl">
            Dashboard
          </Link>
        )}

        {/* Register and Login buttons */}
        {!isAuthenticated ? (
          <>
            <Link to="/registration">
              <button className="bg-red-700 3xl:w-52 3xl:h-16 h-9 w-24 rounded-md text-white 3xl:text-4xl hover:bg-red-600 px-4 py-2">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-gray-700 text-white rounded-md px-4 py-2 3xl:text-4xl hover:bg-gray-600">
                Login
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-700 text-white rounded-md px-4 py-2 3xl:text-4xl hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 w-full">
          <ul className="flex flex-col items-center bg-black text-white border-t border-red-700">
            <li className="py-2 w-full text-center border-b border-red-700">
              <Link to="/" onClick={toggleMenu} className="w-full px-4 py-2">
                Home
              </Link>
            </li>
            <li className="py-2 w-full text-center border-b border-red-700">
              <Link to="/about" onClick={toggleMenu} className="w-full px-4 py-2">
                About
              </Link>
            </li>
            {/* Mobile Dashboard Link (only show if authenticated) */}
            {isAuthenticated && (
              <li className="py-2 w-full text-center border-b border-red-700">
                <Link to="/dashboard" onClick={toggleMenu} className="w-full px-4 py-2">
                  Dashboard
                </Link>
              </li>
            )}
            <li className="py-2 w-full text-center">
              <Link to="/login" onClick={toggleMenu}>
                <button className="btns rounded-md border-2 h-9 w-24 border-red-700 text-rose-400 font-medium shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:text-white">
                  Login
                </button>
              </Link>
            </li>
            <li className="py-2 w-full text-center">
              <Link to="/registration" onClick={toggleMenu}>
                <button className="bg-red-700 h-10 w-28 rounded-md btns p-6 text-white">
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
