import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { useFitness } from "./PlanContext";
import { TiPlus } from "react-icons/ti";
import { useAuth } from "./AuthContext";

const Plan = () => {
  const { currentUser } = useAuth();
  const { addDailySteps, addWeeklyDistance } = useFitness();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [goalType, setGoalType] = useState("dailySteps");
  const [date, setDate] = useState("");

  const handleModalOpen = () => {
    setModalIsOpen(true);
    setGoalType("dailySteps");
    setDate("");
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

    const userId = currentUser._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      if (goalType === "dailySteps" && !isNaN(steps)) {
        const selectedDate = date ? new Date(date) : today;
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
          toast.error("You cannot set steps for a future date.");
          return;
        }

        // Ensure date is in ISO format
        const isoDate = selectedDate.toISOString();

        await addDailySteps({
          userId,
          steps,
          date: isoDate
        });
      } else if (goalType === "weeklyDistance" && !isNaN(distance)) {
        const currentDate = new Date();
        const currentWeekNumber = Math.ceil((currentDate.getDate() + 1) / 7);

        await addWeeklyDistance({
          userId,
          weekNumber: currentWeekNumber,
          distance,
          date: currentDate.toISOString() // Add date to match backend expectation
        });
      } else {
        toast.error("Invalid input. Please check your values.");
        return;
      }

      handleModalClose();
      toast.success(`${goalType === 'dailySteps' ? 'Steps' : 'Distance'} goal added successfully!`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add goal");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleModalOpen}
        className="text-white font-semibold  flex item-center justify-center gap-8 hover:text-red-700"
      >
        <TiPlus className="h-7" />
        <h3>Goal</h3>
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
            borderRadius: "10px",
            width: "80vw",
            maxWidth: "500px",
            height: "60vh",
            margin: "auto",
            top: "50%",
            left: "25%",
            transform: "translate(-50%, -50%)",
            overflow: "hidden",
          },
        }}
      >
        <form onSubmit={handleGoalSubmit} className="flex item-center justify-center flex-col forms gap-4">
          <div className="mb-4 flex-col item-center justify-center">
            <label className="block text-sm font-medium">Goal Type</label>
            <select
              value={goalType}
              onChange={(e) => setGoalType(e.target.value)}
              className="w-full border rounded p-2 bg-gray-800 flex-col text-white"
            >
              <option value="dailySteps">Daily Step Count</option>
              <option value="weeklyDistance">Weekly Running Distance</option>
            </select>
          </div>

          {goalType === "dailySteps" && (
            <>
              <div className="mb-4 flex-col item-center justufy-center">
                <label htmlFor="steps" className="block text-sm font-medium">
                  Daily Step Goal
                </label>
                <input
                  type="number"
                  name="steps"
                  placeholder="Enter steps"
                  className="w-full border rounded p-2 bg-gray-800 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border rounded p-2 bg-gray-800 text-white"
                  required
                />
              </div>
            </>
          )}

          {goalType === "weeklyDistance" && (
            <div className="mb-4">
              <label htmlFor="distance" className="block text-sm font-medium">
                Weekly Running Distance Goal (km)
              </label>
              <input
                type="number"
                name="distance"
                placeholder="Enter distance"
                className="w-full border rounded p-2 bg-gray-800 text-white"
                required
              />
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="bg-black border-2 border-red-700 text-white font-semibold rounded py-2 px-4 hover:bg-red-600"
            >
              Submit
            </button>
            <button onClick={handleModalClose} className="mt-4 text-red-500">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Plan;
