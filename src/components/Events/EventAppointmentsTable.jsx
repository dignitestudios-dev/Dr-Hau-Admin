import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios"; // Adjust the path as needed
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const EventAppointmentsTable = ({ eventId }) => {
  const [appointments, setAppointments] = useState([]);
  console.log("zppointment~~", appointments)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  // Fetch appointments when component is mounted or eventId changes
  useEffect(() => {
    const fetchAppointments = async (page) => {
      try {
        setLoading(true)
        const response = await axios.get(`/admin/events/${eventId}?page=${page}&limit=10`);
        if (response.data.success) {
          setAppointments(response.data.data); 
        } else {
          setError("No appointments found");
        }
      } catch (err) {
        setError("Error fetching appointment data");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [eventId,currentPage]);

  if (loading) {
    return <p className="text-black">Loading appointments...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  const handleViewDetails = (appointment) => {
    navigate(`/userappointmentdetails`, { state: { appointment } });
  };

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
            {appointments.map((appointment, index) => (
              <tr
                key={appointment.user._id} // Use unique ID from the API
                className="text-[14px] text-gray-900 border-b border-[#E5E7EB] cursor-pointer"
                onClick={() => navigate(`/appointment-completed/${appointment.user._id}`, { state: { appointment: appointment } })} 
              >
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={appointment.user.profilePicture || "https://via.placeholder.com/40"} // Handle missing image URL
                    alt={appointment.user.firstName}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{appointment.user.firstName} {appointment.user.lastName}</span>
                </td>
                <td className="py-3 px-4">{new Date(appointment.user.dob).toLocaleDateString()}</td>
                <td className="py-3 px-4">{appointment.user.campus}</td>
                <td className="py-3 px-4">{appointment.user.programAttended}</td>
                <td
                  className={`py-3 px-4 ${
                    appointment.status === "Scheduled" ? "text-blue-500" : "text-red-500"
                  }`}
                >
                  {appointment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default EventAppointmentsTable;
