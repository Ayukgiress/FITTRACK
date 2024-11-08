import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants';

const PasswordReset = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/users/reset-password/${token}`, { password });
      setMessage(response.data.msg);
      navigate('/login'); 
    } catch (error) {
      setMessage(error.response?.data?.msg || 'An error occurred');
    }
  };

  return (
    <div className='h-screen bg-green w-full bg-neutral-900 flex item-center justify-center'>
      <h2>Set New Password</h2>
      <form onSubmit={handleSubmit} className='flex item-center justify-center flex-col gap-4'>
      <div className='flex item-center justify-center flex-col '>
      <label className='text-2xl text-white'>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='h-9 rounded-md outline-none p4 w-96 text-xl text-black' />
        </div>
        <button type="submit" className='bg-red-700 w-96 h-9 rounded-md'>Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordReset;
