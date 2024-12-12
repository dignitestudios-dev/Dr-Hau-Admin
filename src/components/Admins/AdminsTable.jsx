import React, { useState, useEffect } from "react";
import { IoMdArrowBack, IoMdEye, IoMdTrash } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "../../axios"; // Import axios instance for API calls

const AdminsTable = () => {
  const [Admins, setAdmins] = useState([]); // Admin data state
  const [selectedSchool, setSelectedSchool] = useState(""); // Selected school for filter
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

  // Fetch admins from the API
  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true); // Set loading to true before making the request
      try {
        const response = await axios.get("/admin/school"); // Make the API call
        if (response.data.success) {
          setAdmins(response.data.data); // Update admins data with the API response
        } else {
          setError("Failed to fetch admin data.");
        }
      } catch (error) {
        setError("Error fetching data from the API.");
      } finally {
        setLoading(false); // Set loading to false after the request is complete
      }
    };

    fetchAdmins(); // Call the function to fetch admins data
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleSchoolFilter = (event) => {
    setSelectedSchool(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (id) => {
    const updatedAdmins = Admins.filter((admin) => admin.id !== id);
    setAdmins(updatedAdmins);
  };

  const handleViewProfile = (admin) => {
    navigate(`/admin-profile/${admin.id}`); // Pass the admin ID in the route
  };
  

  const filteredAdmins = Admins.filter((admin) => {
    const matchesSchool = selectedSchool ? admin.schoolName === selectedSchool : true;
    const matchesSearch = admin.adminName.toLowerCase().includes(searchQuery.toLowerCase());
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
            {/* Dynamically populate school options based on the admins data */}
            {Admins.map((admin, index) => (
              <option key={index} value={admin.schoolName}>
                {admin.schoolName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display loading message or error */}
      {loading && <p className="text-black">Loading admins...</p>}
      {error && <p className="text-red-500">{error}</p>}

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
                    src={admin.profilePicture || "https://i.pravatar.cc/40?img=1"} // Use profile picture if available
                    alt={admin.adminName}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{admin.adminName}</span>
                </td>
                <td className="py-3 px-4">{admin.email}</td>
                <td className="py-3 px-4">{admin.programDep}</td>
                <td className="py-3 px-4">{admin.campus}</td>
                <td className="py-3 px-4">{admin.schoolName}</td>
                <td className="py-3 px-4 flex items-center gap-3">
                  <button
                    onClick={() => handleViewProfile(admin)}
                    className="text-blue-500 hover:text-blue-700"
                    title="View Profile"
                  >
                   View Details
                  </button>
                  {/* <button
                    onClick={() => handleDelete(admin.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Admin"
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

export default AdminsTable;
