import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Pages/AuthContext';
import { API_URL } from '../../constants';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthState } = useAuth(); 
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (token) {
      localStorage.setItem('authToken', token);

      setAuthState({ token });

      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [location, navigate, setAuthState]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default GoogleCallback;
