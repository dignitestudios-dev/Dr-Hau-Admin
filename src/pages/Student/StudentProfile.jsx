import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // for the eye toggle
import SSNModal from "../../components/Students/SSNModal";
import ReportModal from "../../components/Students/ReportModal";

const StudentProfile = () => {
  const navigate = useNavigate();

  const data = {
    name: "Olivia Mery",
    dob: "11-25-1996",
    ssn: "0044",
    email: "oliviamery@gmail.com",
    program: "Lorem Ipsum",
    vaccination: "Hepatitis B Vaccination",
    appointmentDate: "Jun 12, 2024",
    appointmentTime: "09:00 A.M - 02:00 P.M",
    appointmentHistory: [
      { date: "Jan 15, 2024", time: "10:00 A.M - 12:00 P.M", details: "Routine Checkup" },
      { date: "Apr 10, 2024", time: "11:00 A.M - 1:00 P.M", details: "Flu Shot" },
    ],
  };

  const [showSSN, setShowSSN] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [isSSNModalOpen, setIsSSNModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleSSNModalToggle = () => setIsSSNModalOpen(!isSSNModalOpen);
  const handleReportModalToggle = () => setIsReportModalOpen(!isReportModalOpen);

  const handleSSNSubmit = () => setShowSSN(true); 
  const handleReportSubmit = () => setShowReport(true); 

  return (
    <div className="w-full p-6 rounded-md shadow-md overflow-auto">
      <div className="flex items-center mb-4">
        <IoMdArrowBack onClick={() => navigate("/dashboard")} className="cursor-pointer text-[24px] text-gray-700 mr-2" />
        <h3 className="text-[24px] font-bold text-black">Student Profile</h3>
      </div>

      <div className="rounded-lg shadow-customShadow bg-white p-8">
        <div className="rounded-lg shadow-customShadow bg-gray-50 py-4 px-6 mb-6">
          <div className="grid grid-cols-1 mb-6">
            <p className="font-medium text-[20px] text-black">Personal Information</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
            <div>
              <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Name</p>
              <p className="text-[14px] text-[#181818]">{data?.name}</p>
            </div>
            <div className="w-[300px]">
              <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Date of Birth</p>
              <p className="text-[14px] text-[#181818]">{data?.dob}</p>
            </div>
            <div className="w-[300px]">
              <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Program Attended</p>
              <p className="text-[14px] text-[#181818]">{data?.program}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
            <div>
              <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Last 4 SSN</p>
              <div className="flex items-center">
                <p className="text-[14px] text-[#181818]">
                  {showSSN ? data.ssn : "*****"}
                </p>
                <button onClick={handleSSNModalToggle} className="ml-2 text-black">
                  {showSSN ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="w-[300px]">
              <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Email</p>
              <p className="text-[14px] text-[#181818]">{data?.email}</p>
            </div>
            <div className="w-[300px]">
              <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Report Details</p>
              <button
                onClick={handleReportModalToggle}
                className="text-blue-500 underline"
              >
                Click to view report
              </button>
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        {/* Appointments Section */}
{/* Appointments Section */}
{/* Appointments Section */}
<div className="rounded-lg shadow-customShadow bg-gray-50 py-4 px-6 mb-8">
  <div className="grid grid-cols-1 mb-6">
    <p className="font-semibold text-[20px] text-black">Appointment History</p>
  </div>
  {data.appointmentHistory.map((appointment, index) => (
    <div
      key={index}
      className={`bg-white rounded-lg shadow-md p-6 mb-6 transition-all duration-300 ${
        index % 2 === 0 ? "bg-gray-100" : "bg-white"
      } hover:scale-105 hover:shadow-xl`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="mb-2 sm:mb-0">
            <p className="text-[16px] text-[#181818] font-semibold">{appointment.date}</p>
            <p className="text-[14px] text-[#787F8C]">{appointment.time}</p>
          </div>
        </div>
        
        <div className="flex justify-end items-center space-x-4">
          <p className="text-[14px] text-[#181818] font-semibold">{appointment.details}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span
          className={`text-[12px] font-semibold rounded-full py-1 px-3 ${
            appointment.details.includes("Checkup") ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"
          }`}
        >
          {appointment.details.includes("Checkup") ? "Completed" : "Upcoming"}
        </span>

        <button className="text-blue-500 font-semibold hover:text-blue-600 transition-colors duration-300">
          View Details
        </button>
      </div>
    </div>
  ))}
</div>



      </div>

      {/* Modal for SSN */}
      <SSNModal
        isOpen={isSSNModalOpen}
        onClose={handleSSNModalToggle}
        onSubmit={handleSSNSubmit}
      />

      {/* Modal for Report */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={handleReportModalToggle}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
};

export default StudentProfile;
