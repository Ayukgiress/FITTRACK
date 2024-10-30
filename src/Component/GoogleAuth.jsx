import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Pages/AuthContext';

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
    window.open('http://localhost:5000/users/auth/google', '_self');
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <button
        onClick={handleGoogleLogin}
        className="w-full h-11 rounded-md text-white flex items-center justify-center bg-black transition-colors"
        disabled={loading} // Disable the button while loading
      >
        <FcGoogle className={`m-2 h-7 w-10 ${loading ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
};

export default GoogleAuth;
