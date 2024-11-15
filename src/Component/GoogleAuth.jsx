import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Pages/AuthContext';
import { API_URL } from '../../constants';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = () => {
    setLoading(true);
    try {
      window.location.href = `${API_URL}/users/auth/google`; 
    } catch (error) {
      console.error("Google login failed:", error);
      setLoading(false);  
      alert('Something went wrong. Please try again.');  
    }
  };
  

  return (
    <div className="flex items-center justify-center flex-col">
      <button
        onClick={handleGoogleLogin}
        className="w-full h-11 3xl:h-24 3xl:text-4xl rounded-md text-white flex items-center justify-center bg-black transition-colors"
        disabled={loading}
      >
        <FcGoogle className={`m-2 h-7 w-10 3xl:h-24 ${loading ? 'animate-spin' : ''}`} />
        {loading ? 'Loading...' : 'Login with Google'}
      </button>
    </div>
  );
};

export default GoogleAuth;
