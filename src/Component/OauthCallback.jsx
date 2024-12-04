import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Pages/AuthContext';

const OauthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setRefetchCurrentUser } = useAuth();  // Use context to trigger re-fetch of current user

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');

    console.log('Token from URL:', token);

    if (token) {
      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Trigger refetching current user (so that `currentUser` gets updated)
      setRefetchCurrentUser((prev) => !prev);

      // Redirect to dashboard after storing token
      navigate('/dashboard');
    } else {
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
