import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPass = () => {
  if (!open) return null;

  return (

    <div className='item-end justify-end text-white text-xl'>
        
        <Link to='/password'>forgot password</Link>

    </div>
  
  
  );
};

export default ForgotPass