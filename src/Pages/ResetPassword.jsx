import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/users/reset-password-request`, { email });
      setMessage(response.data.msg);
    } catch (error) {
      setMessage(error.response?.data?.msg || 'An error occurred');
    }
  };

  return (
    <div className='h-screen bg-green w-full bg-neutral-900 flex item-center justify-center'>
      <form onSubmit={handleSubmit} className='flex item-center justify-center flex-col gap-4'>
        <div className='flex item-center justify-center flex-col '>
          <label className='text-2xl text-white'>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
           className='h-9 rounded-md outline-none p4 w-96 text-xl text-black'/>
        </div>
        <button type="submit" className='bg-red-700 w-96 h-9 rounded-md'>Reset password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordResetRequest;
