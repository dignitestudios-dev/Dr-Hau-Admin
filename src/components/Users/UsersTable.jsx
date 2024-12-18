import React, { useState, useEffect } from "react";
import { IoMdArrowBack, IoMdEye, IoMdTrash } from "react-icons/io";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "../../axios"; 

const UsersTable = () => {
  const [users, setUsers] = useState([]); 
  const [selectedSchool, setSelectedSchool] = useState(""); 
  const [selectedCampus, setSelectedCampus] = useState(""); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [loading, setLoading] = useState(true); // Track loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const response = await axios.get(`/admin/users/all?page=${currentPage}&limit=10`); 
      if (response?.data?.success) {
        setUsers(response?.data?.data); 
        setTotalPages(response?.data?.totalPages); // Assuming API returns totalPages
      } else {
        console.error("Failed to fetch users:", response?.data?.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      if (error.response) {
        console.error("Response error:", error?.response?.status, error?.response?.data);
      } else {
        console.error("Unknown error:", error?.message);
      }
    } finally {
      setLoading(false); // Set loading to false when data is loaded
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]); // Re-fetch users when currentPage changes

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
    const updatedUsers = users.filter((user) => user._id !== id); 
    setUsers(updatedUsers); 
  };

  const handleViewProfile = (user) => {
    navigate(`/student-profile/${user._id}`); 
  };

  const filteredUsers = users.filter((user) => {
    const matchesSchool = selectedSchool ? user.schoolName === selectedSchool : true;
    const matchesCampus = selectedCampus ? user.campus === selectedCampus : true;
    const matchesSearch =
      user?.firstName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      user?.lastName?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesSchool && matchesCampus && matchesSearch;
  });

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full h-auto bg-white p-6 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h3 className="text-[24px] font-bold text-black">Users</h3>
        </div>
      </div>

      {/* Loader: Inline CSS Spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="text-left text-[14px] bg-[#F5F7F7] text-gray-500">
                <th className="py-2 px-4">STUDENT</th>
                <th className="py-2 px-4">DATE OF BIRTH</th>
                <th className="py-2 px-4">SCHOOL</th>
                <th className="py-2 px-4">CAMPUS</th>
                <th className="py-2 px-4">PROGRAM</th>
                <th className="py-2 px-4">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="text-[14px] text-gray-900 border-b border-gray-200">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={user?.profilePicture || "https://i.pravatar.cc/40"} 
                      alt={`${user?.firstName} ${user?.lastName}`}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{`${user?.firstName} ${user?.lastName}`}</span>
                  </td>
                  <td className="py-3 px-4">{new Date(user?.dob).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{user?.schoolName || "N/A"}</td>
                  <td className="py-3 px-4">{user?.campus || "N/A"}</td>
                  <td className="py-3 px-4">{user?.programAttended || "N/A"}</td>
                  <td className="py-3 px-4 flex items-center gap-3">
                    <button
                      onClick={() => handleViewProfile(user)}
                      className="text-blue-500 hover:text-blue-700 mb-3"
                      title="View Details"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={handlePreviousPage} 
          disabled={currentPage === 1} 
          className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 bg-blue-500 text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          <MdChevronLeft className="mr-2" /> Previous
        </button>

        <span className="text-gray-500">Page {currentPage} of {totalPages}</span>

        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages} 
          className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 bg-blue-500 text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          Next <MdChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default UsersTable;
