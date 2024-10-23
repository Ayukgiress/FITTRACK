import React, { useState } from 'react';  
import { Link } from 'react-router-dom';  
import { FaBars, FaTimes } from 'react-icons/fa';  
import { IoSettings } from 'react-icons/io5';  
import { FcStatistics } from 'react-icons/fc';   
import { IoHome } from "react-icons/io5";  
import workoutIcon from '../../src/assets/images/report (1).png'; 
import  Plan from '../Pages/Plan.jsx'

const Sidebar = () => {  
  const [isOpen, setIsOpen] = useState(false);  

  const toggleSidebar = () => {  
    setIsOpen(!isOpen);  
  };  

  return (  
    <div className="relative h-lvh">  
      {/* Hamburger Menu Button */}  
      {!isOpen && (  
        <button   
          onClick={toggleSidebar}   
          className="mb-4 text-white focus:outline-none"  
        >  
          <FaBars className="w-8 h-8" />  
        </button>  
      )}  

      {/* Sidebar Links */}  
      {isOpen && (  
        <div className="fixed left-0 w-64 h-full bg-neutral-900 p-4 transition-transform transform duration-300 ease-in-out">  
          {/* Close Button */}  
          <button   
            onClick={toggleSidebar}   
            className="mb-4 text-white focus:outline-none"  
          >  
            <FaTimes className="w-8 h-8" />  
          </button>  

          <div className="flex flex-col items-start justify-start gap-6">  

          <Link to="/Activity" className="flex items-center transition-colors duration-200 p-2 rounded-3xl hover:bg-black w-52">  
              <span className="text-white text-2xl ml-2">Dashbaord</span>  
            </Link> 

            {/* Home Navigation */}  
            <Link to="/" className="flex items-center transition-colors duration-200 p-2 rounded-3xl hover:bg-black hover:text-red-700 w-52">  
              <IoHome className='text-white w-8 h-8' />  
              <span className="text-white ml-2">Home</span>  
            </Link>   

            {/* Settings Navigation */}  
            <Link to="/dashboard/settings" className="flex items-center transition-colors duration-200 p-2 rounded-3xl hover:bg-black w-52">  
              <IoSettings className='text-white w-8 h-8' />  
              <span className="text-white ml-2">Settings</span>  
            </Link>  

            {/* Statistics Navigation */}  
            <Link to="/dashboard/statistics" className="flex items-center transition-colors duration-200 p-2 rounded-3xl hover:bg-black w-52">  
              <FcStatistics className='text-white w-8 h-8' />  
              <span className="text-white ml-2">Statistics</span>  
            </Link>  

            <Plan/>

            {/* Workouts Navigation */}  
            <Link to="/dashboard/workoutstore" className="flex items-center transition-colors duration-200 p-2 rounded-3xl hover:bg-black w-52">  
              <img src={workoutIcon} alt="Workouts" className='w-10 h-8' />  
              <span className="text-white ml-2">Goals</span>  
            </Link>  
          </div>  

          {/* <div className="mt-4">  
            <Link to='/dashboard/musics' className="flex items-center text-white hover:underline">  
              <span>Musics</span>  
            </Link>  
          </div>   */}
        </div>  
      )}  
    </div>  
  );  
};  

export default Sidebar;