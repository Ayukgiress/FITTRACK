import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Component/Sidebar';
import { useAuth } from './AuthContext';
import Profile from '../Component/Profile';
const Dashboard = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black w-full">
      <div className="flex-none w-full md:w-auto m-0 p-0">
        <Sidebar />
      </div>

      <main className="flex-grow w-full overflow-y-auto min-h-0 m-0 p-0">
        <Outlet />
      </main>
      {isAuthenticated && (
        <div className="hidden md:block md:w-1/4">
          <Profile isAuthenticated={isAuthenticated} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;