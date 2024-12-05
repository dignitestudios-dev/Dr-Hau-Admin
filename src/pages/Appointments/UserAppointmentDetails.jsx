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
          className="text-black flex items-center transition-colors hover:text-gray-700"
        >
          <IoMdArrowBack className="text-2xl" />
        </button>
        <h3 className="text-3xl font-semibold text-black ml-2">User Appointment</h3>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-8 space-y-8">
        <div className="flex items-center space-x-6 border-b pb-6">
          <img
            src="https://i.pravatar.cc/?img=8"
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500"
          />
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-gray-800">{data?.name}</p>
            <p className="text-sm text-gray-500">{data?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: "Date of Birth", value: "12/4/1998" },
            { label: "School Name", value: data?.school },
            { label: "Program", value: data?.program },
            { label: "Campus", value: data?.campus },
            { label: "Email", value: data?.email },
          ].map((item, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <p className="text-xs font-semibold text-gray-500">{item.label}</p>
              <p className="text-sm text-gray-700">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 mt-8 space-y-4">
          <h4 className="text-xl font-semibold text-gray-800">Consent Documents</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rabies Vaccination", link: "/path/to/vaccination-certificate.pdf" },
              { name: "FLU Vaccination", link: "/path/to/vaccination-schedule.pdf" },
              { name: "MMR Vaccination", link: "/path/to/vaccination-instructions.pdf" },
            ].map((doc, index) => (
              <div key={index} className="flex flex-col items-center bg-gray-50 p-6 rounded-xl shadow-lg">
                <AiOutlineFilePdf className="text-red-500 text-5xl mb-4" />
                <p className="text-sm text-gray-700">{doc.name}</p>
                <a
                  href={doc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-xs mt-2 hover:text-blue-700 transition-all duration-300"
                >
                  View PDF
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={() => alert("Appointment Approved")}
            className="bg-green-500 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-xl transition-transform transform hover:scale-105"
          >
            Approve
          </button>
          <button
            onClick={() => navigate("/consent-form")}
            className="bg-black text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-xl transition-transform transform hover:scale-105"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAppointmentDetails;
