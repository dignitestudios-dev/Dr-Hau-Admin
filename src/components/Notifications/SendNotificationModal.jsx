import React from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";

const SendNotificationModal = ({ isOpen, onRequestClose, isEventsModalOpen, }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full lg:w-[532.47px] lg:h-[340px] relative">
        <button
          onClick={onRequestClose}
          className="absolute top-8 right-6 text-gray-600 hover:text-gray-900 transition"
        >
          <IoMdClose size={20} />
        </button>

        <h2 className="text-xl font-medium text-gray-800 mb-4">Notification</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-4 bg-[#F9FAFB] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 mb-4 bg-[#F9FAFB] border border-gray-200 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-gray-400"
        ></textarea>

        <button
        //   onClick={onSubmit}
          onClick={onRequestClose}

          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default SendNotificationModal;
