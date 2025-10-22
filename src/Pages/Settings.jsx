import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import { FaUser, FaPalette, FaSignOutAlt, FaCog, FaSave, FaCamera, FaEdit, FaWeight, FaRuler, FaCalendarAlt, FaVenusMars } from 'react-icons/fa';
import { API_URL } from '../../constants';

const Settings = () => {
  const { currentUser, logout } = useAuth();
  const [settings, setSettings] = useState({
    theme: localStorage.getItem('theme') || 'dark',
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [profileData, setProfileData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    dateOfBirth: currentUser?.dateOfBirth || '',
    gender: currentUser?.gender || '',
    height: currentUser?.height || '',
    weight: currentUser?.weight || '',
    profilePhoto: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
    setHasChanges(true);
  };

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({ ...prev, profilePhoto: e.target.result }));
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Save theme to localStorage
      localStorage.setItem('theme', settings.theme);
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: settings.theme } }));

      // Save profile data to backend
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token not found');
        return;
      }

      const profileUpdateData = {
        username: profileData.username,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        dateOfBirth: profileData.dateOfBirth,
        gender: profileData.gender,
        height: profileData.height,
        weight: profileData.weight,
      };

      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileUpdateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      toast.success('Settings saved successfully!');
      setHasChanges(false);
      setIsEditing(false);

      // Refresh user data in context
      window.location.reload();
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error(error.message || 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-gray-800 border-b border-gray-700 px-6 py-8">
        <div className="flex items-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mr-6">
            <FaCog className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        {/* Save Changes Bar */}
        {hasChanges && (
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-4 mb-8 shadow-2xl border border-green-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaSave className="text-white mr-3" />
                <span className="text-white font-medium">You have unsaved changes</span>
              </div>
              <button
                onClick={handleSaveSettings}
                disabled={loading}
                className="bg-white text-green-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Section */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 hover:shadow-blue-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-500/20 rounded-xl mr-4">
                  <FaUser className="text-blue-400 text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white">Profile</h2>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl flex items-center transition-all duration-200"
              >
                <FaEdit className="mr-2" />
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Photo */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                    {profileData.profilePhoto ? (
                      <img src={profileData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <FaUser className="text-white text-4xl" />
                    )}
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-200 transform hover:scale-110"
                    >
                      <FaCamera className="text-sm" />
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                {isEditing && (
                  <p className="text-gray-400 text-sm text-center">Click the camera icon to change photo</p>
                )}
              </div>

              {/* Profile Details */}
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Username</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.username}
                        onChange={(e) => handleProfileChange('username', e.target.value)}
                        className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3">
                        <p className="text-white font-medium">{profileData.username || 'N/A'}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Email Address</label>
                    <div className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3">
                      <p className="text-white font-medium">{profileData.email || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">First Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => handleProfileChange('firstName', e.target.value)}
                        className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3">
                        <p className="text-white font-medium">{profileData.firstName || 'N/A'}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Last Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => handleProfileChange('lastName', e.target.value)}
                        className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3">
                        <p className="text-white font-medium">{profileData.lastName || 'N/A'}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => handleProfileChange('dateOfBirth', e.target.value)}
                        className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3">
                        <p className="text-white font-medium">{profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Gender</label>
                    {isEditing ? (
                      <select
                        value={profileData.gender}
                        onChange={(e) => handleProfileChange('gender', e.target.value)}
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
                        <p className="text-white font-medium">{profileData.gender || 'N/A'}</p>
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
                        value={profileData.height}
                        onChange={(e) => handleProfileChange('height', e.target.value)}
                        placeholder="Enter height in cm"
                        className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3">
                        <p className="text-white font-medium">{profileData.height ? `${profileData.height} cm` : 'N/A'}</p>
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
                        value={profileData.weight}
                        onChange={(e) => handleProfileChange('weight', e.target.value)}
                        placeholder="Enter weight in kg"
                        className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3">
                        <p className="text-white font-medium">{profileData.weight ? `${profileData.weight} kg` : 'N/A'}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 hover:shadow-purple-500/10 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-purple-500/20 rounded-xl mr-4">
                <FaPalette className="text-purple-400 text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">Appearance</h2>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Theme</label>
                <select
                  value={settings.theme}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="dark">🌙 Dark Mode</option>
                  <option value="light">☀️ Light Mode</option>
                  <option value="auto">🔄 Auto (System)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Account Actions Section */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-gray-500/20 rounded-xl mr-4">
                  <FaSignOutAlt className="text-gray-400 text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white">Account</h2>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Need help? <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
