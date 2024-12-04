import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Pages/AuthContext';  // Adjust import path as needed

const OauthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentUser, setRefetchCurrentUser } = useAuth();

  useEffect(() => {
    console.log('OAuth Callback - Full Location Search:', location.search);
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');

    console.log('OAuth Callback - Token from URL:', token);

    if (token) {
      console.log('OAuth Callback - Token found, storing and validating');
      
      // Store token
      localStorage.setItem('token', token);
      
      // Trigger user refetch
      setRefetchCurrentUser(prev => !prev);

      // Navigate to dashboard
      navigate('/dashboard');
    } else {
      console.error('OAuth Callback - No token received');
      navigate('/login?error=auth_failed');
    }
  }, [location, navigate, setRefetchCurrentUser]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default OauthCallback;