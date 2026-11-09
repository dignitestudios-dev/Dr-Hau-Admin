import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons
import { SuccessToast } from "../../components/Global/Toaster";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // State to manage password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

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
        // setSuccessMessage("Password updated successfully.");
        SuccessToast("Password updated successfully.")
        setError(""); // Clear any previous error message
        setCurrentPassword("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(response?.data?.message || "Incorrect current password");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Incorrect current password");
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
          {/* Current Password */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-black">Current Password</label>
            <div className="relative mt-2">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 pr-10 border border-gray-300 rounded-md text-black"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black cursor-pointer"
                aria-label="Toggle current password visibility"
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-black">New Password</label>
            <div className="relative mt-2">
              <input
                type={showNewPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 pr-10 border border-gray-300 rounded-md text-black"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black cursor-pointer"
                aria-label="Toggle new password visibility"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-black">Confirm New Password</label>
            <div className="relative mt-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 pr-10 border border-gray-300 rounded-md text-black"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black cursor-pointer"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
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
