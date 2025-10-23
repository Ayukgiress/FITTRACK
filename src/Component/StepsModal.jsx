import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'sonner';
import { FaWalking, FaCalendarAlt, FaCheck } from 'react-icons/fa';
import { useFitness } from '../Pages/PlanContext';
import { useAuth } from '../Pages/AuthContext';

const StepsModal = ({ isOpen, onClose }) => {
  const [date, setDate] = useState('');
  const [steps, setSteps] = useState('');
  const [loading, setLoading] = useState(false);
  const { addDailySteps } = useFitness();
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please log in to add steps");
      return;
    }

    setLoading(true);
    try {
      await addDailySteps({
        userId: currentUser._id,
        date,
        steps: parseInt(steps),
      });
      onClose();
      setDate('');
      setSteps('');
    } catch (error) {
      // Error handled in context
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-4">
            <FaWalking className="text-white text-2xl" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Track Your Steps
          </h2>
          <p className="text-gray-300 text-lg">
            Log your daily step count
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Input Section */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="text-green-400 mr-3 text-xl" />
              <label htmlFor="date" className="text-lg font-semibold text-white">
                Select Date
              </label>
            </div>

            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-gray-900/80 border-2 border-gray-600 rounded-xl p-4 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
              required
            />
          </div>

          {/* Steps Input Section */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <FaWalking className="text-blue-400 mr-3 text-xl" />
              <label htmlFor="steps" className="text-lg font-semibold text-white">
                Step Count
              </label>
            </div>

            <input
              type="number"
              id="steps"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="w-full bg-gray-900/80 border-2 border-gray-600 rounded-xl p-4 text-white text-center text-2xl font-mono focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              required
              min="0"
              placeholder="0"
            />

            <p className="text-sm text-gray-400 mt-3 text-center">
              Enter the number of steps you've taken
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !date || !steps}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Adding...
                </>
              ) : (
                <>
                  <FaCheck className="text-sm" />
                  Add Steps
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Keep up the great work! Every step counts.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default StepsModal;
