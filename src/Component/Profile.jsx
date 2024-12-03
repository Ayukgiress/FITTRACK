import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../Pages/AuthContext";
import { API_URL } from "../../constants";

const Profile = ({ isAuthenticated }) => {
  const { logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
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
    setUploading(true);
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
      toast.success("Profile uploaded succesfully");
      setProfile(prevProfile => ({
        ...prevProfile,
        profileImage: data.url,
      }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(error.message || 'Upload failed');
    } finally {
      setUploading(false);
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

  const toggleDetails = () => setShowDetails(prev => !prev);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <p className="text-center">Loading profile...</p>;
  if (!profile) return <p className="text-center">No profile found.</p>;

  return (
    <div className="flex flex-col items-center justify-between bg-neutral-800 h-full profiles p-4">
      <div className="bg-black w-full flex flex-col items-center p-6 shadow-lg rounded-lg profile">
        <div className="relative">
          <div className="w-32 h-32 md:w-48 md:h-48 3xl:w-80 3xl:h-80 bg-white shadow-md rounded-full p-2 flex items-center justify-center">
            {profile.profileImage && (
              <img
                src={profile.profileImage}
                alt={`${profile.username}'s profile`}
                className="w-full h-full rounded-full cursor-pointer border-4 border-gray-200"
                onClick={toggleDetails}
              />
            )}
            {isEditing && imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full rounded-full"
              />
            )}
          </div>
          {!isEditing && profile.profileImage && (
            <button
              onClick={handleEditImage}
              className="absolute bottom-2 right-2 bg-black text-white rounded-full p-2 transition duration-200"
            >
              Edit
            </button>
          )}
        </div>

        {isEditing && (
          <form onSubmit={handleImageUpload} className="mt-4 flex flex-col items-center">
            <label htmlFor="fileInput" className="bg-neutral-800 text-white rounded px-4 py-2 cursor-pointer mb-2">
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
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Profile Image'}
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-red-600 text-white rounded px-4 py-2 mt-2 transition duration-200 hover:bg-red-500"
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
          <p className="text-lg font-bold text-white">{profile.username}</p>
          <p className="text-sm text-gray-400">{profile.email}</p>
        </div>
      </div>

      <div className="flex items-center justify-center mt-10">
        <button onClick={handleLogout} className="flex items-center text-white text-xl bg-red-600 px-4 py-2 rounded transition duration-200 hover:bg-red-500">
          <CiLogout className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
