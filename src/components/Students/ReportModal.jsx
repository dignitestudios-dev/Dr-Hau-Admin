import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom

const ReportModal = ({ isOpen, onClose, onSubmit }) => {
  const [password, setPassword] = useState(""); // The password state, which will no longer be checked
  const navigate = useNavigate();  // Initialize the navigate function

  const handleSubmit = () => {
    onSubmit();  // Trigger any additional actions passed via props
    navigate("/userappointmentdetails");  // Navigate to the user appointment details page
    onClose();   // Close the modal
  };

  if (!isOpen) return null; // If modal is not open, return null.

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md">
        <h3 className="text-xl font-semibold mb-4 text-black">Enter Password to View Report</h3>
        <input
          type="password"
          value={password}  // The password is no longer validated
          onChange={(e) => setPassword(e.target.value)}  // Update the password state
          className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
          placeholder="Enter Password"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className=" text-black p-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}  // Directly calls handleSubmit on click
            className="bg-black text-white p-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
