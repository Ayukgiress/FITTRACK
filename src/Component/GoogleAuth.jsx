// GoogleAuth.jsx
import React, { useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Pages/AuthContext';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();

  const handleLogin = () => {
    window.open('http://localhost:5000/users/auth/google', '_self');
  };

  useEffect(() => {
    if (!loading && currentUser) {
      navigate('/dashboard'); 
    }
  }, [loading, currentUser, navigate]);

  return (
    <div className='flex item-center justify-center'>
      <button onClick={handleLogin} className='w-full h-11 rounded-md text-white flex item-center justify-center bg-black'>
        <FcGoogle className='m-2 h-7 w-10' />
      </button>
    </div>
  );
};

export default GoogleAuth;



