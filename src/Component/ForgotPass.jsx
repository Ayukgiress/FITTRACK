import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPass = () => {
  if (!open) return null;

  return (

    <div>
        
        <Link to='/password'>forgot password</Link>

    </div>
  
  
  );
};

export default ForgotPass