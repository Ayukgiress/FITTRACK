import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Pages/AuthContext';

const OauthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setRefetchCurrentUser } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get('token');

      if (token) {
        // Store the token in localStorage
        localStorage.setItem('token', token);
        
        // Optionally trigger a refresh of user data
        setRefetchCurrentUser(prev => !prev);
        
        // Navigate to the dashboard or home page
        navigate('/dashboard');
      } else {
        navigate('/login?error=auth_failed');
      }
    };

    handleCallback();
  }, [location, navigate, setRefetchCurrentUser]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default OauthCallback;
