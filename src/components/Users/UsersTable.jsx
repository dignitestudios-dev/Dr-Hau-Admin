import React, { useState, useEffect } from "react";
import { IoMdArrowBack, IoMdEye, IoMdTrash } from "react-icons/io"; // Imported IoMdEye icon
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/user/all"); 
        if (response.data.success) {
          setUsers(response.data.data);
        } else {
          console.error("Failed to fetch users:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        if (error.response) {
          console.error("Response error:", error.response.status, error.response.data);
        } else {
          console.error("Unknown error:", error.message);
        }
      }
    };
  
    fetchUsers();
  }, []);
  

  const handleSchoolFilter = (event) => {
    setSelectedSchool(event.target.value);
  };

  const handleCampusFilter = (event) => {
    setSelectedCampus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleViewProfile = (user) => {
    navigate(`/student-profile`);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSchool = selectedSchool ? user.school === selectedSchool : true;
    const matchesCampus = selectedCampus ? user.campus === selectedCampus : true;
    const matchesSearch = user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || user.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSchool && matchesCampus && matchesSearch;
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
            {filteredUsers.map((user, index) => (
              <tr key={user._id} className="text-[14px] text-gray-900 border-b border-gray-200">
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={user.profilePicture || "https://i.pravatar.cc/40"}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{`${user.firstName} ${user.lastName}`}</span>
                </td>
                <td className="py-3 px-4">{new Date(user.patientDateofBirth).toLocaleDateString()}</td>
                <td className="py-3 px-4">{user.school || "N/A"}</td>
                <td className="py-3 px-4">{user.campus || "N/A"}</td>
                <td className="py-3 px-4">{user.program || "N/A"}</td>
                <td className="py-3 px-4">{user.role || "N/A"}</td>
                <td className="py-3 px-4 flex items-center gap-3">
                  <button
                    onClick={() => handleViewProfile(user)}
                    className="text-blue-500 hover:text-blue-700"
                    title="View Profile"
                  >
                    <IoMdEye size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
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
