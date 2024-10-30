import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Component/Sidebar';
import Profile from '../Component/Profile';
import { useAuth } from './AuthContext';

const Dashboard = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black w-full">
      {/* Sidebar - full width on mobile, normal on desktop */}
      <div className="w-full md:w-auto">
        <Sidebar />
      </div>

      {/* Main content area - scrollable */}
      <main className="flex-1 w-full overflow-y-auto min-h-0 p-4 md:p-6">
        <Outlet />
      </main>

      {/* Profile section - hidden on mobile, visible on desktop */}
      <div className="hidden md:block md:w-auto">
        <Profile isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
};

export default Dashboard;