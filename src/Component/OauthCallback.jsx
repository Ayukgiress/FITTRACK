import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Pages/AuthContext';
import { toast } from 'sonner';

const OauthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setRefetchCurrentUser } = useAuth();  

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem("token", token); 

      setRefetchCurrentUser((prev) => !prev);

      toast.success('Login successful');

      navigate('/dashboard');
    } else {
      toast.error('Authentication failed');
      
      navigate('/login?error=auth_failed');
    }
  }, [location, navigate, setRefetchCurrentUser]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default OauthCallback;