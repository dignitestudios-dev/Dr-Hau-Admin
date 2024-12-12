import React, { useState, useEffect } from "react";
import { IoMdArrowBack, IoMdEye, IoMdTrash } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "../../axios"; // Import axios instance for API calls

const UsersTable = () => {
  const [users, setUsers] = useState([]); // Users state
  const [selectedSchool, setSelectedSchool] = useState(""); // School filter state
  const [selectedCampus, setSelectedCampus] = useState(""); // Campus filter state
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const navigate = useNavigate(); // For navigating to user profile

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/admin/users/all"); // Make the API call
        if (response.data.success) {
          setUsers(response.data.data); // Set the users data to state
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

    fetchUsers(); // Fetch users when the component mounts
  }, []); // Empty dependency array ensures the fetch is done only once

  // Filter functions
  const handleSchoolFilter = (event) => {
    setSelectedSchool(event.target.value);
  };

  const handleCampusFilter = (event) => {
    setSelectedCampus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle deleting a user
  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user._id !== id); // Filter out the deleted user
    setUsers(updatedUsers); // Update users state
  };

  // Navigate to user profile
  const handleViewProfile = (user) => {
    navigate(`/student-profile/${user._id}`); // Pass user ID as URL parameter
  };

  // Filter users based on search and selected filters
  const filteredUsers = users.filter((user) => {
    const matchesSchool = selectedSchool ? user.schoolName === selectedSchool : true;
    const matchesCampus = selectedCampus ? user.campus === selectedCampus : true;
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSchool && matchesCampus && matchesSearch;
  });

  return (
    <div className="w-full h-auto bg-white p-6 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h3 className="text-[24px] font-bold text-black">Users</h3>
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
            {/* Dynamically populate school options from users data */}
            {Array.from(new Set(users.map((user) => user.schoolName))).map((school, index) => (
              <option key={index} value={school}>
                {school}
              </option>
            ))}
          </select>
          {/* Dropdown to filter by campus */}
          <select
            value={selectedCampus}
            onChange={handleCampusFilter}
            className="p-2 border rounded-md bg-white text-gray-700"
          >
            <option value="">Select Campus</option>
            {/* Dynamically populate campus options from users data */}
            {Array.from(new Set(users.map((user) => user.campus))).map((campus, index) => (
              <option key={index} value={campus}>
                {campus}
              </option>
            ))}
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
              {/* <th className="py-2 px-4">ROLE</th> */}
              <th className="py-2 px-4">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="text-[14px] text-gray-900 border-b border-gray-200">
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={user.profilePicture || "https://i.pravatar.cc/40"} // Use profile picture or default avatar
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{`${user.firstName} ${user.lastName}`}</span>
                </td>
                <td className="py-3 px-4">{new Date(user.dob).toLocaleDateString()}</td>
                <td className="py-3 px-4">{user.schoolName || "N/A"}</td>
                <td className="py-3 px-4">{user.campus || "N/A"}</td>
                <td className="py-3 px-4">{user.programAttended || "N/A"}</td>
                {/* <td className="py-3 px-4">{user.role || "N/A"}</td> */}
                <td className="py-3 px-4 flex items-center gap-3">
                  <button
                    onClick={() => handleViewProfile(user)}
                    className="text-blue-500 hover:text-blue-700"
                    title="View Profile"
                  >
                    View Details
                  </button>
                  {/* <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Student"
                  >
                    <IoMdTrash size={20} />
                  </button> */}
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
