import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineFilePdf } from "react-icons/ai"; 
import { useNavigate } from "react-router-dom";

const UserAppointmentDetails = () => {
  const navigate = useNavigate();

  const data = {
    name: "John Snow",
    school: "Lorem Ipsum",
    campus: "Lorem Ipsum",
    email: "johnsnow@gmail.com",
    program: "Lorem Ipsum",
    vaccination: "Hepatitis B Vaccination",
    appointmentDate: "Jun 12, 2024",
    appointmentTime: "09:00 A.M - 02:00 P.M",
  };

  return (
    <div className="w-full p-6 bg-gray-100 h-auto overflow-auto mt-1">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-black flex items-center transition-colors"
        >
          <IoMdArrowBack className="text-2xl" />
        </button>
        <h3 className="text-3xl font-semibold text-black ml-2">User Appointment</h3>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 space-y-8">
        <div className="flex items-center space-x-6 border-b pb-6">
          <img
            src="https://i.pravatar.cc/?img=8"
            alt="profile"
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
          />
          <div className="flex flex-col">
            <p className="text-xl font-semibold text-gray-800">{data?.name}</p>
            <p className="text-sm text-gray-500">{data?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-gray-500">Date of Birth</p>
            <p className="text-sm text-gray-700">12/4/1998</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-gray-500">School Name</p>
            <p className="text-sm text-gray-700">{data?.school}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-gray-500">Program</p>
            <p className="text-sm text-gray-700">{data?.program}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-gray-500">Campus</p>
            <p className="text-sm text-gray-700">{data?.campus}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-gray-500">Email</p>
            <p className="text-sm text-gray-700">{data?.email}</p>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6 mt-8 space-y-4">
          <h4 className="text-xl font-semibold text-gray-800">Consent Documents</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center bg-gray-50 p-4 rounded-md shadow-sm">
              <AiOutlineFilePdf className="text-red-500 text-4xl mb-3" />
              <p className="text-sm text-gray-700">Rabies Vaccination</p>
              <a
                href="/path/to/vaccination-certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-xs mt-2"
              >
                View PDF
              </a>
            </div>

            <div className="flex flex-col items-center bg-gray-50 p-4 rounded-md shadow-sm">
              <AiOutlineFilePdf className="text-red-500 text-4xl mb-3" />
              <p className="text-sm text-gray-700">FLU Vaccination</p>
              <a
                href="/path/to/vaccination-schedule.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-xs mt-2"
              >
                View PDF
              </a>
            </div>

            <div className="flex flex-col items-center bg-gray-50 p-4 rounded-md shadow-sm">
              <AiOutlineFilePdf className="text-red-500 text-4xl mb-3" />
              <p className="text-sm text-gray-700">MMR Vaccination</p>
              <a
                href="/path/to/vaccination-instructions.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-xs mt-2"
              >
                View PDF
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={() => alert("Appointment Approved")}
            className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-lg"
          >
            Approve
          </button>
          <button
            onClick={() => alert("Appointment Rejected")}
            className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-lg"
          >
            Reject
          </button>
          <button
            onClick={() => navigate("/consent-form")}
            className="bg-black text-white px-4 py-2 rounded-md text-sm font-semibold shadow-lg"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAppointmentDetails;
