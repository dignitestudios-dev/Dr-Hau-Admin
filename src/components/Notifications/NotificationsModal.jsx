import React from 'react';
import Modal from 'react-modal';
import { IoMdClose } from 'react-icons/io';
import { FaExclamation } from "react-icons/fa";

const NotificationsModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-[266px] h-[148px] text-left">
        <h2 className="text-2xl text-black font-semibold mb-2 text-[19px]">Clear All Notifications</h2>
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
            onClick={onRequestClose}
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
