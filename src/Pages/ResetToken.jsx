import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants';
import { toast } from 'sonner';

const PasswordReset = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');

  const validatePassword = (password) => {
    return password.length >= 6; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/users/reset-password/${token}`, { password: newPassword });

      toast.success('Password reset successful! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);  
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="h-screen bg-green w-full bg-neutral-900 flex items-center justify-center">
      <h2 className="text-white text-3xl">Set New Password</h2>
      <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col gap-4">
        <div className="flex items-center justify-center flex-col">
          <label className="text-2xl text-white">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="h-9 rounded-md outline-none p-4 w-96 text-xl text-black"
          />
        </div>
        <button type="submit" className="bg-red-700 w-96 h-9 rounded-md">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
