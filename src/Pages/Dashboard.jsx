import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Component/Sidebar';
import Profile from '../Component/Profile';
import { useAuth } from './AuthContext';

const Dashboard = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex item-center justify-between h-full bg-black fixed w-full">
      {/* <div className='bg-black border-2 border-red-700 flex item-center justify-center'> */}
        <Sidebar />


      {/* </div> */}


      <main className="flex flex-col w-full p-6">
        <Outlet />
      </main>

      <Profile isAuthenticated={isAuthenticated} />

    </div>
  );
};

export default Dashboard;