import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import DatePicker from "react-datepicker";

const EventsTable = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active Filters
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedDate, setSelectedDate] = useState(new Date()); // Native Date Object

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  // Reset to page 1 whenever filters change
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

  // Fetch paginated events from API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios?.post(
          `/admin/events?page=${currentPage}&limit=10`,
          {
            currentDate: selectedDate ? selectedDate.toISOString() : null,
          }
        );

        if (response?.data?.success) {
          setEvents(response?.data?.data || []);
          setTotalPages(response?.data?.totalPages || 1);
        } else {
          setEvents([]);
          setError("No events found for the selected criteria.");
        }
      } catch (err) {
        setError("Error fetching events. Please try again later.");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedDate, currentPage]);

  const formatDateKey = (d) => {
    if (!d) return null;
    const dateObj = new Date(d);
    if (isNaN(dateObj.getTime())) return null;
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filteredEvents = events?.filter((event) => {
    const matchesTab =
      selectedTab === "All" ||
      event?.status?.toLowerCase() === selectedTab?.toLowerCase();

    const matchesDate =
      !selectedDate ||
      formatDateKey(event?.date) === formatDateKey(selectedDate);

    return matchesTab && matchesDate;
  });

  const handleViewDetails = (eventId, status) => {
    navigate(`/event-details/${eventId}`, { state: { status } });
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const capitalizeFirstLetter = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h3 className="text-[24px] font-bold text-black mb-4">Events</h3>
        </div>
      </div>

      <div className="w-full h-auto bg-white p-6 rounded-md">
        {/* Tabs and Filters Section */}
        <div className="flex justify-between items-center mb-4">
          {/* Status Tabs */}
          <div className="flex gap-6 text-[14px] border-b">
            {["All", "Upcoming", "Completed", "Cancelled"].map((tab) => (
              <button
                key={tab}
                className={`pb-2 ${selectedTab === tab
                  ? "text-black border-b-2 border-black font-bold"
                  : "text-gray-500"
                  }`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Date Picker Filter */}
          <div className="flex gap-6">
            <div className="relative">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                className="p-2 pl-4 pr-8 z-20 border rounded-md text-black w-full cursor-pointer"
                calendarStartDay={0}
              />
              <span className="absolute right-3 top-2 text-gray-500 pointer-events-none">
                📅
              </span>
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-6">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error Message */}
        {error && !loading && <p className="text-red-500 my-4">{error}</p>}

        {/* Empty state for filtered events */}
        {!loading && !error && events?.length > 0 && filteredEvents?.length === 0 && (
          <p className="text-gray-500 my-4">No {selectedTab.toLowerCase()} events found.</p>
        )}

        {/* Events Table */}
        {!loading && !error && filteredEvents?.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr className="text-left text-[14px] bg-[#F5F7F7] text-gray-500">
                  <th className="py-2 px-4">DATE</th>
                  <th className="py-2 px-4">TITLE</th>
                  <th className="py-2 px-4">CAMPUS</th>
                  <th className="py-2 px-4">SCHOOL</th>
                  <th className="py-2 px-4">EVENT ID</th>
                  <th className="py-2 px-4">TIME</th>
                  <th className="py-2 px-4">STATUS</th>
                  <th className="py-2 px-4">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr
                    key={event?._id}
                    className="text-[14px] text-gray-900 border-b border-[#E5E7EB]"
                  >
                    <td className="py-3 px-4">
                      {event?.date
                        ? new Date(event.date).toLocaleDateString("en-US", {
                          year: "2-digit",
                          month: "2-digit",
                          day: "2-digit",
                        })
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4">{event?.title}</td>
                    <td className="py-3 px-4">{event?.school?.campus || "N/A"}</td>
                    <td className="py-3 px-4">{event?.school?.schoolName || "N/A"}</td>
                    <td className="py-3 px-4">{event?.bennyEventId}</td>
                    <td className="py-3 px-4">
                      {event?.timeFrom && event?.timeTo
                        ? `${new Date(event.timeFrom).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(event.timeTo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`py-1 px-3 rounded-full text-white text-xs font-semibold ${getStatusClass(
                          event?.status
                        )}`}
                      >
                        {capitalizeFirstLetter(event?.status)}
                      </span>
                    </td>
                    <td
                      onClick={() => handleViewDetails(event?._id, event?.status)}
                      className="py-3 px-4 text-blue-500 cursor-pointer font-medium hover:underline"
                    >
                      View details
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage <= 1}
            className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 bg-blue-500 text-white ${currentPage <= 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
              }`}
          >
            <MdChevronLeft className="mr-1" /> Previous
          </button>

          <span className="text-gray-600 font-medium text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 bg-blue-500 text-white ${currentPage >= totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
              }`}
          >
            Next <MdChevronRight className="ml-1" />
          </button>
        </div>
      </div>
    </>
  );
};

export default EventsTable;