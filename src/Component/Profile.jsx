import React, { useEffect, useState } from "react";  
import { useNavigate } from "react-router-dom";  
import { toast } from "react-toastify";  
import { API_URL } from "../../constants";  

const Profile = ({ isAuthenticated }) => {  
  const [profile, setProfile] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [imageFile, setImageFile] = useState(null);  
  const [showDetails, setShowDetails] = useState(false); // State to toggle details visibility
  const [isEditing, setIsEditing] = useState(false); // State to track if in editing mode
  const navigate = useNavigate();  
  
  useEffect(() => {  
    const fetchProfile = async () => {  
      const token = localStorage.getItem("token");  
      if (!isAuthenticated || !token) {  
        navigate("/login");  
        return;  
      }  
  
      try {  
        const response = await fetch(`${API_URL}users/profile`, {  
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
      const response = await fetch(`${API_URL}users/uploadProfileImage`, {
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
      console.log('Upload successful:', data); // Ensure this logs the URL
      setProfile((prevProfile) => ({
        ...prevProfile,
        profileImage: data.url, // Update the state with the new image URL
      }));
      setIsEditing(false); // Exit editing mode after upload
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

  const handleEditImage = () => {
    setIsEditing(true); // Enter editing mode
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Exit editing mode
    setImageFile(null); // Clear the selected file
  };

  const toggleDetails = () => {
    setShowDetails(prev => !prev); 
  };

  if (loading) {  
    return <p className="text-center">Loading profile...</p>;  
  }  

  if (!profile) {  
    return <p className="text-center">No profile found.</p>;  
  }  

  return ( 
    <div className="w-52 h-56 rounded-full bg-black">
      <div className="w-48 h-52 mx-auto m-3 bg-white shadow-md rounded-full p-5 flex flex-col items-center">  
        {profile.profileImage && (  
          <img 
            src={profile.profileImage} 
            alt={`${profile.username}'s profile`} 
            className="w-32 h-32 rounded-full mb-4 cursor-pointer border-4 border-gray-200" 
            onClick={toggleDetails} // Toggle details on image click
          />
        )}
        {showDetails && (
          <div className="text-center">
            <p className="text-lg font-semibold">{profile.username}</p>  
            <p className="text-sm text-gray-500"><small>Email:</small> {profile.email}</p>  
            {profile.profileImage && !isEditing && ( // Show Edit button only when not editing
              <button 
                onClick={handleEditImage} 
                className="bg-green-600 text-white rounded px-4 py-2 mt-2 transition duration-200 hover:bg-green-500"
              >
                Edit Image
              </button>
            )}
          </div>
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
        ) : (
          !profile.profileImage && ( 
            <button 
              onClick={handleEditImage} 
              className="bg-green-600 text-white rounded px-4 py-2 mt-4 transition duration-200 hover:bg-green-500"
            >
              Upload Image
            </button>
          )
        )}
      </div> 
    </div> 
  );  
};  

export default Profile;
