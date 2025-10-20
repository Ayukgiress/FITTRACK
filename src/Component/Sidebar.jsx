import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChartBar, FaCog, FaTrophy, FaChartLine, FaHistory } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { to: '/', icon: FaHome, label: 'Home', color: 'blue' },
    { to: '/dashboard', icon: FaChartBar, label: 'Dashboard', color: 'blue' },
    { to: '/dashboard/workoutstore', icon: FaTrophy, label: 'Goals', color: 'red' },
    { to: '/dashboard/statistics', icon: FaChartLine, label: 'Statistics', color: 'purple' },
    { to: '/dashboard/history', icon: FaHistory, label: 'History', color: 'orange' },
    { to: '/dashboard/settings', icon: FaCog, label: 'Settings', color: 'green' },
  ];

  return (
    <aside className="w-64 bg-gray-900 shadow-xl border-r border-gray-700 min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">FT</span>
          </div>
          <span className="text-white font-bold text-xl">FitTrack</span>
        </div>
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
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive(item.to)
                    ? `bg-${item.color}-600 text-white shadow-lg`
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white hover:shadow-md'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 group-hover:text-${item.color}-400`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}

        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 mt-auto">
        <div className="text-center">
          <p className="text-gray-400 text-sm">Stay fit, stay healthy! 💪</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
