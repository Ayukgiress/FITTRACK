import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'sonner';
import { useAuth } from '../Pages/AuthContext';
import { API_URL } from '../../constants';

const WeightModal = ({ isOpen, onClose, onSubmit }) => {
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const { setRefetchCurrentUser } = useAuth();

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
        <h2 className="text-2xl font-bold mb-4">Enter Your Weight</h2>
        <p className="mb-4 text-gray-300">Please provide your current weight to complete your profile.</p>
        <div className="mb-4">
          <label htmlFor="weight" className="block text-sm font-medium text-white">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border rounded p-3 text-black"
            required
            min="30"
            max="300"
            step="0.1"
            placeholder="e.g., 70.5"
          />
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="text-red-500 font-semibold">
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-black border-2 border-red-700 text-white font-semibold rounded py-2 px-4 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Weight'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default WeightModal;
