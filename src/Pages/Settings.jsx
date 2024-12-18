import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaWalking } from "react-icons/fa";
import { RiMapPinLine } from "react-icons/ri";
import { useAuth } from "../Pages/AuthContext";
import { API_URL } from "../../constants";
import { useFitness } from './PlanContext';
import { useWorkout } from "./WorkoutContext";
import { IoTrashOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";



const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [weeklyCaloriesBurned, setWeeklyCaloriesBurned] = useState(Array(7).fill(0));
  const { currentUser, logout } = useAuth();
  const { dailyStepCount, weeklyRunningDistance, loading } = useFitness();
  const { workoutLog, updateWorkout, deleteWorkout } = useWorkout();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null); 

  useEffect(() => {
    if (!workoutLog.length) {
      toast.info("No workouts logged yet.");
    }
  }, [workoutLog]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!currentUser || !token) {
        toast.error("You are not logged in.");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.error || "Failed to fetch profile.");
          return;
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("An unexpected error occurred.");
      }
    };

    if (currentUser) {
      fetchProfile();
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchWorkoutData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/workouts/${currentUser._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          if (response.status === 401) {
            toast.error("Unauthorized. Please log in again.");
            return;
          }
          const errorData = await response.json();
          toast.error(errorData.error || "Failed to fetch workout data.");
          return;
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          calculateWeeklyCalories(data);
        } else {
          toast.error("Workout data is not in the expected format.");
        }
      } catch (error) {
        console.error("Error fetching workout data:", error);
        toast.error("Failed to load workout data.");
      }
    };

    fetchWorkoutData();
  }, [currentUser]);

  const calculateWeeklyCalories = (data) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const calories = Array(7).fill(0);
    data.forEach(entry => {
      const entryDate = new Date(entry.date);
      if (entryDate >= startOfWeek && entryDate <= today) {
        const dayIndex = entryDate.getDay();
        const caloriesNum = parseFloat(entry.calories);
        if (!isNaN(caloriesNum)) {
          calories[dayIndex] += caloriesNum;
        }
      }
    });
    setWeeklyCaloriesBurned(calories);
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/users/uploadProfileImage`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload image");
      }

      const data = await response.json();
      setProfile((prevProfile) => ({ ...prevProfile, profileImage: data.url }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(error.message || "Upload failed");
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("Please select an image file to upload.");
      return;
    }
    await handleUpload(imageFile);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImage = () => setIsEditing(true);
  const handleCancelEdit = () => {
    setIsEditing(false);
    setImageFile(null);
    setImagePreview(null);
  };

 

  const todayDate = new Date().toDateString();

  const todaysWorkouts = workoutLog.filter(workout => new Date(workout.date).toDateString() === todayDate);

  const handleDeleteWorkout = async (workoutId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/workouts/${workoutId}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete workout');
      }

      toast.success("Workout deleted successfully.");
    } catch (error) {
      console.error("Error deleting workout:", error);
      toast.error(error.message || "Failed to delete workout");
    }
  };


  const handleUpdateWorkout = (workout) => {
    setSelectedWorkout(workout);
    setIsUpdateModalOpen(true); 
  };

  const handleUpdateWorkoutSubmit = async (updatedWorkout) => {
    try {
      await updateWorkout(selectedWorkout._id, updatedWorkout); 
      setIsUpdateModalOpen(false);
      toast.success("Workout updated successfully.");
    } catch (error) {
      toast.error(error.message || "Failed to update workout");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!profile) return <p className="text-center">No profile found.</p>;

  return (
    <div className="flex flex-col bg-neutral-900 p-6 h-full">
      <div className="bg-black rounded-lg p-6 mb-6 shadow-lg 3xl:h-[40rem]">
        <div className="relative flex flex-col items-center 3xl:mt-20">
          <div className="w-32 h-32 md:w-48 md:h-48 3xl:w-80 3xl:h-80 bg-white shadow-md rounded-full p-2 flex items-center justify-center">
            {profile.profileImage && !isEditing ? (
              <img
                src={profile.profileImage}
                alt={`${profile.username}'s profile`}
                className="w-full h-full rounded-full cursor-pointer border-4 border-gray-200 "
                onClick={() => setShowDetails((prev) => !prev)}
              />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-full" />
            )}
            {isEditing && imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-full h-full rounded-full" />
            )}
          </div>
          {!isEditing && profile.profileImage && (
            <button
              onClick={handleEditImage}
              className="absolute bottom-2 3xl:text-3xl right-2 bg-black text-white rounded-full p-2 transition duration-200"
            >
              Edit
            </button>
          )}
          {isEditing && (
            <form onSubmit={handleImageUpload} className="mt-4 flex flex-col items-center">
              <label
                htmlFor="fileInput"
                className="bg-neutral-800 text-white rounded px-4 py-2 cursor-pointer mb-2 transition duration-200 "
              >
                Choose Image
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="submit"
                className="bg-neutral-800 text-white rounded px-4 py-2 transition duration-200"
              >
                Upload Profile Image
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-red-600 text-white rounded px-4 py-2 mt-2 transition duration-200"
              >
                Cancel
              </button>
            </form>
          )}
          {!isEditing && !profile.profileImage && (
            <button
              onClick={handleEditImage}
              className="bg-green-600 text-white rounded px-4 py-2 mt-4 transition duration-200 hover:bg-green-500"
            >
              Upload Image
            </button>
          )}
          <div className="text-center mt-4">
            <p className="text-lg font-bold text-white 3xl:text-3xl">{profile.username}</p>
            <p className="text-sm text-gray-400 3xl:text-3xl">{profile.email}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mb-6 justify-center item-center">
        <div className="bg-neutral-800 p-6 rounded-lg text-center items-centerjustify-center w-full sm:w-1/3 md:w-80 3xl:h-[20rem] 3xl:w-[34rem]  2xl:w-[25rem] xl:w-[16rem]">
          <div className="item-center m-12">
          <h3 className="text-white text-xl mb-2 text-center 3xl:text-3xl xl:text-lg">Weekly Kcal Burned</h3>
          <p className="text-white text-2xl font-bold text-center 3xl:text-3xl xl:text-sm">
            <AiOutlineThunderbolt className="text-yellow-500 inline-block" />{" "}
            {weeklyCaloriesBurned.reduce((a, b) => a + b, 0).toFixed(2)} kcal
          </p>
          </div>
        
        </div>

        <div className="bg-neutral-800 p-6 rounded-lg text-center w-full sm:w-1/3 md:w-80 3xl:h-[20rem] 3xl:w-[34rem] 2xl:w-[25rem] xl:w-[16rem]">
          <div className="item-center m-12">
          <h3 className="text-white text-xl mb-2 3xl:text-3xl xl:text-lg">Daily Steps Count</h3>
          <p className="text-white text-2xl font-bold 3xl:text-3xl  xl:text-sm">
            <FaWalking className="text-green-500 inline-block 3xl:text-3xl" />{" "}
            {dailyStepCount.reduce((acc, item) => {
              const date = new Date(item.date).toDateString();
              if (date === new Date().toDateString()) {
                return acc + item.steps;
              }
              return acc;
            }, 0)} steps
          </p>
          </div>
        </div>

        <div className="bg-neutral-800 p-6 rounded-lg text-center w-full sm:w-1/3 md:w-80 3xl:h-[20rem] 3xl:w-[34rem]  2xl:w-[25rem] xl:w-[16rem]">
         <div className="item-center m-12">
         <h4 className="text-white text-xl mb-2 3xl:text-3xl xl:text-lg">Weekly Running Distance</h4>
          <p className="text-white text-2xl font-bold 3xl:text-3xl  xl:text-sm">
            <RiMapPinLine className="text-blue-500 inline-block" />{" "}
            {weeklyRunningDistance.reduce((acc, item) => acc + item.distance, 0)} km
          </p>
         </div>
    
        </div>
      </div>

      
      <div className="gap-12 flex item-center justify-center flex-col bg-black w-full rounded">
        <div className="flex item-center justify-between text-white m-7 3xl:text-3xl">
          <h1>Workout</h1>
          <h1>Date</h1>
          <h1>Kcal Burned</h1>
          <h1>Actions</h1>
        </div>
        <div>
          {todaysWorkouts.length > 0 ? (
            todaysWorkouts.map((workout, index) => (
              <div key={index} className="flex item-center 3xl:text-2xl text-center justify-between bg-neutral-900 m-7 h-10 w-90 3xl:h-[6rem]">
                <p className="text-white m-2 3xl:m-7">{workout.exercise || "Unknown Exercise"}</p>
                <p className="text-gray-400 m-2 3xl:m-7">{new Date(workout.date).toLocaleString()}</p>
                <p className="text-white m-2 3xl:m-7">{workout.calories} kcal burned</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleUpdateWorkout(workout)} 
                    className="bg-blue-600 text-white rounded px-4 py-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteWorkout(workout._id)} 
                    className="bg-red-600 text-white rounded px-4 py-2"
                  >
                    <IoTrashOutline />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No workouts logged for today.</p>
          )}
        </div>
      </div>

      {isUpdateModalOpen && (
        <UpdateWorkoutModal 
          workout={selectedWorkout}
          onClose={() => setIsUpdateModalOpen(false)} 
          onSubmit={handleUpdateWorkoutSubmit}  
        />
      )}

     
      </div>
  );
};


