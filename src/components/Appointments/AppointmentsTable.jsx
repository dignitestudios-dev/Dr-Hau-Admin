import React, { useState } from "react";
import { IoMdArrowBack, IoMdAdd, IoMdEye } from "react-icons/io"; 
import { useNavigate } from "react-router-dom";
import { IoMdTrash } from "react-icons/io";

import UserListModal from "./UserListModal";

const AppointmentsTable = () => {
  const data = [
    { name: "Olivia Mery", dob: "11-25-1996", address: "House no. 42, Street 7, United States...", program: "Bachelor of Arts", status: "Scheduled" },
    { name: "James Smith", dob: "06-01-1994", address: "House no. 42, Street 7, United States...", program: "Bachelor of Science", status: "Scheduled" },
    { name: "Olivia Mery", dob: "07-19-1996", address: "House no. 42, Street 7, United States...", program: "Bachelor of Science", status: "Scheduled" },
    { name: "Rose Sophia", dob: "08-02-1993", address: "House no. 42, Street 7, United States...", program: "Bachelor of Arts", status: "Not Confirmed" },
    { name: "David Laid", dob: "09-01-1995", address: "House no. 42, Street 7, United States...", program: "Bachelor of Business", status: "Not Confirmed" },
    { name: "James Smith", dob: "03-29-1997", address: "House no. 42, Street 7, United States...", program: "Bachelor of Fine Arts", status: "Scheduled" },
    { name: "Olivia Mery", dob: "08-11-1999", address: "House no. 42, Street 7, United States...", program: "Bachelor of Business", status: "Scheduled" },
    { name: "Rose Sophia", dob: "12-01-1993", address: "House no. 42, Street 7, United States...", program: "Bachelor of Fine Arts", status: "Scheduled" },
    { name: "David Laid", dob: "10-25-1996", address: "House no. 42, Street 7, United States...", program: "Bachelor of Arts", status: "Scheduled" },
    { name: "James Smith", dob: "05-10-1998", address: "House no. 42, Street 7, United States...", program: "Bachelor of Fine Arts", status: "Not Confirmed" },
    { name: "Olivia Mery", dob: "01-19-1998", address: "House no. 42, Street 7, United States...", program: "Bachelor of Science", status: "Scheduled" },
  ];

  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedUsers, setSelectedUsers] = useState(data); // Users to display in the modal
  const navigate = useNavigate();

  const toggleModal = () => {
    setShowModal(!showModal); // Toggle modal visibility
  };

  const handleDelete = (index) => {
    const updatedUsers = selectedUsers.filter((_, i) => i !== index);
    setSelectedUsers(updatedUsers);
  };

  // Navigate to the event details page
  const handleViewDetails = (appointment) => {
    navigate(`/event-details`, { state: { appointment } }); // Pass the appointment data if needed
  };

  return (
    <div className="w-full h-auto bg-white p-6 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <IoMdArrowBack onClick={() => navigate("/dashboard")} className="text-[24px] text-gray-700 mr-2" />
          <h3 className="text-[24px] font-bold text-black">Appointment List</h3>
        </div>
        {/* Walk In Button */}
        <button
          onClick={toggleModal}
          className="flex items-center bg-black text-white p-2 rounded-md cursor-pointer"
        >
          <IoMdAdd size={20} className="mr-2" />
          Walk In
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="text-left text-[14px] bg-[#F5F7F7] text-gray-500">
              <th className="py-2 px-4">STUDENT</th>
              <th className="py-2 px-4">DATE OF BIRTH</th>
              <th className="py-2 px-4">ADDRESS</th>
              <th className="py-2 px-4">PROGRAM</th>
              <th className="py-2 px-4">STATUS</th>
              <th className="py-2 px-4">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {data.map((appointment, index) => (
              <tr key={index} className="text-[14px] text-gray-900 border-b border-gray-200">
                <td className="py-3 px-4">{appointment.name}</td>
                <td className="py-3 px-4">{appointment.dob}</td>
                <td className="py-3 px-4">{appointment.address}</td>
                <td className="py-3 px-4">{appointment.program}</td>
                <td className={`py-3 px-4 ${appointment.status === "Scheduled" ? "text-blue-500" : "text-red-500"}`}>
                  {appointment.status}
                </td>
                <td className="py-3 px-4">
                  {/* Eye icon to view details */}
                  <button onClick={() => handleViewDetails(appointment)} className="text-blue-500 mr-2">
                    <IoMdEye size={20} />
                  </button>
                  {/* Delete icon */}
                  <button onClick={() => handleDelete(index)} className="text-red-500">
                    <IoMdTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal component */}
      <UserListModal
        isVisible={showModal}
        onClose={toggleModal}
        users={selectedUsers}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AppointmentsTable;
