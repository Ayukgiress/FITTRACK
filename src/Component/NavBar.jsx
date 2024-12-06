import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../Pages/AuthContext";
import logoImage from "../../src/assets/96ef8bf31735460fbde3e1c404a3212f-free (1).png";

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const NavLinks = () => (
    <>
      <Link 
        to="/" 
        onClick={toggleMenu} 
        className="text-white hover:text-red-600 px-3 py-2"
      >
        Home
      </Link>
      <Link 
        to="/about" 
        onClick={toggleMenu} 
        className="text-white hover:text-red-600 px-3 py-2"
      >
        About
      </Link>
      
      {isAuthenticated && (
        <Link 
          to="/dashboard" 
          onClick={toggleMenu} 
          className="text-white hover:text-red-600 px-3 py-2"
        >
          Dashboard
        </Link>
      )}

      {!isAuthenticated ? (
        <>
          <Link 
            to="/registration"
            onClick={toggleMenu}
            className="block md:inline-block"
          >
            <button className="bg-red-700 h-9 w-24 rounded-md text-white hover:bg-red-600 px-4 py-2">
              Register
            </button>
          </Link>
          <Link 
            to="/login"
            onClick={toggleMenu}
            className="block md:inline-block ml-2"
          >
            <button className="bg-gray-700 text-white rounded-md px-4 py-2 hover:bg-gray-600">
              Login
            </button>
          </Link>
        </>
      ) : (
        <button
          onClick={handleLogout}
          className="bg-red-700 text-white rounded-md px-4 py-2 hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </>
  );

  return (
    <nav className="bg-black p-4 w-full flex flex-col md:flex-row justify-between items-center relative">
      <div className="flex items-center justify-between w-full mb-4 md:mb-0">
        <div className="flex items-center">
          <img
            src={logoImage}
            alt="logo"
            className="h-16 w-20 md:h-18 rounded-md"
          />
          <div className="text-white ml-2 hidden md:block">
            <span className="font-bold text-lg">Active</span>
            <span className="text-red-600 font-bold text-lg">Pulse</span>
          </div>
        </div>

        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-6">
        <NavLinks />
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-black z-20">
          <div className="flex flex-col items-center justify-center bg-black text-white border-t border-red-700 space-y-4 py-6">
            <Link 
              to="/" 
              onClick={toggleMenu} 
              className="text-center w-full hover:text-red-600"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              onClick={toggleMenu} 
              className="text-center w-full hover:text-red-600"
            >
              About
            </Link>
            
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                onClick={toggleMenu} 
                className="text-center w-full hover:text-red-600"
              >
                Dashboard
              </Link>
            )}

            {!isAuthenticated ? (
              <div className="flex flex-col items-center space-y-4">
                <Link 
                  to="/login" 
                  onClick={toggleMenu}
                >
                  <button className="btns rounded-md border-2 h-9 w-24 border-red-700 text-rose-400 font-medium shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:text-white">
                    Login
                  </button>
                </Link>
                <Link 
                  to="/registration" 
                  onClick={toggleMenu}
                >
                  <button className="bg-red-700 h-10 w-28 rounded-md btns p-6 text-white">
                    Register
                  </button>
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="text-center w-full hover:text-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;