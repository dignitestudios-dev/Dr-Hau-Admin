import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa"; // Icon for file upload
import axios from "../../axios"; // Import the axios instance

const CdcUploadModal = ({ isOpen, onClose }) => {
  const [selectedPdf, setSelectedPdf] = useState(null); // Store selected PDF
  const [fileName, setFileName] = useState(""); // Store name of the PDF
  const [isUploading, setIsUploading] = useState(false); // Track upload status
  const [error, setError] = useState(""); // Error state

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedPdf(file);
    setFileName(file.name); // Set the name of the selected file
  };

  // Handle upload action
  const handleUpload = async () => {
    if (!selectedPdf) {
      alert("Please select a PDF file.");
      return;
    }

    setIsUploading(true); // Set uploading to true
    setError(""); // Reset error

    // Create FormData to send the file and name
    const formData = new FormData();
    formData.append("document", selectedPdf); // Add the file to the form data
    formData.append("name", fileName.split(".")[0]); // Add name (excluding the file extension)

    try {
      const response = await axios.post("/cdc/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        console.log("Upload successful:", response.data);
        onClose(); // Close the modal upon successful upload
      } else {
        setError("Failed to upload the file. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Error uploading file. Please try again.");
    } finally {
      setIsUploading(false); // Reset uploading state after the request
    }
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
              <label className="text-gray-700 mb-4">Upload a PDF file:</label>
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

            {/* Error message */}
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

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
                disabled={isUploading}
                className="px-6 py-2 bg-black text-white rounded-md w-full hover:bg-gray-800 transition duration-300"
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CdcUploadModal;
