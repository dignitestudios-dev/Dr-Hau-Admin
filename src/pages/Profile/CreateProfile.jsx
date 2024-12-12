import React, { useState } from "react";
import ProfileCompleteModal from "../../components/onboarding/ProfileCompleteModal";
import axios from "../../axios";
import { FiEye, FiEyeOff } from "react-icons/fi";  // Importing eye icons from react-icons

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);  // Loading state for API call

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log formData to verify
    console.log('Form Data:', formData);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(""); // Reset error state
    setIsLoading(true); // Set loading to true when submitting

    try {
      const response = await axios.post("/admin/school", {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword, // Send confirmPassword explicitly
      });

      setIsLoading(false); // Reset loading state
      if (response.data.success) {
        setIsModalOpen(true); // Open the modal on successful profile creation
      } else {
        setError(response.data.message || "Failed to create profile. Please try again.");
      }
    } catch (error) {
      setIsLoading(false); // Reset loading state
      if (error.response) {
        // Server error
        setError(error.response.data.message || "An error occurred. Please try again.");
      } else {
        // Network or other errors
        setError("An error occurred. Please check your internet connection.");
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-auto p-6 bg-gray-100 overflow-auto">
      <div className="flex items-center mb-4">
        <h3 className="text-[24px] font-bold text-black">Create Profile</h3>
      </div>

      <div className="bg-white w-full h-auto p-6 rounded-lg shadow-lg text-black">
        <form onSubmit={handleSubmit}>
          <h3 className="text-[24px] text-black font-semibold mb-6 mt-2">
            Fill the details below to create admin profile
          </h3>

          <div className="flex flex-col mb-4">
            <label className="mb-2 font-medium">Campus Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Campus Email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col mb-4 relative">
            <label className="mb-2 font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              required
            />
            {/* Eye Icon to toggle password visibility */}
            <span
              className="absolute right-3 top-14 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col mb-6 relative">
            <label className="mb-2 font-medium">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm Password"
              required
            />
            {/* Eye Icon to toggle confirm password visibility */}
            <span
              className="absolute right-3 top-14 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="mt-6 flex justify-center sm:justify-start mb-2">
            <button
              type="submit"
              className="bg-black text-white py-2 px-6 rounded-lg w-full sm:w-[200px] transition-all"
              disabled={isLoading}  
            >
              {isLoading ? "Creating..." : "Send to Email"}
            </button>
          </div>
        </form>
      </div>

      <ProfileCompleteModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      />
    </div>
  );
};

export default CreateProfile;
