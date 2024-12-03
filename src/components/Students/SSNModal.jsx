import React, { useState } from "react";

const SSNModal = ({ isOpen, onClose, onSubmit }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (password === "1234") {
      onSubmit();  // Show SSN after successful password validation
      onClose();   // Close the modal
    } else {
      alert("Incorrect password");
    }
  };

  if (!isOpen) return null; // If modal is not open, return null.

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md">
        <h3 className="text-xl font-semibold mb-4 text-black">Enter Password to View SSN</h3>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
            onClick={handleSubmit}
            className="bg-black text-white p-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SSNModal;
