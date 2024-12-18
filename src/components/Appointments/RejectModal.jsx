import React from "react";
import { SuccessToast, ErrorToast } from "../Global/Toaster"; // Import the toast functions

const RejectModal = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  const handleConfirm = () => {
    ErrorToast("Appointment rejected.");
    onConfirm();
    
  };

  const handleCancel = () => {
    SuccessToast("Action canceled.");
    onCancel();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h4 className="text-xl font-semibold mb-4 text-black">Are you sure you want to reject this appointment?</h4>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="bg-gray-300 px-6 py-2 rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-red-500 text-white px-6 py-2 rounded-lg text-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
