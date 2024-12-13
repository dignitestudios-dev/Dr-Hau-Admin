import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaFileAlt, FaUpload } from 'react-icons/fa'; // Importing React Icons
import PdfUploadModal from '../../components/Appointments/UploadPdfModal';

const AppointmentCompleted = () => {
  const navigate = useNavigate();
  const {id} = useParams()
  const location = useLocation(); // To access the passed state
  const { appointment } = location.state || {};
  console.log(appointment)
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for PDF upload

  // Open the modal
  const openModal = () => setIsModalOpen(true);

  // Close the modal
  const closeModal = () => setIsModalOpen(false);

  // Handle the PDF upload
  const handleUpload = (file) => {
    console.log("Uploaded file:", file);
    // You can handle the uploaded file here, like sending it to a server.
  };

  

  return (
    <div className="w-full h-auto p-6 bg-gray-100 overflow-auto">
      <div className="flex items-center mb-6">
        <h3 className="text-[24px] font-bold text-black">Appointment Detail</h3>
      </div>

      <div className="bg-white shadow-md rounded-md p-6">
        <div>
          <h4 className="text-[20px] font-bold text-black mb-4">
            Vaccination Appointment <span className="bg-green-500 text-white px-3 py-2 text-[12px] rounded-full">Completed</span>
          </h4>
          <p className="text-[14px] text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non eleifend odio, suscipit aliquam erat. Quisque eu fermentum tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non eleifend odio, suscipit aliquam erat. Quisque eu fermentum tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non eleifend odio, suscipit aliquam erat. Quisque eu fermentum tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non eleifend odio, suscipit aliquam erat. Quisque eu fermentum tortor.
          </p>

          <div className="flex items-center text-[14px] text-gray-700 mb-2">
            <span className="mr-3">🕒</span> 09:00 AM - 14:00 PM
          </div>
          <div className="flex items-center text-[14px] text-gray-700 mb-4">
            <span className="mr-3">📅</span> June 12, 2024
          </div>

          <div className="mb-4">
            <strong className="text-black">Vaccinations:</strong>
            <ul className="list-disc ml-5 text-[14px] text-[#858585]">
              <li>Hepatitis B Vaccination 2nd Dose</li>
            </ul>
          </div>

          {appointment?.appointment?.adminStatus === "completed" && (
            <div className="flex space-x-4">
            {/* View Report Button */}
            <button
              onClick={() => navigate(`/medicalreportform/${appointment?.appointment?.id}`)}
              className="flex items-center text-white bg-black px-6 py-2 rounded-md border border-black"
            >
              <FaFileAlt className="mr-2" /> {/* React Icon for Document */}
              Edit Report
            </button>

            {/* Upload PDF Button */}
            <button
              onClick={openModal}
              className="flex items-center text-white bg-black px-6 py-2 rounded-md border border-black"
            >
              <FaUpload className="mr-2" /> {/* React Icon for Upload */}
              Upload PDF
            </button>

            {/* Physical Exam Button */}
            <button
 onClick={() => navigate('/physical-exam')}              className="flex items-center text-white bg-black px-6 py-2 rounded-md border border-black"
            >
              {/* <FaUpload className="mr-2" /> */}
Physical Exam            </button>
          </div>
          )}

        </div>
      </div>

      {/* PDF Upload Modal */}
      <PdfUploadModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default AppointmentCompleted;
