import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PasswordReset = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/reset-password/${token}`, { password });
      setMessage(response.data.msg);
      navigate('/login'); 
    } catch (error) {
      setMessage(error.response?.data?.msg || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Set New Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordReset;
