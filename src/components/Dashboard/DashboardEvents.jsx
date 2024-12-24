import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";


const DashboardEvents = () => {
  const [events, setEvents] = useState([]); // To store the events data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors
  const [selectedTab, setSelectedTab] = useState("All"); // Default to "All"
  const [selectedSchool, setSelectedSchool] = useState("All");
  const [selectedCampus, setSelectedCampus] = useState("All");
  const [selectedDate, setSelectedDate] = useState(getCurrentDate()); // Set default to current date
  const navigate = useNavigate();

  //pagination 
  const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [totalPages, setTotalPages] = useState(0); // Total pages state
  // Function to get current date in the proper format (e.g., 2024-10-03)
  function getCurrentDate() {
    const date = new Date();
    return date?.toISOString()?.split("T")[0]; // Get the date in YYYY-MM-DD format
  }

  // Fetch events data from the API whenever the selected date or any filter changes
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true); // Set loading to true before making the request
      try {
        const response = await axios?.post(`/admin/events?page=${currentPage}&limit=10`, {
          currentDate: selectedDate, // Include the selected date in the request body
        });

        if (response?.data?.success) {
          setEvents(response?.data?.data);
          setTotalPages(response.data.totalPages); // Assuming API returns totalPages
          // Store events data in state
        } else {
          setError("No events found for the selected date.");
        }
      } catch (error) {
        setError("Error fetching events. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false once the request is finished
      }
    };

    fetchEvents();
  }, [selectedDate, currentPage]); // Re-fetch events whenever selectedDate changes

  // Filter events based on status, school, and campus
  const filteredEvents = events?.filter((event) => {
    const statusFilter = selectedTab === "All" || event.status?.toLowerCase() === selectedTab?.toLowerCase();
    // const schoolFilter = selectedSchool === "All" || event?.school === selectedSchool;
    // const campusFilter = selectedCampus === "All" || event?.campus === selectedCampus;

    return statusFilter //&& schoolFilter && campusFilter;
  });

  // Extract unique schools and campuses for dropdown options
  // const schools = [...new Set(events?.map((event) => event.school))];
  // const campuses = [...new Set(events?.map((event) => event.campus))];

  // const handleViewDetails = (status) => {
  //   if (status === "Upcoming" || status === "Cancelled") {
  //     navigate("/event-details"); // Redirect for Upcoming or Cancelled
  //   } else {
  //     navigate("/completed-event-details"); // Redirect for Completed
  //   }
  // };


  const handleViewDetails = (eventId, status) => {
    
    navigate(`/event-details/${eventId}`, { state: { status: status } }); 
  };
  
  const getStatusClass = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-yellow-300"; 
      case "cancelled":
        return "bg-red-500"; 
      case "completed":
        return "bg-green-500"; 
      default:
        return "bg-gray-200";
    }
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
    <>
     


      
      <div className="w-full h-auto bg-white p-6 rounded-md">

      <div className="flex items-center mb-4">
          <h3 className="text-[24px] font-bold text-black">Events</h3>
        </div>
        {/* <div className="flex justify-between items-center mb-4">
          <div className="flex gap-6">
            <label htmlFor="event-date" className="text-gray-700 font-medium">Select Date</label>
            <input
              type="date"
              id="event-date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)} // Update the date when the user selects a new one
              className="p-2 border rounded-md text-black"
            />
          </div>
        </div> */}

        {/* Display the selected date in the header */}
        {/* <div className="mb-4">
          <p className="text-lg font-medium text-gray-700">
            Showing events for: <span className="font-bold">{new Date(selectedDate).toLocaleDateString()}</span>
          </p>
        </div> */}

        {/* Tabs and Filters Section */}
        <div className="flex justify-between items-center mb-2">
          {/* Event Status Tabs */}
          <div className="flex gap-6 text-[14px] border-b">
            <button
              className={`pb-2 ${selectedTab === "All" ? "text-black border-b-2 border-black font-bold" : "text-gray-500"}`}
              onClick={() => setSelectedTab("All")}
            >
              All
            </button>
            <button
              className={`pb-2 ${selectedTab === "Upcoming" ? "text-yellow-500 border-b-2 border-black font-bold" : "text-gray-500"}`}
              onClick={() => setSelectedTab("Upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`pb-2 ${selectedTab === "Completed" ? "text-green-500 border-b-2 border-black font-bold" : "text-gray-500"}`}
              onClick={() => setSelectedTab("Completed")}
            >
              Completed
            </button>
            <button
              className={`pb-2 ${selectedTab === "Cancelled" ? "text-red-500 border-b-2 border-black font-bold" : "text-gray-500"}`}
              onClick={() => setSelectedTab("Cancelled")}
            >
              Cancelled
            </button>
          </div>

          {/* Filters - Positioned to the right */}
       
          
          <div className="flex gap-6">
          <div className="flex items-center gap-4">
            {/* <label htmlFor="event-date" className="text-gray-700 font-medium">Select Date</label> */}
            <input
              type="date"
              id="event-date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)} 
              className="p-2 border rounded-md text-black"
            />
          </div>
            {/* <div className="flex flex-col">
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="p-2 border rounded-md text-black"
              >
                <option value="All">All Schools</option>
                {schools?.map((school, index) => (
                  <option key={index} value={school}>
                    {school}
                  </option>
                ))}
              </select>
            </div> */}

            {/* <div className="flex flex-col">
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="p-2 border rounded-md text-black"
              >
                <option value="All">All Campuses</option>
                {campuses?.map((campus, index) => (
                  <option key={index} value={campus}>
                    {campus}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
        </div>

        {/* Display loading message or error */}
        {loading && <div className="flex justify-center items-center py-6">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Table for events */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="text-left text-[14px] bg-[#F5F7F7] text-gray-500">
                <th className="py-2 px-4">DATE</th>
                <th className="py-2 px-4">TITLE</th>
                <th className="py-2 px-4">CAMPUS</th>
                <th className="py-2 px-4">SCHOOL</th>
                <th className="py-2 px-4">TIME</th>

                <th className="py-2 px-4">STATUS</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents?.map((event, index) => (
                <tr
                  key={index}
                  className="text-[14px] text-gray-900 border-b border-[#E5E7EB]"
                >
                  <td className="py-3 px-4">{new Date(selectedDate)?.toLocaleDateString()}</td>
                  <td className="py-3 px-4">{event?.title}</td>
                  <td className="py-3 px-4">{event?.school?.schoolName}</td>
                  <td className="py-3 px-4">{event?.school?.campus}</td>


                  <td className="py-3 px-4">
                    {new Date(event?.timeFrom)?.toLocaleTimeString()} -{" "}
                    {new Date(event?.timeTo)?.toLocaleTimeString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`py-1 px-3 rounded-full text-white ${getStatusClass(event?.status)}`}
                    >
                      {event?.status}
                    </span>
                  </td>
                  <td
onClick={() => handleViewDetails(event?._id, event?.status)}
className="py-3 px-4 text-blue-500 cursor-pointer"
                  >
                    View details
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
      </div>
    </>
  );
};

export default DashboardEvents;
