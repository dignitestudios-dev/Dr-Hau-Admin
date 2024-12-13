import React, { useState, useEffect } from "react";
import { IoMdArrowBack, IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import UserListModal from "./UserListModal";
import axios from '../../axios'; // Assuming axios is set up as provided

const AppointmentsTable = () => {
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState([]); // State for holding appointments data
  const [loading, setLoading] = useState(true); // Loading state to show loading indicator
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [filter, setFilter] = useState("All"); // Filter state for status
  const [lotNumberFilter, setLotNumberFilter] = useState(""); // State for lot number filter

  const toggleModal = () => setShowModal(!showModal);

  const handleDelete = (index) => {
    // Assuming there is a delete functionality here if needed
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  };

  const handleFilterChange = (e) => setFilter(e.target.value);

  const handleLotNumberFilterChange = (e) => setLotNumberFilter(e.target.value); // Handle lot number filter change

  const handleViewDetails = (appointment) => {
    navigate(`/userappointmentdetails`, { state: { appointment } });
  };

  // Fetch appointments from the API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const currentDate = new Date().toISOString(); // Get current date in ISO format
        const response = await axios.post("/admin/appointments/today", { currentDate });

        if (response.data.success) {
          setAppointments(response.data.data); // Set the fetched appointments in state
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []); // Empty dependency array ensures this runs once on component mount

  // Filter appointments based on lot number and status
  const filteredAppointments = appointments
    .filter((appointment) => {
      // Filter by status if filter is not "All"
      if (filter !== "All" && appointment.status !== filter) {
        return false;
      }
      // Filter by lot number if it's provided
      if (lotNumberFilter && !appointment.event.lotNumber.includes(lotNumberFilter)) {
        return false;
      }
      return true;
    });

  return (
    <div className="w-full h-auto bg-white p-6 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <IoMdArrowBack
            onClick={() => navigate("/dashboard")}
            className="text-[24px] text-gray-700 mr-2"
          />
          <h3 className="text-[24px] font-bold text-black">Recent Appointments</h3>
        </div>

        <div className="flex gap-4 items-center">
          <button
            onClick={toggleModal}
            className="flex items-center bg-black text-white p-2 rounded-md cursor-pointer"
          >
            <IoMdAdd size={20} className="mr-2" />
            Walk In
          </button>

          {/* Filter by Status Dropdown */}
          <select
            value={filter}
            onChange={handleFilterChange}
            className="p-2 border text-black border-gray-300 rounded-md"
          >
            <option value="All">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Not Confirmed">Not Confirmed</option>
          </select>

          {/* Filter by Lot Number */}
          <input
            type="text"
            value={lotNumberFilter}
            onChange={handleLotNumberFilterChange}
            placeholder="Filter by Lot Number"
            className="p-2 border text-black border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="text-left text-[14px] bg-[#F5F7F7] text-gray-500">
              <th className="py-2 px-4">STUDENT</th>
              <th className="py-2 px-4">DATE OF BIRTH</th>
              <th className="py-2 px-4">CONSENT</th>
              <th className="py-2 px-4">PROGRAM</th>
              <th className="py-2 px-4">STATUS</th>
              <th className="py-2 px-4">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  <span className="text-gray-500">Loading...</span>
                </td>
              </tr>
            ) : (
              filteredAppointments.map((appointment, index) => (
                <tr key={index} className="text-[14px] text-gray-900 border-b border-gray-200">
                  <td className="py-3 px-4 flex items-center">
                    <img
                      src={appointment?.user?.profilePicture}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover mr-2"
                    />
                    {appointment?.user?.firstName} {appointment?.user?.lastName}
                  </td>
                  <td className="py-3 px-4">{new Date(appointment?.user?.dob).toLocaleDateString()}</td>
                  <td className={`py-3 px-4 ${appointment?.status === "Scheduled" ? "text-blue-500" : "text-red-500"}`}>
                    {appointment?.approval}
                  </td>
                  {/* <td className="py-3 px-4">{appointment?.user?.address}</td> */}
                  <td className="py-3 px-4">{appointment?.user?.programAttended}</td>
                  <td className={`py-3 px-4 ${appointment?.status === "Scheduled" ? "text-blue-500" : "text-red-500"}`}>
                    {appointment?.adminStatus}
                  </td>
                  
                  <td className="py-3 px-4">
                    <button onClick={() => handleViewDetails(appointment)} className="text-blue-500 mr-2">
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <UserListModal
        isVisible={showModal}
        onClose={toggleModal}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AppointmentsTable;
