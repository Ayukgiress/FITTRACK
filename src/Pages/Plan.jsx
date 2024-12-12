import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';  // Import React Datepicker
import "react-datepicker/dist/react-datepicker.css";  // Import the datepicker styles
import { toast } from 'sonner';
import { TiPlus } from "react-icons/ti";
import { useAuth } from "./AuthContext";
import { useFitness } from "./PlanContext";

const Plan = () => {
  const { currentUser } = useAuth();
  const { addDailySteps, addWeeklyDistance } = useFitness()
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [goalType, setGoalType] = useState("dailySteps");
  const [date, setDate] = useState(new Date());

  const handleModalOpen = () => {
    setModalIsOpen(true);
    setGoalType("dailySteps");
    setDate(new Date());
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleGoalSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior

    const steps = goalType === "dailySteps" ? parseInt(e.target.steps.value) : null;
    const distance = goalType === "weeklyDistance" ? parseFloat(e.target.distance.value) : null;
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);  // Reset the time to midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const userId = currentUser ? currentUser._id : null;

    try {
      if (goalType === "dailySteps" && !isNaN(steps) && date) {
        if (selectedDate > today) {
          toast.error("You cannot set steps for a future date.");
          return;
        }

        // Add the daily steps goal
        await addDailySteps({
          userId,
          steps,
          date: selectedDate.toISOString().split('T')[0], // Format to ISO string
        });
      } else if (goalType === "weeklyDistance" && !isNaN(distance)) {
        // Add the weekly distance goal
        await addWeeklyDistance({
          userId,
          weekNumber: Math.ceil((new Date().getDate() + 1) / 7), // Calculate week number
          distance,
        });
      }

      // Close the modal after submission
      handleModalClose();
      toast.success(`${goalType === "dailySteps" ? "Steps" : "Distance"} goal added successfully!`);
    } catch (error) {
      // Handle errors by showing a toast
      toast.error(error.response?.data?.message || "Failed to add goal");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <button
        onClick={handleModalOpen}
        className="text-white font-semibold flex items-center justify-start gap-4 hover:text-red-700 transition-colors"
      >
        <TiPlus className="h-8 w-8" />
        <h3 className="text-xl"> Goal</h3>
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
            backgroundColor: "#1a1a1a",
            color: "white",
            padding: "20px",
            borderRadius: "12px",
            width: "80vw",
            maxWidth: "600px",
            height: "auto",
            margin: "auto",
            top: "50%",
            left: "50%",
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
                <label htmlFor="steps" className="text-sm font-medium mb-2">Daily Step Goal</label>
                <input
                  type="number"
                  name="steps"
                  placeholder="Enter steps"
                  className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="date" className="text-sm font-medium mb-2">Date</label>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none"
                  required
                />
              </div>
            </>
          )}

          {goalType === "weeklyDistance" && (
            <div className="flex flex-col w-full">
              <label htmlFor="distance" className="text-sm font-medium mb-2">Weekly Running Distance Goal (km)</label>
              <input
                type="number"
                name="distance"
                placeholder="Enter distance"
                step="0.1"
                className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none"
                required
              />
            </div>
          )}

          <div className="flex justify-between w-full mt-6">
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
