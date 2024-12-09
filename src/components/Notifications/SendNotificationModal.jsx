import React, { useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import axios from "../../axios";

const SendNotificationModal = ({ isOpen, onRequestClose }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("user"); // Target can be "user" or "all"
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleTargetChange = (e) => setTarget(e.target.value); // Handle target change

  const handleSubmit = async () => {
    if (!title || !message) {
      alert("Please fill in both title and message.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("/admin/notifications", {
        title: title,
        message: message,
        target: target, // Send the selected target
      });

      if (response.data.success) {
        alert(response.data.message);  
        onRequestClose();  
      }
    } catch (error) {
      console.error("Error creating notification:", error);
      alert("Failed to create notification. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full lg:w-[532.47px] lg:h-[420px] relative">
        <button
          onClick={onRequestClose}
          className="absolute top-8 right-6 text-gray-600 hover:text-gray-900 transition"
        >
          <IoMdClose size={20} />
        </button>

        <h2 className="text-xl font-medium text-gray-800 mb-4">Notification</h2>

        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
          className="w-full p-2 mb-4 bg-[#F9FAFB] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <textarea
          value={message}
          onChange={handleMessageChange}
          placeholder="Description"
          className="w-full p-2 mb-4 bg-[#F9FAFB] border border-gray-200 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-gray-400"
        ></textarea>

        {/* Dropdown for Target */}
        <div className="mb-4">
          <label htmlFor="target" className="block text-sm font-medium text-gray-700">
            Send to
          </label>
          <select
            id="target"
            value={target}
            onChange={handleTargetChange}
            className="w-full p-2 mt-2 bg-[#F9FAFB] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="user">User</option>
            <option value="all">All</option> {/* Change admin to all */}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </Modal>
  );
};

export default SendNotificationModal;