const UpdateWorkoutModal = ({ workout, onClose, onSubmit }) => {
  const [updatedWorkout, setUpdatedWorkout] = useState({
    exercise: workout.exercise,
    calories: workout.calories,
    startTime: workout.startTime,
    endTime: workout.endTime,
    date: workout.date
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(updatedWorkout);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center">
      <div className="bg-neutral-950 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-white text-xl mb-4">Update Workout</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white block mb-2">Exercise</label>
            <select
              value={updatedWorkout.exercise}
              onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, exercise: e.target.value })}
              className="w-full p-2 rounded bg-neutral-700 text-white"
            >
              {['running', 'cycling', 'swimming', 'yoga', 'weightlifting'].map(exercise => (
                <option key={exercise} value={exercise}>
                  {exercise.charAt(0).toUpperCase() + exercise.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-white block mb-2">Start Time</label>
            <input
              type="time"
              value={updatedWorkout.startTime}
              onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, startTime: e.target.value })}
              className="w-full p-2 rounded bg-neutral-700 text-white"
              required
            />
          </div>

          <div>
            <label className="text-white block mb-2">End Time</label>
            <input
              type="time"
              value={updatedWorkout.endTime}
              onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, endTime: e.target.value })}
              className="w-full p-2 rounded bg-neutral-700 text-white"
              required
            />
          </div>

          <div>
            <label className="text-white block mb-2">Date</label>
            <input
              type="date"
              value={updatedWorkout.date}
              onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, date: e.target.value })}
              className="w-full p-2 rounded bg-neutral-700 text-white"
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div>
            <label className="text-white block mb-2">Calories Burned</label>
            <input
              type="number"
              value={updatedWorkout.calories}
              onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, calories: e.target.value })}
              className="w-full p-2 rounded bg-neutral-700 text-white"
              readOnly
            />
          </div>

          <div className="flex justify-between mt-4">
            <button 
              type="submit" 
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default Settings;
