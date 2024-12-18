import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'sonner';
import { TiPlus } from "react-icons/ti";
import { useAuth } from "./AuthContext";
import { useFitness } from "./PlanContext";

const Plan = () => {
  const { currentUser } = useAuth();
  const { addDailySteps, addWeeklyDistance } = useFitness();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [goalType, setGoalType] = useState("dailySteps");
  const [date, setDate] = useState(new Date());
  const [steps, setSteps] = useState('');
  const [distance, setDistance] = useState('');

  useEffect(() => {
    console.log('Fitness Methods:', {
      addDailySteps: typeof addDailySteps,
      addWeeklyDistance: typeof addWeeklyDistance
    });
  }, [addDailySteps, addWeeklyDistance]);

  const handleModalOpen = () => {
    console.log('Modal opened');
    setModalIsOpen(true);
    setGoalType("dailySteps");
    setDate(new Date());
    setSteps('');
    setDistance('');
  };

  const handleModalClose = () => {
    console.log('Modal closed');
    setModalIsOpen(false);
  };

  const handleGoalSubmit = async (e) => {
    e.preventDefault();

    console.group('Goal Submission Debug');
    console.log('Submission Initiated', {
      goalType,
      steps,
      date: date.toISOString(),
      userId: currentUser?._id
    });

    try {
      if (!currentUser || !currentUser._id) {
        console.error('No authenticated user');
        toast.error('Please log in');
        console.groupEnd();
        return;
      }

      const parsedSteps = parseInt(steps);
      if (isNaN(parsedSteps)) {
        console.error('Invalid steps input');
        toast.error('Please enter a valid number of steps');
        console.groupEnd();
        return;
      }

      // Prepare date
      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);

      // Log submission details
      console.log('Submission Details', {
        userId: currentUser._id,
        steps: parsedSteps,
        formattedDate: selectedDate.toISOString().split('T')[0]
      });

      // Attempt to add daily steps
      const result = await addDailySteps({
        userId: currentUser._id,
        steps: parsedSteps,
        date: selectedDate.toISOString().split('T')[0]
      });

      console.log('Submission Result:', result);
      handleModalClose();
    } catch (error) {
      console.error('Submission Error:', error);
      toast.error(error.message || 'Failed to submit goal');
    } finally {
      console.groupEnd();
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <button
        onClick={handleModalOpen}
        className="text-white font-semibold flex items-center justify-start gap-4 hover:text-red-700 transition-colors"
      >
        <TiPlus className="h-8 w-8" />
        <h3 className="text-xl">Goal</h3>
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            backgroundColor: "black",
            color: "white",
            padding: "20px",
            borderRadius: "12px",
            width: "80vw",
            maxWidth: "600px",
            height: "40vh",
            margin: "auto",
            top: "50%",
            left: "40%",
            transform: "translate(-50%, -50%)",
            overflow: "auto",
          },
        }}
      >
        <form onSubmit={handleGoalSubmit} className="flex flex-col items-center gap-6">
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium mb-2">Goal Type</label>
            <select
              value={goalType}
              onChange={(e) => setGoalType(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none"
            >
              <option value="dailySteps">Daily Step Count</option>
              <option value="weeklyDistance">Weekly Running Distance</option>
            </select>
          </div>

          {goalType === "dailySteps" && (
            <>
              <div className="flex flex-col w-full">
                <label
                  htmlFor="steps"
                  className="text-sm font-medium mb-2"
                >
                  Daily Step Goal
                </label>
                <input
                  id="steps"
                  type="number"
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  placeholder="Enter steps"
                  className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none"
                  required
                />
              </div>
            </>
          )}

          <div className="flex flex-col w-full">
            <label
              htmlFor="date"
              className="text-sm font-medium mb-2"
            >
              Date
            </label>
            <DatePicker
              id="date"
              selected={date}
              onChange={(newDate) => setDate(newDate)}
              dateFormat="yyyy-MM-dd"
              className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-between w-full mt-6 gap-6">
            <button
              type="submit"
              className="w-full py-3 bg-red-700 text-white font-semibold rounded-md hover:bg-red-600 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleModalClose}
              className="w-full py-3 text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Plan;