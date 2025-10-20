import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Pages/AuthContext';
import { API_URL } from '../../constants';
import WeightModal from './WeightModal';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showWeightModal, setShowWeightModal] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = () => {
    setShowWeightModal(true);
  };

  const handleWeightSubmit = (weight) => {
    localStorage.setItem('googleSignupWeight', weight);
    setShowWeightModal(false);
    setLoading(true);
    try {
      window.location.href = `${API_URL}/users/auth/google`; 
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <button
        onClick={handleGoogleLogin}
        className="w-full h-11 rounded-md text-white flex items-center justify-center bg-black transition-colors"
        disabled={loading}
      >
        <FcGoogle className={`m-2 h-7 w-10 ${loading ? 'animate-spin' : ''}`} />
        {loading ? 'Loading...' : 'Login with Google'}
      </button>
      <WeightModal
        isOpen={showWeightModal}
        onClose={() => setShowWeightModal(false)}
        onSubmit={handleWeightSubmit}
      />
    </div>
  );
};

export default GoogleAuth;
