import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoSettings, IoHome } from 'react-icons/io5';
import { FcStatistics } from 'react-icons/fc';
import Plan from '../Pages/Plan';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Icon (visible on mobile) */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 text-white focus:outline-none md:hidden"
      >
        <FaBars className={`w-8 h-8 ${isOpen ? 'hidden' : 'block'}`} />
      </button>

      {/* Overlay (visible when sidebar is open) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar (main menu) */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-neutral-900 3xl:w-80 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-52 md:relative`}
      >
        {/* Close button for mobile sidebar */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-white focus:outline-none md:hidden z-50"
        >
          <FaTimes className="w-8 h-8" />
        </button>

        {/* Navigation links */}
        <nav className="flex flex-col h-full pt-16 px-4 sidebar 3xl:w-80 gap-8">
          {/* Dashboard link */}
          <Link 
            to="/dashboard" 
            className="flex items-center p-2 rounded-3xl hover:bg-black transition-colors duration-200 w-full group"
          >
            <span className="text-white text-2xl ml-2 group-hover:text-red-700">Dashboard</span>
          </Link>

          {/* Other Links */}
          <div className="space-y-6">
            <Link 
              to="/" 
              className="flex items-center p-2 rounded-3xl hover:bg-black transition-colors duration-200 w-full group"
            >
              <IoHome className="text-white w-8 h-8 group-hover:text-red-700" />
              <span className="text-white ml-2 group-hover:text-red-700">Home</span>
            </Link>

            <Link 
              to="/dashboard/settings" 
              className="flex items-center p-2 rounded-3xl hover:bg-black transition-colors duration-200 w-full group"
            >
              <IoSettings className="text-white w-8 h-8 group-hover:text-red-700" />
              <span className="text-white ml-2 group-hover:text-red-700">Settings</span>
            </Link>

            {/* Plan Link */}
            <Link 
              to="/dashboard/plan" 
              className="flex items-center p-2 rounded-3xl hover:bg-black transition-colors duration-200 w-full group"
            >
              <Plan className="text-white w-8 h-8 group-hover:text-red-700" />
              <span className="text-white ml-2 group-hover:text-red-700">Plan</span>
            </Link>

            {/* Statistics Link */}
            <Link 
              to="/dashboard/statistics" 
              className="flex items-center p-2 rounded-3xl hover:bg-black transition-colors duration-200 w-full group"
            >
              <FcStatistics className="text-white w-8 h-8 group-hover:text-red-700" />
              <span className="text-white ml-2 group-hover:text-red-700">Statistics</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
