import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios"; // Adjust the path as needed
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { formatDOB } from "../../constants/utility";

const EventAppointmentsTable = ({ eventId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  // Fetch appointments with abort controller for performance optimization
  useEffect(() => {
    const controller = new AbortController();

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `/admin/events/${eventId}?page=${currentPage}&limit=10`,
          { signal: controller.signal }
        );
        if (response?.data?.success) {
          setAppointments(response.data.data || []); 
          setTotalPages(response.data.totalPages || 0);
        } else {
          setError("No appointments found");
        }
      } catch (err) {
        if (err.name !== "CanceledError" && err.name !== "AbortError") {
          setError("Error fetching appointment data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();

    return () => {
      controller.abort();
    };
  }, [eventId, currentPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 bg-white rounded-md">
        <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="ml-3 text-sm text-gray-500">Loading appointments...</span>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 py-4 bg-white px-4 rounded-md">{error}</p>;
  }

  const capitalizeFirstLetter = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };
  
  return (
    <div className="w-full h-auto bg-white rounded-md">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="text-left text-[14px] bg-[#F5F7F7] text-gray-500">
              <th className="py-2 px-4">STUDENT</th>
              <th className="py-2 px-4">DATE OF BIRTH</th>
              <th className="py-2 px-4">CAMPUS</th>
              <th className="py-2 px-4">PROGRAM</th>
              <th className="py-2 px-4">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500 text-sm">
                  No appointments registered for this event.
                </td>
              </tr>
            ) : (
              appointments.map((appointment) => {
                const user = appointment.user || {};
                const adminStatus = appointment?.appointment?.adminStatus;

                return (
                  <tr
                    key={user._id || appointment._id}
                    className="text-[14px] text-gray-900 border-b border-[#E5E7EB] cursor-pointer hover:bg-gray-50"
                    onClick={() => navigate(`/appointment-completed/${user._id || appointment._id}`, { state: { appointment } })} 
                  >
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={user.profilePicture || "https://via.placeholder.com/40"}
                        alt={user.firstName || "Student"}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{[user.firstName, user.lastName].filter(Boolean).join(" ") || "N/A"}</span>
                    </td>
                    <td className="py-3 px-4">{formatDOB(user.dob)}</td>
                    <td className="py-3 px-4">{user.campus || "N/A"}</td>
                    <td className="py-3 px-4">{user.programAttended || "N/A"}</td>
                    <td
                      className={`py-3 px-4 font-medium ${
                        adminStatus === "completed" ? "text-blue-500" : "text-red-500"
                      }`}
                    >
                      {capitalizeFirstLetter(adminStatus || "Pending")}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} 
          disabled={currentPage === 1} 
          className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 bg-blue-500 text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          <MdChevronLeft className="mr-2" /> Previous
        </button>

        <span className="text-gray-500">Page {currentPage} of {totalPages || 1}</span>

        <button 
          onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} 
          disabled={currentPage === totalPages || totalPages === 0} 
          className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 bg-blue-500 text-white ${currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          Next <MdChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default EventAppointmentsTable;
