import React from 'react';
import Modal from 'react-modal';
import { FaExclamation } from "react-icons/fa";
import { SuccessToast, ErrorToast } from '../Global/Toaster'; // Import toast functions
import axios from "../../axios";

const NotificationsModal = ({ isOpen, onRequestClose, onConfirm }) => {
  const handleClearNotifications = async () => {
    try {
      const response = await axios.post('/admin/notifications/admin/clear');
      if (response.status === 200) {
        // Show success toast if notifications are cleared
        SuccessToast("All notifications cleared successfully!");
        onRequestClose(); // Close the modal
        onConfirm(); // Optional: Perform any additional actions, e.g., refresh the list of notifications
      }
    } catch (error) {
      // Show error toast if something goes wrong
      ErrorToast("Failed to clear notifications. Please try again.");
      console.error("Error clearing notifications:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-[266px] h-[148px] text-left">
        <h2 className="text-2xl text-black font-semibold mb-2 text-[19px]">
          Clear All Notifications
        </h2>
        <p className="text-gray-600 mb-6 text-[12px]">
          Are you sure you want to clear all these notifications?
        </p>
        <div className="flex justify-end w-full">
          <button
            onClick={onRequestClose}
            className="mr-4 text-black text-[12px] font-semibold rounded-full hover:text-[#C00000] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleClearNotifications}
            className=" text-black text-[12px] font-semibold rounded-full hover:text-[#C00000] transition"
          >
            Clear
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NotificationsModal;
