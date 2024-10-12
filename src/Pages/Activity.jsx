import React, { useState, useEffect } from "react";  
import Workout from "./Workout";  
import WeeklyChart from "./WeeklyChart";  
import { FaTrash, FaEdit } from "react-icons/fa";  
import { toast } from "sonner";  
import { useAuth } from "./AuthContext";  

const Activity = () => {  
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [workoutLog, setWorkoutLog] = useState([]);  
  const [weeklyCaloriesBurned, setWeeklyCaloriesBurned] = useState(  
    Array(7).fill(0)  
  );  
  const [editingWorkout, setEditingWorkout] = useState(null);  
  const [currentPage, setCurrentPage] = useState(1);  
  const { currentUser } = useAuth();  
  const entriesPerPage = 5;  

  useEffect(() => {  
    const fetchWorkoutLog = async () => {  
      if (!currentUser) return;  

      try {  
        const response = await fetch(  
          `http://localhost:5000/workouts/${currentUser._id}`,  
          {  
            headers: {  
              Authorization: `Bearer ${localStorage.getItem("token")}`,  
            },  
          }  
        );  

        if (!response.ok) throw new Error("Failed to fetch workouts");  

        const data = await response.json();  
        setWorkoutLog(data);  
        calculateWeeklyCalories(data);  
      } catch (error) {  
        toast.error("Error fetching workout log");  
        console.error("Error fetching workout log:", error);  
      }  
    };  

    fetchWorkoutLog();  
  }, [currentUser]);  

  const calculateWeeklyCalories = (data) => {  
    const today = new Date();  
    const startOfWeek = new Date(today);  
    startOfWeek.setDate(today.getDate() - today.getDay());  

    const calories = Array(7).fill(0);  
    data.forEach((entry) => {  
      const entryDate = new Date(entry.date);  
      if (entryDate >= startOfWeek && entryDate <= today) {  
        const dayIndex = entryDate.getDay();  
        if (!isNaN(entry.calories)) {  
          calories[dayIndex] += entry.calories;  
        }  
      }  
    });  
    setWeeklyCaloriesBurned(calories);  
  };  

  const calculateTotalCalories = () => {  
    const today = new Date();  
    const currentDayStart = new Date(today).setHours(0, 0, 0, 0);  
    const currentDayEnd = new Date(today).setHours(23, 59, 59, 999);  

    return workoutLog.reduce((total, entry) => {  
      const entryDate = new Date(entry.date);  
      return entryDate >= currentDayStart && entryDate <= currentDayEnd  
        ? total + entry.calories  
        : total;  
    }, 0);  
  };  

  const totalCaloriesToday = calculateTotalCalories();  

  const handleLogSubmit = async (workout) => {  
    const today = new Date();  
    const workoutDate = new Date(workout.date);  

    if (workoutDate > today) {  
      toast.error("Cannot log workout for a future date");  
      return;  
    }  

    try {  
      if (editingWorkout) {  
        const response = await fetch(  
          `http://localhost:5000/workouts/${editingWorkout.id}`,  
          {  
            method: "PUT",  
            headers: {  
              "Content-Type": "application/json",  
              Authorization: `Bearer ${localStorage.getItem("token")}`,  
            },  
            body: JSON.stringify(workout),  
          }  
        );  

        if (!response.ok) throw new Error("Failed to update workout");  

        const updatedWorkout = await response.json();  
        setWorkoutLog((prevLog) =>  
          prevLog.map((entry) =>  
            entry.id === updatedWorkout.id ? updatedWorkout : entry  
          )  
        );  
      } else {  
        const response = await fetch(`http://localhost:5000/workouts/add`, {  
          method: "POST",  
          headers: {  
            "Content-Type": "application/json",  
            Authorization: `Bearer ${localStorage.getItem("token")}`,  
          },  
          body: JSON.stringify(workout),  
        });  

        if (!response.ok) throw new Error("Failed to add workout");  

        const newWorkout = await response.json();  
        setWorkoutLog((prevLog) => [...prevLog, newWorkout]);  
      }  

      setIsModalOpen(false);  
      setEditingWorkout(null);  
      toast.success("Workout logged successfully");  
    } catch (error) {  
      toast.error("Error logging workout");  
      console.error("Error logging workout:", error);  
    }  
  };  

  const deleteWorkout = (index) => {  
    if (window.confirm("Are you sure you want to delete this workout?")) {  
      try {  
        setWorkoutLog((prevLog) => prevLog.filter((_, i) => i !== index));  
        calculateWeeklyCalories(workoutLog);  
      } catch (error) {  
        toast.error("Error deleting workout");  
        console.error("Error deleting workout:", error);  
      }  
    }  
  };  

  const currentEntries = workoutLog  
    .filter((entry) => {  
      const entryDate = new Date(entry.date);  
      const today = new Date();  
      return entryDate.toDateString() === today.toDateString();  
    })  
    .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);  

  const totalPages = Math.ceil(workoutLog.length / entriesPerPage);  

  return (  
    <div className="flex flex-col p-4">  
      <div className="flex justify-end mb-4">  
        <button  
          className="bg-black border-2 border-red-700 text-white rounded p-2"  
          onClick={() => {  
            setIsModalOpen(true);  
            setEditingWorkout(null);  
          }}  
        >  
          Add Workout  
        </button>  
        <Workout  
          isOpen={isModalOpen}  
          onClose={() => {  
            setIsModalOpen(false);  
            setEditingWorkout(null);  
          }}  
          onSubmit={handleLogSubmit}  
          workoutToEdit={editingWorkout}  
        />  
      </div>  

      <div className="bg-neutral-700 rounded-md p-4 mt-4 text-center">  
        <h2 className="text-white text-xl">Total Calories Burned Today</h2>  
        <p className="text-white font-bold text-2xl">  
          {totalCaloriesToday.toFixed(2)} kcal  
        </p>  
      </div>  

      <div className="flex flex-col md:flex-row items-center justify-between gap-2">  
        <div className="bg-dashboard-gradient flex-1 w-full md:w-[60%] h-[400px] rounded-md mt-4">  
          <WeeklyChart weeklyWorkoutData={weeklyCaloriesBurned} />  
        </div>  

        <div className="bg-red-600 flex-1 w-full md:w-[35%] h-[400px] rounded-md p-4 overflow-y-auto mt-4">  
          <h2 className="text-white text-xl mb-2 text-center">Workout Log</h2>  
          <div className="bg-black text-white p-2 rounded-md">  
            <div className="grid grid-cols-6 gap-2 text-xs font-bold mb-2">  
              <div>Exercise</div>  
              <div>Start Time</div>  
              <div>End Time</div>  
              <div>Date</div>  
              <div>Calories</div>  
              <div>Actions</div>  
            </div>  
          </div>  
          <ul className="list-disc flex flex-col items-center m-2">  
            {currentEntries.length === 0 ? (  
              <li className="text-center">No workouts logged for today.</li>  
            ) : (  
              currentEntries.map((entry, index) => (  
                <li  
                  key={entry.id}  
                  className="mb-2 gap-4 flex items-center justify-between bg-black w-full p-3 rounded-md text-white"  
                >  
                  <div className="text-xs font-light">{entry.exercise}</div>  
                  <div className="text-xs font-light">{entry.startTime}</div>  
                  <div className="text-xs font-light">{entry.endTime}</div>  
                  <div className="text-xs font-light">{entry.date}</div>  
                  <div className="text-xs font-light">  
                    {entry.calories} kcal  
                  </div>  
                  <div className="flex gap-2">  
                    <button onClick={() => startEditing(entry)}>  
                      <FaEdit />  
                    </button>  
                    <button onClick={() => deleteWorkout(index)}>  
                      <FaTrash />  
                    </button>  
                  </div>  
                </li>  
              ))  
            )}  
          </ul>  
          <div className="flex justify-center mt-4">  
            <button  
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}  
              disabled={currentPage === 1}  
              className="bg-black text-white px-2 py-1 rounded"  
            >  
              Previous  
            </button>  
            <span className="mx-2">  
              Page {currentPage} of {totalPages}  
            </span>  
            <button  
              onClick={() =>  
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))  
              }  
              disabled={currentPage === totalPages}  
              className="bg-black text-white px-2 py-1 rounded"  
            >  
              Next  
            </button>  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default Activity;