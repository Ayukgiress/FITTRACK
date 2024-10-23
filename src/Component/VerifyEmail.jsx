import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { API_URL } from "../../constants";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/verify-email/${token}`); // Corrected the URL
        if (response.ok) {
          toast.success("Email verified successfully! You can now log in.");
          navigate("/login"); 
        } else {
          toast.error("Verification failed. Please try again.");
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        toast.error("An error occurred during email verification.");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-xl">Verifying your email...</h2>
    </div>
  );
};

export default VerifyEmail;
