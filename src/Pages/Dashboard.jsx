import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from '../Component/TopNav';
import MobileDrawer from '../Component/MobileDrawer';
import Sidebar from '../Component/Sidebar';
import { useAuth } from './AuthContext';

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Load theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);

    // Listen for theme changes from settings
    const handleStorageChange = (e) => {
      if (e.key === 'theme') {
        const newTheme = e.newValue || 'dark';
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom events
    const handleThemeChange = (e) => {
      const newTheme = e.detail.theme;
      setTheme(newTheme);
      applyTheme(newTheme);
    };

    window.addEventListener('themeChange', handleThemeChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  const applyTheme = (selectedTheme) => {
    const root = document.documentElement;
    if (selectedTheme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      // Update body background for light theme
      document.body.style.background = 'linear-gradient(to bottom right, #f3f4f6, #e5e7eb, #ffffff)';
      document.body.style.color = '#1f2937';
    } else if (selectedTheme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.remove('light');
        root.classList.add('dark');
        document.body.style.background = 'linear-gradient(to bottom right, #111827, #1f2937, #374151)';
        document.body.style.color = '#ffffff';
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        document.body.style.background = 'linear-gradient(to bottom right, #f3f4f6, #e5e7eb, #ffffff)';
        document.body.style.color = '#1f2937';
      }
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      // Update body background for dark theme
      document.body.style.background = 'linear-gradient(to bottom right, #111827, #1f2937, #374151)';
      document.body.style.color = '#ffffff';
    }
  };

  const toggleMobileDrawer = () => {
    setIsMobileDrawerOpen(!isMobileDrawerOpen);
  };

  return (
    <div className={`h-screen flex flex-col ${theme === 'light' ? 'bg-gradient-to-br from-gray-100 via-gray-200 to-white' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-black'}`}>
      {/* Mobile Drawer */}
      <MobileDrawer isOpen={isMobileDrawerOpen} onClose={toggleMobileDrawer} />

      {/* Top Navigation */}
      <TopNav onMenuClick={toggleMobileDrawer} />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block fixed left-0 top-16 h-full">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto lg:ml-64">
          <div className="p-4 md:p-6 lg:p-8 h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 FitTrack. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
