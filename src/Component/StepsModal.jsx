import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'sonner';
import { useFitness } from '../Pages/PlanContext';
import { useAuth } from '../Pages/AuthContext';

const StepsModal = ({ isOpen, onClose }) => {
  const [date, setDate] = useState('');
  const [steps, setSteps] = useState('');
  const { addDailySteps } = useFitness();
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please log in to add steps");
      return;
    }
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
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          padding: '40px',
        },
      }}
    >
      <form onSubmit={handleSubmit} className='form'>
        <h2 className="text-2xl font-bold mb-4">Add Daily Steps</h2>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-white">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded p-3 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="steps" className="block text-sm font-medium text-white">
            Steps
          </label>
          <input
            type="number"
            id="steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full border rounded p-3 text-black"
            required
            min="0"
          />
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="text-red-500 font-semibold">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-black border-2 border-red-700 text-white font-semibold rounded py-2 px-4"
          >
            Add Steps
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default StepsModal;
