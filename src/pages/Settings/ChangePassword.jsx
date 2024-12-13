import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate for navigation
import axios from "../../axios"; // Make sure the axios instance is imported

const ChangePassword = () => {
  const navigate = useNavigate();

  // State hooks for handling form inputs and API responses
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission for password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!currentPassword || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios?.post('/auth/updatePassAdmin', {
        currentPassword,
        password,
        confirmPassword,
      });

      if (response?.data?.success) {
        setSuccessMessage("Password updated successfully.");
        setError(""); // Clear any previous error message
      } else {
        setError(response?.data?.message || "Failed to update password.");
      }
    } catch (error) {
      setError("An error occurred while updating the password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6 rounded-md overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[24px] font-bold text-black">Update Password</h3>
      </div>

      {/* Update Password Form */}
      <div className="mt-8 p-6 rounded-md shadow-customShadow bg-white">
        <h4 className="text-lg font-semibold text-black mb-8">Change Password</h4>
        {successMessage && (
          <div className="text-green-500">{successMessage}</div>
        )}
        {error && (
          <div className="text-red-500">{error}</div>
        )}
        <form onSubmit={handlePasswordUpdate}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-black">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md text-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-black">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md text-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-black">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md text-black"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full p-2 mt-4 ${loading ? "bg-gray-400" : "bg-black"} text-white font-semibold rounded-md`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
