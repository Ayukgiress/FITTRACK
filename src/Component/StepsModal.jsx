import React, { useState } from 'react';
import { toast } from 'sonner';
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-bold">Track Your Steps</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Step Count
            </label>
            <input
              type="number"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0"
              placeholder="0"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading || !date || !steps}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              {loading ? 'Adding...' : 'Add Steps'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepsModal;
