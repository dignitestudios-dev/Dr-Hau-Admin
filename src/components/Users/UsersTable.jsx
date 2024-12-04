import React, { useState } from "react";
import { IoMdArrowBack, IoMdEye, IoMdTrash } from "react-icons/io"; // Imported IoMdEye icon
import { useNavigate } from "react-router-dom";

const UsersTable = () => {
  // Sample data with a role field for user roles (student or admin)
  const initialData = [
    { name: "Olivia Mery", dob: "11-25-1996", program: "Bachelor of Arts", role: "Student", school: "Harvard", campus: "North" },
    { name: "James Smith", dob: "06-01-1994", program: "Bachelor of Science", role: "Admin", school: "MIT", campus: "South" },
    { name: "Olivia Mery", dob: "07-19-1996", program: "Bachelor of Science", role: "Student", school: "Harvard", campus: "South" },
    { name: "Rose Sophia", dob: "08-02-1993", program: "Bachelor of Arts", role: "Admin", school: "Stanford", campus: "East" },
    { name: "David Laid", dob: "09-01-1995", program: "Bachelor of Business", role: "Student", school: "MIT", campus: "North" },
    { name: "James Smith", dob: "03-29-1997", program: "Bachelor of Fine Arts", role: "Admin", school: "Harvard", campus: "East" },
    { name: "Olivia Mery", dob: "08-11-1999", program: "Bachelor of Business", role: "Student", school: "Stanford", campus: "North" },
    { name: "Rose Sophia", dob: "12-01-1993", program: "Bachelor of Fine Arts", role: "Admin", school: "MIT", campus: "West" },
    { name: "David Laid", dob: "10-25-1996", program: "Bachelor of Arts", role: "Student", school: "Stanford", campus: "East" },
    { name: "James Smith", dob: "05-10-1998", program: "Bachelor of Fine Arts", role: "Admin", school: "Harvard", campus: "North" },
    { name: "Olivia Mery", dob: "01-19-1998", program: "Bachelor of Science", role: "Student", school: "MIT", campus: "South" },
  ];

  const [Users, setUsers] = useState(initialData);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

  const handleSchoolFilter = (event) => {
    setSelectedSchool(event.target.value);
  };

  const handleCampusFilter = (event) => {
    setSelectedCampus(event.target.value);
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

  // Sorting function that sorts by school and then by campus
  const sortUsers = (users) => {
    return users.sort((a, b) => {
      if (a.school < b.school) return -1;
      if (a.school > b.school) return 1;

      // If schools are the same, sort by campus
      if (a.campus < b.campus) return -1;
      if (a.campus > b.campus) return 1;
      return 0;
    });
  };

  const filteredUsers = Users.filter((student) => {
    const matchesSchool = selectedSchool ? student.school === selectedSchool : true;
    const matchesCampus = selectedCampus ? student.campus === selectedCampus : true;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSchool && matchesCampus && matchesSearch;
  });

  const sortedFilteredUsers = sortUsers(filteredUsers);

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
          <select
            value={selectedCampus}
            onChange={handleCampusFilter}
            className="p-2 border rounded-md bg-white text-gray-700"
          >
            <option value="">Select Campus</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="text-left text-[14px] bg-[#F5F7F7] text-gray-500">
              <th className="py-2 px-4">STUDENT</th>
              <th className="py-2 px-4">DATE OF BIRTH</th>
              <th className="py-2 px-4">SCHOOL</th>
              <th className="py-2 px-4">CAMPUS</th>
              <th className="py-2 px-4">PROGRAM</th>
              <th className="py-2 px-4">ROLE</th>
              <th className="py-2 px-4">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {sortedFilteredUsers.map((student, index) => (
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
                <td className="py-3 px-4">{student.school}</td>
                <td className="py-3 px-4">{student.campus}</td>
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
