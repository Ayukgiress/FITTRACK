import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OauthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('Location search:', location.search);
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const error = urlParams.get('error');

    console.log('Token:', token);
    console.log('Error:', error);

    if (token) {
      const decodedToken = decodeURIComponent(token);
      localStorage.setItem('authToken', decodedToken);
      navigate('/dashboard');
    } else {
      navigate('/login?error=auth_failed');
    }
  }, [location, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default OauthCallback;
