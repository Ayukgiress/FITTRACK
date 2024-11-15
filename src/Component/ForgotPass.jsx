import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPass = () => {
  if (!open) return null;

  return (

    <div className='item-end justify-end text-red-700 font-bold 3xl:text-4xl'>
        
        <Link to='/password'>Forgot Password</Link>

    </div>
  
  
  );
};

export default ForgotPass