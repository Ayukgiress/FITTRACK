import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Component/Sidebar';
import { useAuth } from './AuthContext';
import Profile from '../Component/Profile';

const Dashboard = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black w-full">
      {/* Sidebar */}
      <div className="flex-none w-full md:w-auto">
        <Sidebar />
      </div>

      {/* Main Content Area - Centered and Full Width */}
      <main className="flex-grow w-full overflow-y-auto min-h-0 flex flex-col items-center">
        {/* Mobile Profile */}
        {isAuthenticated && (
          <div className="md:hidden w-full p-4">
            <Profile isAuthenticated={isAuthenticated} />
          </div>
        )}

        {/* Main Content Wrapper */}
        <div className="w-full  flex flex-col md:flex-row">
          {/* Centered Content Area */}
          <div className="w-full">
            <Outlet />
          </div>

          {/* Desktop Profile */}
          {isAuthenticated && (
            <div className="hidden lg:block md:w-1/4 pl-4">
              <Profile isAuthenticated={isAuthenticated} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;