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
    const steps = goalType === "dailySteps" ? parseInt(e.target.steps.value) : null;
    const distance = goalType === "weeklyDistance" ? parseInt(e.target.distance.value) : null;

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const userId = currentUser ? currentUser._id : null;

    try {
      if (goalType === "dailySteps" && !isNaN(steps) && date) {
        if (selectedDate > today) {
          alert("You cannot set steps for a future date.");
          return;
        }
        await addDailySteps({ userId, steps, date: selectedDate.toISOString() }); // Ensure date is in ISO format
      } else if (goalType === "weeklyDistance" && !isNaN(distance)) {
        await addWeeklyDistance({
          userId,
          weekNumber: Math.ceil((new Date().getDate() + 1) / 7),
          distance,
        });
      }
      handleModalClose();
    } catch (error) {
      alert("Failed to add data: " + (error.response?.data?.message || "Unknown error"));
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
            transform: "translate(-50%, -50%)", // Shift back by half its own size
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
