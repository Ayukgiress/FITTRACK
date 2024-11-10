import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants';

const PasswordReset = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state to show when the request is in progress
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts
    setMessage(''); // Clear any previous messages

    try {
      const response = await axios.post(`${API_URL}/users/reset-password/${token}`, { password });
      
      // On successful password reset
      setMessage(response.data.msg || 'Password reset successful!');
      navigate('/login'); // Redirect user to the login page after successful reset
    } catch (error) {
      // Handle error response
      const errorMessage = error.response?.data?.msg || 'An error occurred. Please try again.';
      setMessage(errorMessage);
    } finally {
      setLoading(false); // Reset loading state once the request is complete
    }
  };

  return (
    <div className="h-screen bg-green w-full bg-neutral-900 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl text-white mb-6">Set New Password</h2>
        
        <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col gap-6">
          <div className="flex items-center justify-center flex-col">
            <label className="text-2xl text-white">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-9 rounded-md outline-none p-4 w-96 text-xl text-black"
            />
          </div>

          <button 
            type="submit" 
            className="bg-red-700 w-96 h-9 rounded-md"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        {/* Display success or error message */}
        {message && <p className="mt-4 text-white">{message}</p>}
      </div>
    </div>
  );
};

export default PasswordReset;
