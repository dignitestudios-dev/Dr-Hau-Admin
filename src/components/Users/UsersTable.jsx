import React, { useState } from "react";
import { IoMdArrowBack, IoMdEye, IoMdTrash } from "react-icons/io"; // Imported IoMdEye icon
import { useNavigate } from "react-router-dom";

const UsersTable = () => {
  // Sample data with a role field for user roles (student or admin)
  const initialData = [
    { name: "Olivia Mery", dob: "11-25-1996", address: "House no. 42, Street 7, United States...", program: "Bachelor of Arts", role: "Student", school: "Harvard" },
    { name: "James Smith", dob: "06-01-1994", address: "House no. 42, Street 7, United States...", program: "Bachelor of Science", role: "Admin", school: "MIT" },
    { name: "Olivia Mery", dob: "07-19-1996", address: "House no. 42, Street 7, United States...", program: "Bachelor of Science", role: "Student", school: "Harvard" },
    { name: "Rose Sophia", dob: "08-02-1993", address: "House no. 42, Street 7, United States...", program: "Bachelor of Arts", role: "Admin", school: "Stanford" },
    { name: "David Laid", dob: "09-01-1995", address: "House no. 42, Street 7, United States...", program: "Bachelor of Business", role: "Student", school: "MIT" },
    { name: "James Smith", dob: "03-29-1997", address: "House no. 42, Street 7, United States...", program: "Bachelor of Fine Arts", role: "Admin", school: "Harvard" },
    { name: "Olivia Mery", dob: "08-11-1999", address: "House no. 42, Street 7, United States...", program: "Bachelor of Business", role: "Student", school: "Stanford" },
    { name: "Rose Sophia", dob: "12-01-1993", address: "House no. 42, Street 7, United States...", program: "Bachelor of Fine Arts", role: "Admin", school: "MIT" },
    { name: "David Laid", dob: "10-25-1996", address: "House no. 42, Street 7, United States...", program: "Bachelor of Arts", role: "Student", school: "Stanford" },
    { name: "James Smith", dob: "05-10-1998", address: "House no. 42, Street 7, United States...", program: "Bachelor of Fine Arts", role: "Admin", school: "Harvard" },
    { name: "Olivia Mery", dob: "01-19-1998", address: "House no. 42, Street 7, United States...", program: "Bachelor of Science", role: "Student", school: "MIT" },
  ];

  const [Users, setUsers] = useState(initialData);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

  const handleSchoolFilter = (event) => {
    setSelectedSchool(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (index) => {
    const updatedUsers = Users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const handleViewProfile = (student) => {
    navigate(`/student-profile`); 
  };

  const filteredUsers = Users.filter((student) => {
    const matchesSchool = selectedSchool ? student.school === selectedSchool : true;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSchool && matchesSearch;
  });

  return (
    <div className="w-full h-auto bg-white p-6 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h3 className="text-[24px] font-bold text-black">Users</h3>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border rounded-md bg-white text-gray-700"
          />
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
              <th className="py-2 px-4">STUDENT</th>
              <th className="py-2 px-4">DATE OF BIRTH</th>
              <th className="py-2 px-4">ADDRESS</th>
              <th className="py-2 px-4">PROGRAM</th>
              <th className="py-2 px-4">ROLE</th>
              <th className="py-2 px-4">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((student, index) => (
              <tr key={index} className="text-[14px] text-gray-900 border-b border-gray-200">
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/40?img=${index + 1}`}
                    alt={student.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{student.name}</span>
                </td>
                <td className="py-3 px-4">{student.dob}</td>
                <td className="py-3 px-4">{student.address}</td>
                <td className="py-3 px-4">{student.program}</td>
                <td className="py-3 px-4">{student.role}</td> 
                <td className="py-3 px-4 flex items-center gap-3">
                  <button
                    onClick={() => handleViewProfile(student)}
                    className="text-blue-500 hover:text-blue-700"
                    title="View Profile"
                  >
                    <IoMdEye size={20} /> 
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Student"
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

export default UsersTable;
