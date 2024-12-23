import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../axios";

const MedicalDetail = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  
  const location = useLocation();
  const appointmentData = location.state;
  

  console.log(appointmentData, "appointmentData");

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full h-auto bg-gray-100 p-10 overflow-auto">
      <div className="bg-white shadow-lg rounded-lg p-8 space-y-8">
        {/* Profile Section */}
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={appointmentData?.user?.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              {appointmentData?.user?.firstName} {appointmentData.user?.lastName}
            </h3>
            <p className="text-lg text-gray-600">{appointmentData.user?.email || "N/A"}</p>
            <p className="text-lg text-gray-600">
              School: {appointmentData?.user?.schoolName || "N/A"} ({appointmentData?.user?.campus || "N/A"})
            </p>
            <p className="text-lg text-gray-600">Program: {appointmentData.user?.programAttended || "N/A"}</p>
            <p className="text-lg text-gray-600">Gender: {appointmentData?.user?.gender || "N/A"}</p>
            <p className="text-lg text-gray-600">Date of Birth: {appointmentData?.user?.dob ? new Date(appointmentData?.user?.dob).toLocaleDateString() : "N/A"}</p>
          </div>
        </div>

        {/* Medical Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Medical Problems */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Medical Problems</label>
            <p className="text-lg text-gray-600">{appointmentData?.medicalHistory?.medicalProblems || "N/A"}</p>
          </div>

          {/* Allergies */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Allergies</label>
            <p className="text-lg text-gray-600">{appointmentData?.medicalHistory?.allergies || "N/A"}</p>
          </div>

          {/* Surgeries */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Surgeries</label>
            <p className="text-lg text-gray-600">{appointmentData?.medicalHistory?.surgeries || "N/A"}</p>
          </div>

          {/* Medications */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Medications</label>
            <p className="text-lg text-gray-600">{appointmentData?.medicalHistory?.medications || "N/A"}</p>
          </div>

          {/* Pregnancy Status */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Is Pregnant</label>
            <p className="text-lg text-gray-600">{appointmentData?.medicalHistory?.isPregnant ? "Yes" : "No"}</p>
          </div>

          {/* Exercise Regularly */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Exercise Regularly</label>
            <p className="text-lg text-gray-600">{appointmentData?.medicalHistory?.isExercise ? "Yes" : "No"}</p>
          </div>

          {/* Is Healthy */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Is Healthy</label>
            <p className="text-lg text-gray-600">{appointmentData?.medicalHistory?.isHealthy ? "Yes" : "No"}</p>
          </div>

          {/* Has TB */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Has TB</label>
            <p className="text-lg text-gray-600">{appointmentData?.medicalHistory?.isTB ? "Yes" : "No"}</p>
          </div>

          {/* Uses Tobacco */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Uses Tobacco</label>
            <p className="text-lg text-gray-600">{appointmentData?.medicalHistory?.isTobacco ? "Yes" : "No"}</p>
          </div>

          {/* Alcoholic */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Alcoholic</label>
            <p className="text-lg text-gray-600">{appointmentData?.medicalHistory?.isAlcoholic ? "Yes" : "No"}</p>
          </div>

          {/* Is Bending */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Is Bending</label>
            <p className="text-lg text-gray-600">{appointmentData?.medicalHistory?.isBending ? "Yes" : "No"}</p>
          </div>

          {/* Is Lifting */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Is Lifting</label>
            <p className="text-lg text-gray-600">{appointmentData?.medicalHistory?.isLifting ? "Yes" : "No"}</p>
          </div>

          {/* Is Moving Hands */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Is Moving Hands</label>
            <p className="text-lg text-gray-600">{appointmentData?.medicalHistory?.isMovingHands ? "Yes" : "No"}</p>
          </div>

          {/* Vision or Hearing Issues */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Vision or Hearing Issues</label>
            <p className="text-lg text-gray-600">{appointmentData?.medicalHistory?.isVisionOrHearing ? "Yes" : "No"}</p>
          </div>
        </div>

        {/* Pagination Controls */}
        {/* <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePreviousPage}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          >
            <MdChevronLeft size={20} />
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          >
            Next
            <MdChevronRight size={20} />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default MedicalDetail;
