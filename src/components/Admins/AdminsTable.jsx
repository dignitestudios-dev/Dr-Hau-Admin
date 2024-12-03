import React, { useState } from "react";
import { IoMdArrowBack, IoMdEye, IoMdTrash } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const AdminsTable = () => {
  // Sample data with updated fields: admin name, program attended, campus, email, and school name
  const initialData = [
    { name: "Olivia Mery", program: "Bachelor of Arts", campus: "Harvard Yard", email: "olivia.mery@harvard.edu", school: "Harvard" },
    { name: "James Smith", program: "Bachelor of Science", campus: "Main Campus", email: "james.smith@mit.edu", school: "MIT" },
    { name: "Olivia Mery", program: "Bachelor of Science", campus: "Harvard Yard", email: "olivia.mery@harvard.edu", school: "Harvard" },
    { name: "Rose Sophia", program: "Bachelor of Arts", campus: "Main Quad", email: "rose.sophia@stanford.edu", school: "Stanford" },
    { name: "David Laid", program: "Bachelor of Business", campus: "Main Campus", email: "david.laid@mit.edu", school: "MIT" },
    { name: "James Smith", program: "Bachelor of Fine Arts", campus: "Harvard Yard", email: "james.smith@harvard.edu", school: "Harvard" },
    { name: "Olivia Mery", program: "Bachelor of Business", campus: "Main Quad", email: "olivia.mery@stanford.edu", school: "Stanford" },
    { name: "Rose Sophia", program: "Bachelor of Fine Arts", campus: "Main Campus", email: "rose.sophia@mit.edu", school: "MIT" },
    { name: "David Laid", program: "Bachelor of Arts", campus: "Main Quad", email: "david.laid@stanford.edu", school: "Stanford" },
    { name: "James Smith", program: "Bachelor of Fine Arts", campus: "Harvard Yard", email: "james.smith@harvard.edu", school: "Harvard" },
    { name: "Olivia Mery", program: "Bachelor of Science", campus: "Main Campus", email: "olivia.mery@mit.edu", school: "MIT" },
  ];

  const [Admins, setAdmins] = useState(initialData); // Admin data state
  const [selectedSchool, setSelectedSchool] = useState(""); // Selected school for filter
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const navigate = useNavigate();

  const handleSchoolFilter = (event) => {
    setSelectedSchool(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (index) => {
    const updatedAdmins = Admins.filter((_, i) => i !== index);
    setAdmins(updatedAdmins);
  };

  const handleViewProfile = (admin) => {
    navigate(`/admin-profile`);
  };

  const filteredAdmins = Admins.filter((admin) => {
    const matchesSchool = selectedSchool ? admin.school === selectedSchool : true;
    const matchesSearch = admin.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSchool && matchesSearch;
  });

  return (
    <div className="w-full h-auto bg-white p-6 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h3 className="text-[24px] font-bold text-black">Admins</h3>
        </div>
        <div className="flex items-center gap-4">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border rounded-md bg-white text-gray-700"
          />
          {/* Dropdown to filter by school */}
          <select
            value={selectedSchool}
            onChange={handleSchoolFilter}
            className="p-2 border rounded-md bg-white text-gray-700"
          >
            <option value="">Select School</option>
            <option value="Harvard">Harvard</option>
            <option value="MIT">MIT</option>
            <option value="Stanford">Stanford</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="text-left text-[14px] bg-[#F5F7F7] text-gray-500">
              <th className="py-2 px-4">ADMIN NAME</th>
              <th className="py-2 px-4">EMAIL</th>
              <th className="py-2 px-4">PROGRAM ATTENDED</th>
              <th className="py-2 px-4">CAMPUS</th>
              <th className="py-2 px-4">SCHOOL NAME</th>
              <th className="py-2 px-4">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((admin, index) => (
              <tr key={index} className="text-[14px] text-gray-900 border-b border-gray-200">
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/40?img=${index + 1}`}
                    alt={admin.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{admin.name}</span>
                </td>
                <td className="py-3 px-4">{admin.email}</td>
                <td className="py-3 px-4">{admin.program}</td>
                <td className="py-3 px-4">{admin.campus}</td>
                <td className="py-3 px-4">{admin.school}</td>
                <td className="py-3 px-4 flex items-center gap-3">
                  <button
                    onClick={() => handleViewProfile(admin)}
                    className="text-blue-500 hover:text-blue-700"
                    title="View Profile"
                  >
                    <IoMdEye size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Admin"
                  >
                    <IoMdTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminsTable;
