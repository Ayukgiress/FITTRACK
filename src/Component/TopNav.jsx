import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaBell, FaCog, FaPlus, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../Pages/AuthContext';

const TopNav = ({ onMenuClick }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Dashboard - Left */}
          <span className="text-white font-bold text-xl">Dashboard</span>

          {/* Logo and Brand - Center */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="md:hidden text-white hover:text-blue-400 transition-colors duration-200 mr-4"
            >
              <FaBars className="w-6 h-6" />
            </button>
            <Link to="/dashboard" className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FT</span>
                </div>
                <span className="text-white font-bold text-xl">NoSlack</span>
              </div>
            </Link>
          </div>

          {/* Profile Menu - Right */}
          <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                {currentUser?.profileImage ? (
                  <img
                    src={currentUser.profileImage}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <FaUser className="w-4 h-4 text-white" />
                  </div>
                )}
                <span className="hidden sm:block text-sm font-medium">
                  {currentUser?.username || 'User'}
                </span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      {currentUser?.profileImage ? (
                        <img
                          src={currentUser.profileImage}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <FaUser className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div>
                        <p className="text-white font-medium text-sm">
                          {currentUser?.firstName && currentUser?.lastName
                            ? `${currentUser.firstName} ${currentUser.lastName}`
                            : currentUser?.username || 'User'}
                        </p>
                        <p className="text-gray-400 text-xs">{currentUser?.email}</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/dashboard/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                  >
                    <FaCog className="w-4 h-4 mr-3" />
                    Settings
                  </Link>
                  <Link
                    to="/dashboard/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                  >
                    <FaUserCircle className="w-4 h-4 mr-3" />
                    Profile
                  </Link>
                  <div className="border-t border-gray-700 mt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors duration-200"
                    >
                      <FaUser className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;