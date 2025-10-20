import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTimes, FaHome, FaChartBar, FaCog, FaTrophy, FaChartLine, FaPlus } from 'react-icons/fa';

const MobileDrawer = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { to: '/', icon: FaHome, label: 'Home' },
    { to: '/dashboard', icon: FaChartBar, label: 'Dashboard' },
    { to: '/dashboard/workoutstore', icon: FaTrophy, label: 'Goals' },
    { to: '/dashboard/statistics', icon: FaChartLine, label: 'Statistics' },
    { to: '/dashboard/settings', icon: FaCog, label: 'Settings' },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FT</span>
            </div>
            <span className="text-white font-bold text-lg">FitTrack</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.to)
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Quick Action */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => {
              onClose();
              window.location.href = '/dashboard';
            }}
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
          >
            <FaPlus className="w-5 h-5 mr-2" />
            Log New Workout
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Stay fit, stay healthy! 💪</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
