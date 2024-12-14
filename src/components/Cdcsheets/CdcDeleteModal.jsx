import React from "react";
import { FaTrashAlt } from "react-icons/fa"; 

const CdcDeleteModal = ({ isOpen, onClose, onDelete, pdfName, pdfId, }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 md:w-1/3 max-w-lg shadow-lg">
            <div className="flex justify-center mb-4">
              <FaTrashAlt size={40} className="text-black" />
            </div>

            <h3 className="text-2xl font-semibold text-black text-center mb-4">
              Are you sure you want to delete the "{pdfName}" file?
            </h3>

            <div className="flex justify-between gap-4">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-300 text-black rounded-md w-full hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => onDelete(pdfId)} // Use the pdfId to make the delete request
                className="px-6 py-2 bg-red-600 text-white rounded-md w-full hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CdcDeleteModal;
