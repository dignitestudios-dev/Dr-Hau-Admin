import React, { useState, useEffect } from "react";
import { IoMdArrowBack, IoMdEye, IoMdTrash } from "react-icons/io";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../axios";

const MedicalDetail = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const location = useLocation();
  const appointmentData = location.state;
  console.log(appointmentData, "appointmentDataappointmentData");
  // Re-fetch users when currentPage changes

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
    <div className="w-full h-auto bg-white p-6 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h3 className="text-[24px] font-bold text-black">Medical History</h3>
        </div>
      </div>

      {/* Loader: Inline CSS Spinner */}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="text-left text-nowrap text-[14px] bg-[#F5F7F7] text-gray-500">
              <th className="py-2 px-4">Medical Problems</th>
              <th className="py-2 px-4">Allergies</th>
              <th className="py-2 px-4">Surgeries</th>
              <th className="py-2 px-4">Medications</th>
              <th className="py-2 px-4">Is Pregnant</th>
              <th className="py-2 px-4">Exercise Regularly </th>
              <th className="py-2 px-4">Is Healthy </th>
              <th className="py-2 px-4">Has TB </th>
              <th className="py-2 px-4">Uses Tobacco </th>
              <th className="py-2 px-4">Alcoholic </th>
              <th className="py-2 px-4">Is Bending </th>
              <th className="py-2 px-4">Is Lifting </th>
              <th className="py-2 px-4">Is Moving Hands </th>
              <th className="py-2 px-4">Vision Or Hearing Issues </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-[14px] text-gray-900 border-b border-gray-200">
              <td className="py-3 px-4">
                {appointmentData?.medicalHistory?.medicalProblems || "N/A"}
              </td>
              <td className="py-3 px-4">
                {appointmentData?.medicalHistory?.allergies || "N/A"}
              </td>
              <td className="py-3 px-4">
                {appointmentData?.medicalHistory?.surgeries || "N/A"}
              </td>
              <td className="py-3 px-4">
                {appointmentData?.medicalHistory?.medications || "N/A"}
              </td>
              <td className="py-3 px-4">
                {appointmentData?.medicalHistory?.isPregnant ? "Yes" : "No"}
              </td>
              <td className="py-3 px-4">
                {appointmentData?.medicalHistory?.isExercise ? "Yes" : "No"}
              </td>
              <td className="py-3 px-4">
                {appointmentData?.medicalHistory?.isHealthy ? "Yes" : "No"}
              </td>
              <td className="py-3 px-4">
                {appointmentData?.medicalHistory?.isTB ? "Yes" : "No"}
              </td>
              <td className="py-3 px-4">
                {appointmentData?.medicalHistory?.isTobacco ? "Yes" : "No"}
              </td>
              <td className="py-3 px-4">
                {appointmentData?.medicalHistory?.isAlcoholic ? "Yes" : "No"}
              </td>
              <td className="py-3 px-4">
                {appointmentData?.medicalHistory?.isBending ? "Yes" : "No"}
              </td>
              <td className="py-3 px-4">
                {appointmentData?.medicalHistory?.isLifting ? "Yes" : "No"}
              </td>
              <td className="py-3 px-4">
                {appointmentData?.medicalHistory?.isMovingHands ? "Yes" : "No"}
              </td>
              <td className="py-3 px-4">
                {appointmentData?.medicalHistory?.isVisionOrHearing
                  ? "Yes"
                  : "No"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalDetail;
