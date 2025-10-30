import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'sonner';
import { FaWeight, FaDumbbell, FaCheck } from 'react-icons/fa';
import { useAuth } from '../Pages/AuthContext';
import { API_URL } from '../../constants';

const WeightModal = ({ isOpen, onClose, onSubmit, setRefetchCurrentUser }) => {
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!weight || weight < 30 || weight > 300) {
      toast.error("Please enter a valid weight between 30 and 300 kg");
      return;
    }

    const parsedWeight = parseFloat(weight);
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.setItem("pendingWeight", weight.toString());
      onClose();
      toast.success("Weight saved locally. Please complete Google sign-in to finish registration.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/update-weight`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ weight: parsedWeight }),
      });

      if (!response.ok) {
        throw new Error("Failed to update weight");
      }

      toast.success("Weight updated successfully!");
      setRefetchCurrentUser(prev => !prev);
      setWeight("");
      localStorage.removeItem("pendingWeight");

      if (onSubmit) {
        onSubmit();
      }

      onClose();
    } catch (error) {
      console.error("Error updating weight:", error);
      toast.error("Failed to update weight. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 1)',
          backdropFilter: 'blur(16px)',
          zIndex: 9999,
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: '420px',
          maxWidth: '90vw',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          padding: '0',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <FaWeight className="text-white text-2xl" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Welcome to Noslack!
          </h2>
          <p className="text-gray-300 text-lg">
            Let's get your profile set up
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Weight Input Section */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <FaDumbbell className="text-blue-400 mr-3 text-xl" />
              <label htmlFor="weight" className="text-lg font-semibold text-white">
                Your Current Weight
              </label>
            </div>

            <div className="relative">
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-gray-900/80 border-2 border-gray-600 rounded-xl p-4 text-white text-center text-2xl font-mono focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                required
                min="30"
                max="300"
                step="0.1"
                placeholder="70.5"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                kg
              </span>
            </div>

            <p className="text-sm text-gray-400 mt-3 text-center">
              Enter your weight in kilograms (30-300 kg)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Skip for Now
            </button>
            <button
              type="submit"
              disabled={loading || !weight}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FaCheck className="text-sm" />
                  Continue
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            You can update your weight anytime in Settings
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default WeightModal;
