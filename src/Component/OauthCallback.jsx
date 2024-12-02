import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OauthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');

    const handleToken = () => {
      if (token) {
        try {
          localStorage.setItem('authToken', token);
          navigate('/dashboard');
        } catch (err) {
          console.error('Failed to store token:', err);
          setError('Failed to store authentication token.');
          navigate('/login?error=auth_failed');
        }
      } else {
        setError('No token received.');
        navigate('/login?error=auth_failed');
      }
      setLoading(false);
    };

    handleToken();
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default OauthCallback;