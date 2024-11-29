import React from 'react';

const VerifyEmails = () => {
  return (
    <div className="bg-neutral-900 h-screen flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold">
        Email Verification Link Sent Successfully
      </h1>
      <h2 className="text-center text-sm sm:text-base md:text-lg mt-4">
        Please check your inbox and click the link to verify your email. It expires in an hour.
      </h2>
    </div>
  );
};

export default VerifyEmails;
