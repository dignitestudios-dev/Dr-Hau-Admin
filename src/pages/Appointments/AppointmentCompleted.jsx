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
  };

  
  const hasPhysicalExamDetails = appointment?.appointment?.physicalExam;

  return (
    <div className="w-full h-auto p-6 bg-gray-100 overflow-auto">
      <div className="flex items-center mb-6">
        <h3 className="text-[24px] font-bold text-black">Appointment Detail</h3>
      </div>

      <div className="bg-white shadow-md rounded-md p-6">
        <div>
          <h4 className="text-[20px] font-bold text-black mb-4">
          {appointment?.event?.title} <span className="bg-green-500 text-white px-3 py-2 text-[12px] rounded-full">{appointment?.appointment?.adminStatus}</span>
          </h4>
          <p className="text-[14px] text-gray-600 mb-4">
          {appointment?.event?.description}          </p>

          <div className="flex items-center text-[14px] text-gray-700 mb-2">
            <span className="mr-2">🕒</span> {appointment?.appointment?.date && new Date(appointment?.appointment?.date).toLocaleDateString('en-US', {
  weekday: 'long', // 'short' will give abbreviated weekday names like 'Mon'
  year: 'numeric',
  month: 'long',  // 'short' will give abbreviated months like 'Jan'
  day: 'numeric',
})}
          </div>
          {/* <div className="flex items-center text-[14px] text-gray-700 mb-4">
            <span className="mr-3">📅</span> June 12, 2024
          </div> */}

          <div className="mb-4 mt-4">
            <strong className="text-black">Vaccinations:</strong>
            <ul className="">
  {appointment?.appointment?.vaccinations?.map((vaccination, index) => (
    <li key={index} className=" text-gray-600 text-[15px]">
      {vaccination}
    </li>
  ))}
</ul>
          </div>

          {appointment?.appointment?.adminStatus === "completed" && (
            <div className="flex space-x-4">
            <button
              onClick={() => navigate(`/medicalreportform/${appointment?.appointment?.id}`, { state: { appointment: appointment?.appointment?.report } })}
              className="flex items-center text-white bg-black px-6 py-2 rounded-md border border-black"
            >
              <FaFileAlt className="mr-2" /> 
              Medical Report
            </button>

            <button
              onClick={openModal}
              className="flex items-center text-white bg-black px-6 py-2 rounded-md border border-black"
            >
              <FaUpload className="mr-2" />
              Upload PDF
            </button>

{/* Conditionally render the Physical Exam button */}
{/* Disable the Physical Exam button and change color to gray if physical exam details are present */}
<button
                onClick={() => navigate(`/physical-exam/${appointment?.appointment?.id}`)}
                disabled={hasPhysicalExamDetails} // Disable the button if physical exam details exist
                className={`flex items-center text-white px-6 py-2 rounded-md  ${hasPhysicalExamDetails ? 'bg-gray-500 cursor-not-allowed' : 'bg-black'}`}
              >
                Physical Exam
              </button>
            </div>
          )}

        </div>
      </div>

      <PdfUploadModal
      id={appointment?.appointment?.id}
      report={appointment?.appointment?.report}
        isOpen={isModalOpen}
        onClose={closeModal}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default AppointmentCompleted;
