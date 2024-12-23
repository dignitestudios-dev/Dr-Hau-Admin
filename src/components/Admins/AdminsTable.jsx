import React, { useState, useEffect } from "react";
import { IoMdEye, IoMdTrash } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "../../axios"; // Import axios instance for API calls
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { ToasterContainer, SuccessToast, ErrorToast } from "../Global/Toaster"; // Import the toast functions

const AdminsTable = () => {
  const [Admins, setAdmins] = useState([]); // Admin data state
  const [selectedSchool, setSelectedSchool] = useState(""); // Selected school for filter
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(0); // Total pages state
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to manage modal visibility
  const [adminToDelete, setAdminToDelete] = useState(null); // Admin to delete
  const [deleting, setDeleting] = useState(false); // State for deletion loading
  const navigate = useNavigate();

  // Fetch admins from the API with pagination and search query
  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true); // Set loading to true before making the request
      try {
        const response = await axios.post(`/admin/schools?page=${currentPage}&limit=10`, {
          schoolName: selectedSchool || null,
          search: searchQuery || null // Send search query if available
        }); // API call with pagination and search
        if (response?.data?.success) {
          setAdmins(response?.data?.data); // Update admins data with the API response
          setTotalPages(response?.data?.totalPages); // Assuming API returns totalPages
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
  }, [currentPage, searchQuery, selectedSchool]); // Re-fetch when currentPage, searchQuery, or selectedSchool changes

  const handleSchoolFilter = (event) => {
    setSelectedSchool(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = async () => {
    setDeleting(true); // Set deleting state to true to show loading on the button
    try {
      // API call to delete the admin
      const response = await axios.post(`/admin/school/delete/${adminToDelete.id}`);
      if (response.data.success) {
        // Remove deleted admin from the state
        setAdmins(Admins.filter((admin) => admin.id !== adminToDelete.id));
        setShowDeleteModal(false); // Close the modal after deletion
        SuccessToast("Admin deleted successfully!"); // Show success toaster
      } else {
        setError("Failed to delete the admin.");
        ErrorToast("Failed to delete the admin."); // Show error toaster
      }
    } catch (error) {
      setError("Error deleting admin.");
      ErrorToast("Error deleting admin."); // Show error toaster
    } finally {
      setDeleting(false); // Reset deleting state to false after the operation
    }
  };

  const handleViewProfile = (admin) => {
    navigate(`/admin-profile/${admin.id}`); // Pass the admin ID in the route
  };

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
          <h3 className="text-[24px] font-bold text-black">Admins</h3>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by admin name"
          className="p-2 border border-gray-300 rounded-md w-full text-black"
        />
      </div>

      {/* Display loading message or error */}
      {loading && (
        <div className="flex justify-center items-center py-6">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
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
            {Admins?.map((admin, index) => (
              <tr key={index} className="text-[14px] text-gray-900 border-b border-gray-200">
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={admin?.profilePicture || "https://i.pravatar.cc/40?img=1"} // Use profile picture if available
                    alt={admin?.adminName}
                    className="w-8 h-8 mt-3 rounded-full"
                  />
                  <span className="mt-4">{admin?.adminName}</span>
                </td>
                <td className="py-3 px-4">{admin?.email}</td>
                <td className="py-3 px-4">{admin?.programDep}</td>
                <td className="py-3 px-4">{admin?.campus}</td>
                <td className="py-3 px-4">{admin?.schoolName}</td>
                <td className="py-3 px-4 flex items-center gap-4">
                  <button
                    onClick={() => handleViewProfile(admin)}
                    className="text-blue-500 hover:text-blue-700 mb-4"
                    title="View Profile"
                  >
                    <IoMdEye size={20} />
                  </button>
                  <button
                    onClick={() => {
                      setAdminToDelete(admin); // Set the admin to delete
                      setShowDeleteModal(true); // Show the modal
                    }}
                    className="text-red-500 hover:text-red-700 mb-4"
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/3 lg:w-1/4">
            <h3 className="text-xl font-bold text-center mb-4 text-black">Confirm Deletion</h3>
            <p className="text-center mb-4 text-black">Are you sure you want to delete this admin?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToasterContainer />
    </div>
  );
};

export default AdminsTable;
