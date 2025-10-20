import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'sonner';
import { useFitness } from '../Pages/PlanContext';
import { useAuth } from '../Pages/AuthContext';

const RunModal = ({ isOpen, onClose }) => {
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const { addWeeklyDistance } = useFitness();
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please log in to track run");
      return;
    }
    try {
      await addWeeklyDistance({
        userId: currentUser._id,
        date,
        distance: parseFloat(distance),
      });
      onClose();
      setDate('');
      setDistance('');
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
        <h2 className="text-2xl font-bold mb-4">Track Run</h2>
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
          <label htmlFor="distance" className="block text-sm font-medium text-white">
            Distance (km)
          </label>
          <input
            type="number"
            id="distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full border rounded p-3 text-black"
            required
            min="0"
            step="0.1"
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
            Track Run
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RunModal;
