import React from 'react';  
import { Link } from 'react-router-dom';  
import { FaHome } from 'react-icons/fa';  
import { IoSettings } from 'react-icons/io5';  
import { FcStatistics } from 'react-icons/fc';  
import workoutIcon from '../../src/assets/images/report (1).png';  

const Sidebar = () => {  
  return (  
    <div className="w-16 h-full bg-dashboard-gradient rounded-3xl flex flex-col items-center justify-between p-4">  
      <div className='flex flex-col items-center justify-center gap-6'>  
        {/* Home Navigation */}  
        {/* <Link to="/" className="transition-colors duration-200 p-2 rounded-full hover:bg-red-600">  
          <FaHome className='text-white w-8 h-8' />  
        </Link>   */}

        {/* Settings Navigation */}  
        <Link to="/dashboard/settings" className="transition-colors duration-200 p-2 rounded-full hover:bg-red-600">  
          <IoSettings className='text-white w-8 h-8' />  
        </Link>  

        {/* Statistics Navigation */}  
        <Link to="/dashboard/statistics" className="transition-colors duration-200 p-2 rounded-full hover:bg-red-600">  
          <FcStatistics className='text-white w-8 h-8' />  
        </Link>  

        {/* Workouts Navigation */}  
        <Link to="/dashboard/workoutstore" className="transition-colors duration-200 p-2 rounded-full hover:bg-red-600">  
          <img src={workoutIcon} alt="Workouts" className='w-10 h-8' />  
        </Link>  
      </div>  

      <div>  
        <Link to='/dashboard/musics' className="text-white hover:underline">  
          Musics  
        </Link>  
      </div>  
    </div>  
  );  
};  

export default Sidebar;