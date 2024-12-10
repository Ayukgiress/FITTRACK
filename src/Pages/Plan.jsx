import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from 'sonner';
import { TiPlus } from "react-icons/ti";
import { useAuth } from "./AuthContext";
import { useFitness } from "./PlanContext";

const Plan = () => {
  const { currentUser } = useAuth();
  const { 
    addDailySteps, 
    addWeeklyDistance, 
    dailyStepCount, 
    weeklyRunningDistance 
  } = useFitness();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [goalType, setGoalType] = useState("dailySteps");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const handleModalOpen = () => {
    setModalIsOpen(true);
    setGoalType("dailySteps");
    const today = new Date();
    setDate(today.toISOString().split('T')[0]);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please log in to set goals");
      return;
    }

    const steps = goalType === "dailySteps" ? parseInt(e.target.steps.value) : null;
    const distance = goalType === "weeklyDistance" ? parseFloat(e.target.distance.value) : null;

    if (goalType === "dailySteps" && (!steps || isNaN(steps) || steps <= 0)) {
      toast.error("Please enter a valid number of steps");
      return;
    }

    if (goalType === "weeklyDistance" && (!distance || isNaN(distance) || distance <= 0)) {
      toast.error("Please enter a valid running distance");
      return;
    }

    const userId = currentUser._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      if (goalType === "dailySteps" && steps) {
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
          toast.error("You cannot set steps for a future date.");
          return;
        }

        const existingStepsEntry = dailyStepCount.find(
          entry => new Date(entry.date).toDateString() === selectedDate.toDateString()
        );

        if (existingStepsEntry) {
          toast.error("Steps already logged for this date");
          return;
        }

        const isoDate = selectedDate.toISOString();

        await addDailySteps({
          userId,
          steps,
          date: isoDate
        });

      } else if (goalType === "weeklyDistance" && distance) {
        const currentDate = new Date();
        const currentWeekNumber = Math.ceil((currentDate.getDate() + 6) / 7);

        const existingDistanceEntry = weeklyRunningDistance.find(
          entry => {
            const entryDate = new Date(entry.date);
            const entryWeekNumber = Math.ceil((entryDate.getDate() + 6) / 7);
            return entryWeekNumber === currentWeekNumber;
          }
        );

        if (existingDistanceEntry) {
          toast.error("Running distance already logged for this week");
          return;
        }

        await addWeeklyDistance({
          userId,
          weekNumber: currentWeekNumber,
          distance,
          date: currentDate.toISOString()
        });

      } else {
        toast.error("Invalid input. Please check your values.");
        return;
      }

      handleModalClose();
      toast.success(`${goalType === 'dailySteps' ? 'Steps' : 'Distance'} goal added successfully!`);

    } catch (error) {
      console.error("Goal submission error:", error);
      toast.error(error.response?.data?.message || "Failed to add goal");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <button
        onClick={handleModalOpen}
        className="text-white font-semibold flex items-center justify-center gap-4 hover:text-red-700 transition-colors"
      >
        <TiPlus className="h-8 w-8" />
        <h3 className="text-xl">Set a Goal</h3>
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
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none"
                  max={new Date().toISOString().split('T')[0]} // Prevent future dates
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
