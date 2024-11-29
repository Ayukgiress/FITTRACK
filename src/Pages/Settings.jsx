import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaWalking } from "react-icons/fa";
import { RiMapPinLine } from "react-icons/ri";
import { useAuth } from "../Pages/AuthContext";
import { API_URL } from "../../constants";
import { useFitness } from './PlanContext';

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [weeklyCaloriesBurned, setWeeklyCaloriesBurned] = useState(Array(7).fill(0));
  const { currentUser, logout } = useAuth();
  const { dailyStepCount, weeklyRunningDistance, loading } = useFitness();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!currentUser || !token) {
        toast.error("You are not logged in.");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload image");
      }

      const data = await response.json();
      setProfile((prevProfile) => ({
        ...prevProfile,
        profileImage: data.url,
      }));
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

  const handleEditImage = () => setIsEditing(true);
  const handleCancelEdit = () => {
    setIsEditing(false);
    setImageFile(null);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!profile) return <p className="text-center">No profile found.</p>;

  return (
    <div className="flex flex-col bg-neutral-900 p-6 h-full">
      <div className="bg-black rounded-lg p-6 mb-6">
        <div className="flex flex-col items-center">
          {profile.profileImage ? (
            <img
              src={profile.profileImage}
              alt={`${profile.username}'s profile`}
              className="w-48 h-48 rounded-full mb-4 cursor-pointer border-4 border-gray-200"
              onClick={() => setShowDetails((prev) => !prev)}
            />
          ) : (
            <div className="w-48 h-48 bg-gray-300 rounded-full mb-4" />
          )}

          {isEditing ? (
            <form onSubmit={handleImageUpload} className="flex flex-col items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="mb-2 border border-gray-300 rounded p-2"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 transition duration-200 hover:bg-blue-500"
              >
                Upload Profile Image
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-red-600 text-white rounded px-4 py-2 mt-2 transition duration-200 hover:bg-red-500"
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <p className="text-lg font-bold text-white">{profile.username}</p>
              <p className="text-sm text-white">{profile.email}</p>
              {showDetails && !isEditing && (
                <button
                  onClick={handleEditImage}
                  className="bg-green-600 text-white rounded px-4 py-2 mt-2 transition duration-200 hover:bg-green-500"
                >
                  Edit Image
                </button>
              )}
              {!profile.profileImage && (
                <button
                  onClick={handleEditImage}
                  className="bg-green-600 text-white rounded px-4 py-2 mt-4 transition duration-200 hover:bg-green-500"
                >
                  Upload Image
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mb-6 justify-center">
  <div className="bg-neutral-800 p-6 rounded-lg text-center w-full sm:w-1/3 md:w-82">
    <h3 className="text-white text-xl mb-2">Weekly Kcal Burned</h3>
    <p className="text-white text-2xl font-bold">
      <AiOutlineThunderbolt className="text-yellow-500 inline-block" />{" "}
      {weeklyCaloriesBurned.reduce((a, b) => a + b, 0).toFixed(2)} kcal
    </p>
  </div>

  <div className="bg-neutral-800 p-6 rounded-lg text-center w-full sm:w-1/3 md:w-80">
    <h3 className="text-white text-xl mb-2">Daily Steps Count</h3>
    <p className="text-white text-2xl font-bold">
      <FaWalking className="text-green-500 inline-block" />{" "}
      {dailyStepCount.reduce((acc, item) => {
        const date = new Date(item.date).toDateString();
        if (date === new Date().toDateString()) {
          return acc + item.steps;
        }
        return acc;
      }, 0)} steps
    </p>
  </div>

  <div className="bg-neutral-800 p-6 rounded-lg text-center w-full sm:w-1/3 md:w-82 ">
    <h3 className="text-white text-xl mb-2">Weekly Running Distance</h3>
    <p className="text-white text-2xl font-bold">
      <RiMapPinLine className="text-blue-500 inline-block" />{" "}
      {weeklyRunningDistance.reduce((acc, item) => acc + item.distance, 0)} km
    </p>
  </div>
</div>


      <div className="text-center">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white rounded px-6 py-2 mt-6 transition duration-200 hover:bg-red-500"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Settings;
