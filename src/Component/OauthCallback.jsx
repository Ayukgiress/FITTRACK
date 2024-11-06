import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Pages/AuthContext';

const OauthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setRefetchCurrentUser } = useAuth();
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    const handleCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get('token');

      if (token) {
        try {
          localStorage.setItem('token', token);
          setRefetchCurrentUser(prev => !prev);  
          navigate('/dashboard');
        } catch (error) {
          console.error("Failed to store token:", error);
          setError('An error occurred while processing your login.');
        }
      } else {
        setError('Authentication failed. Please try again.');
      }

      setLoading(false);  
    };

    handleCallback();
  }, [location, navigate, setRefetchCurrentUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-center">
      {error ? (
        <div className="text-red-500">
          <h2 className="text-xl font-bold">Error</h2>
          <p>{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="text-green-500">
          <h2 className="text-xl font-bold">Success!</h2>
          <p>Redirecting to your dashboard...</p>
        </div>
      )}
    </div>
  );
};

export default OauthCallback;
