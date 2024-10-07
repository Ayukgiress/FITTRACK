import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Component/Sidebar';
import Profile from '../Component/Profile';
import { useAuth } from './AuthContext'; 
// import Goals from './Plan';
const Dashboard = () => {
  const { isAuthenticated } = useAuth(); 

  return (
    <div className="w-full h-screen flex justify-between items-center fixed bg-black">  
      <Sidebar/>

      <main className="w-full max-w-4xl mx-auto p-4">
        <Outlet /> 
      </main>

      <div className="w-60 flex items-center justify-between flex-col text-white h-full bg-neutral-700 ">
        <Profile isAuthenticated={isAuthenticated} />    
        <div className='flex items-start justify-start  flex-col'>
        {/* <Goals />  */}
         <h2>Micronutrient calculator</h2>

          </div>  

          <div>
            logout
            ecnejcjnc
            d3kjndkj3rnd
            xj3een
            </div>  
      </div>  
    </div>  
  );
};

export default Dashboard;
