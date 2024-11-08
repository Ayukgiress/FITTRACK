import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../Pages/AuthContext";
import { API_URL } from "../../constants";

const Profile = ({ isAuthenticated }) => {
  const { logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!isAuthenticated || !token) {
        navigate("/login");
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
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, navigate]);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_URL}/users/uploadProfileImage`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload image');
      }

      const data = await response.json();
      setProfile(prevProfile => ({
        ...prevProfile,
        profileImage: data.url,
      }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(error.message || 'Upload failed');
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

  const toggleDetails = () => setShowDetails(prev => !prev);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <p className="text-center">Loading profile...</p>;
  if (!profile) return <p className="text-center">No profile found.</p>;

  return (
    <div className="flex item-center flex-col justify-between bg-neutral-800 h-full profiles">
      <div className="bg-black h-80 w-full profile">
        <div className="w-48 h-48 mx-auto m-3 bg-white shadow-md rounded-full p-5 flex flex-col items-center prof-img">
          {profile.profileImage && (
            <img
              src={profile.profileImage}
              alt={`${profile.username}'s profile`}
              className="w-44 h-44 rounded-full mb-4 cursor-pointer border-4 border-gray-200 img"
              onClick={toggleDetails}
            />
          )}

          {isEditing ? (
            <form onSubmit={handleImageUpload} className="mt-4 flex flex-col items-center">
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
          ) : !profile.profileImage ? (
            <button
              onClick={handleEditImage}
              className="bg-green-600 text-white rounded px-4 py-2 mt-4 transition duration-200 hover:bg-green-500"
            >
              Upload Image
            </button>
          ) : null}
        </div>

        <div className="text-center mt-4 flex flex-col items-center">
          <p className="text-lg font-bold text-white name">{profile.username}</p>
          <p className="text-sm text-white name">{profile.email}</p>
        </div>

        {showDetails && !isEditing && (
          <button
            onClick={handleEditImage}
            className="bg-green-600 text-white rounded px-4 py-2 mt-2 transition duration-200 hover:bg-green-500"
          >
            Edit Image
          </button>
        )}
      </div>

      <div className="flex items-center justify-center mt-4">
        <CiLogout className="mr-2 text-white text-xl" />
        <button onClick={handleLogout} className="text-white text-xl bg-transparent border-none cursor-pointer logout">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
