import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Component/Sidebar';
import { useAuth } from './AuthContext';
import Profile from '../Component/Profile';

const Dashboard = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black w-full">
      <div className="flex-none w-full md:w-auto">
        <Sidebar />
      </div>

      <main className="flex-grow w-full overflow-y-auto min-h-0 flex flex-col items-center">
        {isAuthenticated && (
          <div className="md:hidden w-full p-4">
            <Profile isAuthenticated={isAuthenticated} />
          </div>
        )}

        <div className="w-full  flex flex-col md:flex-row">
          <div className="w-full">
            <Outlet />
          </div>

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