import React from 'react';  
import { Outlet } from 'react-router-dom';  
import Sidebar from '../Component/Sidebar';  
import Profile from '../Component/Profile';  
import { useAuth } from './AuthContext';   

const Dashboard = () => {  
  const { isAuthenticated } = useAuth();   

  return (  
    <div className="flex item-center justify-between h-full bg-black fixed w-full">  
      <Sidebar />  

      {/* <Profile isAuthenticated={isAuthenticated} />     */}

      
      <main className="flex flex-col w-full p-6">  
        <Outlet />  
      </main>
    </div>  
  );  
};  

export default Dashboard;