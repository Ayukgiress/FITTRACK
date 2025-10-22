import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CiLogout, CiEdit, CiCamera } from "react-icons/ci";
import { FaUser, FaRuler, FaWeight, FaCalendarAlt, FaVenusMars } from "react-icons/fa";
import { useAuth } from "../Pages/AuthContext";
import { API_URL } from "../../constants";

const Profile = ({ isAuthenticated }) => {
  const { logout, currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    height: '',
    weight: '',
  });
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
        setEditData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          dateOfBirth: data.dateOfBirth || '',
          gender: data.gender || '',
          height: data.height || '',
          weight: data.weight || '',
        });
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

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    }
  };

  const handleEditDataChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const toggleDetails = () => setShowDetails(prev => !prev);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white text-xl">Loading profile...</p>
      </div>
    </div>
  );

  if (!profile) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-white text-xl">No profile found.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-gray-800 border-b border-gray-700 px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mr-6">
              <FaUser className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Profile</h1>
              <p className="text-gray-300">Manage your personal information</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl flex items-center transition-all duration-200"
          >
            <CiEdit className="mr-2" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Photo Section */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700">
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden mx-auto">
                  {profile.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt={`${profile.username}'s profile`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-white text-4xl" />
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={handleEditImage}
                    className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-200 transform hover:scale-110"
                  >
                    <CiCamera className="text-sm" />
                  </button>
                )}
              </div>

              {isEditing && (
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  {imageFile && (
                    <button
                      onClick={handleImageUpload}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-200"
                    >
                      Upload Image
                    </button>
                  )}
                  <button
                    onClick={handleCancelEdit}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <h2 className="text-xl font-bold text-white mt-4">
                {profile.firstName && profile.lastName
                  ? `${profile.firstName} ${profile.lastName}`
                  : profile.username}
              </h2>
              <p className="text-gray-400">{profile.email}</p>
            </div>
          </div>

          {/* Profile Details Section */}
          <div className="lg:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-6">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Username</label>
                <div className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3">
                  <p className="text-white font-medium">{profile.username}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Email</label>
                <div className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3">
                  <p className="text-white font-medium">{profile.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.firstName}
                    onChange={(e) => handleEditDataChange('firstName', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <div className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3">
                    <p className="text-white font-medium">{profile.firstName || 'Not set'}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.lastName}
                    onChange={(e) => handleEditDataChange('lastName', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <div className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3">
                    <p className="text-white font-medium">{profile.lastName || 'Not set'}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editData.dateOfBirth}
                    onChange={(e) => handleEditDataChange('dateOfBirth', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <div className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3">
                    <p className="text-white font-medium">
                      {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'Not set'}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 flex items-center">
                  <FaVenusMars className="mr-2" />
                  Gender
                </label>
                {isEditing ? (
                  <select
                    value={editData.gender}
                    onChange={(e) => handleEditDataChange('gender', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                ) : (
                  <div className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3">
                    <p className="text-white font-medium">{profile.gender || 'Not set'}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 flex items-center">
                  <FaRuler className="mr-2" />
                  Height (cm)
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editData.height}
                    onChange={(e) => handleEditDataChange('height', e.target.value)}
                    placeholder="Enter height in cm"
                    className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <div className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3">
                    <p className="text-white font-medium">{profile.height ? `${profile.height} cm` : 'Not set'}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 flex items-center">
                  <FaWeight className="mr-2" />
                  Weight (kg)
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editData.weight}
                    onChange={(e) => handleEditDataChange('weight', e.target.value)}
                    placeholder="Enter weight in kg"
                    className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <div className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3">
                    <p className="text-white font-medium">{profile.weight ? `${profile.weight} kg` : 'Not set'}</p>
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Account Actions */}
        <div className="mt-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700">
          <h3 className="text-2xl font-semibold text-white mb-6">Account Actions</h3>
          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center"
            >
              <CiLogout className="mr-3 text-xl" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
