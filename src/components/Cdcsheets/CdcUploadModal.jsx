import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa"; // Icon for file upload

const CdcUploadModal = ({ isOpen, onClose }) => {
  const [selectedPdf, setSelectedPdf] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedPdf(file);
  };

  const handleUpload = () => {
    // Logic to upload the file
    console.log("Uploading file:", selectedPdf);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 md:w-1/3 max-w-lg shadow-lg">
            {/* Icon above the heading */}
            <div className="flex justify-center mb-4">
              <FaFileUpload size={40} className="text-black" />
            </div>
          
            
            {/* Custom File Choose Button */}
            <div className="flex flex-col items-center mb-6">
              <label className=" text-gray-700 mb-4">Upload a PDF file:</label>
              <div className="relative">
                {/* Hidden file input */}
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  id="file-upload"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {/* Custom "Choose File" button */}
                <label
                  htmlFor="file-upload"
                  className="px-6 py-2 bg-black text-white rounded-md w-full text-center cursor-pointer hover:bg-gray-800 transition duration-300 mt-4"
                >
                  <FaFileUpload className="inline mr-2 mb-1" /> Choose File
                </label>
              </div>
              {selectedPdf && (
                <p className="text-sm text-gray-600 text-center mt-4">
                  Selected file: <span className="font-semibold">{selectedPdf.name}</span>
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex justify-between gap-4">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-black text-white rounded-md w-full hover:bg-gray-800 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-6 py-2 bg-black text-white rounded-md w-full hover:bg-gray-800 transition duration-300"
              >
                 Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CdcUploadModal;
