import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const EventsTable = () => {
  const data = [
    {
      date: "Jun 12, 2024",
      vaccination: "Hepatitis B vaccination",
      time: "08:00 A.M - 02:00 P.M",
      status: "Upcoming",
      school: "Harvard University",
      campus: "Cambridge",
    },
    {
      date: "Jul 15, 2024",
      vaccination: "Rabies vaccination",
      time: "09:00 A.M - 12:00 P.M",
      status: "Upcoming",
      school: "Stanford University",
      campus: "Stanford",
    },
    {
      date: "Jul 30, 2024",
      vaccination: "MMR vaccination",
      time: "02:00 P.M - 05:30 P.M",
      status: "Upcoming",
      school: "Harvard University",
      campus: "Cambridge",
    },
    {
      date: "May 28, 2024",
      vaccination: "Hepatitis B vaccination",
      time: "09:00 A.M - 11:30 A.M",
      status: "Completed",
      school: "Stanford University",
      campus: "Stanford",
    },
    {
      date: "May 01, 2024",
      vaccination: "Flu vaccination",
      time: "03:00 P.M - 06:00 P.M",
      status: "Completed",
      school: "Harvard University",
      campus: "Cambridge",
    },
    {
      date: "Apr 18, 2024",
      vaccination: "Hepatitis B vaccination",
      time: "09:00 A.M - 12:00 P.M",
      status: "Completed",
      school: "Stanford University",
      campus: "Stanford",
    },
    {
      date: "Apr 01, 2024",
      vaccination: "Flu vaccination",
      time: "03:00 P.M - 06:00 P.M",
      status: "Cancelled",
      school: "Harvard University",
      campus: "Cambridge",
    },
  ];

  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedSchool, setSelectedSchool] = useState("All");
  const [selectedCampus, setSelectedCampus] = useState("All");
  const navigate = useNavigate();

  const filteredData = data.filter((appointment) => {
    // Filter by status
    const statusFilter = selectedTab === "All" || appointment.status === selectedTab;
    // Filter by school
    const schoolFilter = selectedSchool === "All" || appointment.school === selectedSchool;
    // Filter by campus
    const campusFilter = selectedCampus === "All" || appointment.campus === selectedCampus;
    
    return statusFilter && schoolFilter && campusFilter;
  });

  // Extract unique schools and campuses from data for dropdown options
  const schools = [...new Set(data.map((item) => item.school))];
  const campuses = [...new Set(data.map((item) => item.campus))];

  const handleViewDetails = (status) => {
    if (status === "Upcoming" || status === "Cancelled") {
      navigate("/event-details"); // Redirect to event details page for Upcoming or Cancelled
    } else {
      navigate("/completed-event-details"); // Redirect to appointment completed page for other statuses
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h3 className="text-[24px] font-bold text-black">Events</h3>
        </div>
      </div>

      {/* Tabs and Filters Section */}
      <div className="w-full h-auto bg-white p-6 rounded-md">
        <div className="flex justify-between items-center mb-2">
          {/* Event Status Tabs */}
          <div className="flex gap-6 text-[14px] border-b">
            <button
              className={`pb-2 ${
                selectedTab === "All"
                  ? "text-black border-b-2 border-black font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab("All")}
            >
              All
            </button>
            <button
              className={`pb-2 ${
                selectedTab === "Upcoming"
                  ? "text-orange-500 border-b-2 border-black font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab("Upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`pb-2 ${
                selectedTab === "Completed"
                  ? "text-green-500 border-b-2 border-black font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab("Completed")}
            >
              Completed
            </button>
            <button
              className={`pb-2 ${
                selectedTab === "Cancelled"
                  ? "text-red-500 border-b-2 border-black font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab("Cancelled")}
            >
              Cancelled
            </button>
          </div>

          {/* Filters - Positioned to the right */}
          <div className="flex gap-6">
            <div className="flex flex-col">
              {/* <label className="font-medium text-sm text-black">School</label> */}
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="p-2 border rounded-md text-black"
              >
                <option value="All">All Schools</option>
                {schools.map((school, index) => (
                  <option key={index} value={school}>
                    {school}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              {/* <label className="font-medium text-sm text-black">Campus</label> */}
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="p-2 border rounded-md text-black"
              >
                <option value="All">All Campuses</option>
                {campuses.map((campus, index) => (
                  <option key={index} value={campus}>
                    {campus}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table for events */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="text-left text-[14px] bg-[#F5F7F7] text-gray-500">
                <th className="py-2 px-4">DATE</th>
                <th className="py-2 px-4">VACCINATION</th>
                <th className="py-2 px-4">TIME</th>
                <th className="py-2 px-4">STATUS</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((appointment, index) => (
                <tr
                  key={index}
                  className="text-[14px] text-gray-900 border-b border-[#E5E7EB]"
                >
                  <td className="py-3 px-4">{appointment.date}</td>
                  <td className="py-3 px-4">{appointment.vaccination}</td>
                  <td className="py-3 px-4">{appointment.time}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`py-1 px-3 rounded-full text-white ${
                        appointment.status === "Upcoming"
                          ? "bg-orange-500"
                          : appointment.status === "Completed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td
                    onClick={() => handleViewDetails(appointment.status)} // Call the function with status as argument
                    className="py-3 px-4 text-blue-500"
                  >
                    <p className="cursor-pointer">View details</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EventsTable;
