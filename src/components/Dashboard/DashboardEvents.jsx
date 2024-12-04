import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const DashboardEvents = () => {
  const data = [
    {
      date: "Jun 12, 2024",
      vaccination: "Hepatitis B vaccination",
      time: "08:00 A.M - 02:00 P.M",
      status: "Upcoming",
    },
    {
      date: "Jul 15, 2024",
      vaccination: "Rabies vaccination",
      time: "09:00 A.M - 12:00 P.M",
      status: "Upcoming",
    },
    {
      date: "Jul 30, 2024",
      vaccination: "MMR vaccination",
      time: "02:00 P.M - 05:30 P.M",
      status: "Upcoming",
    },
    {
      date: "May 28, 2024",
      vaccination: "Hepatitis B vaccination",
      time: "09:00 A.M - 11:30 A.M",
      status: "Completed",
    },
    {
      date: "May 01, 2024",
      vaccination: "Flu vaccination",
      time: "03:00 P.M - 06:00 P.M",
      status: "Completed",
    },
    {
      date: "Apr 18, 2024",
      vaccination: "Hepatitis B vaccination",
      time: "09:00 A.M - 12:00 P.M",
      status: "Completed",
    },
    {
      date: "Apr 01, 2024",
      vaccination: "Flu vaccination",
      time: "03:00 P.M - 06:00 P.M",
      status: "Cancelled",
    },
  ];

  const [selectedTab, setSelectedTab] = useState("All");
  const navigate = useNavigate();

  const filteredData =
    selectedTab === "All"
      ? data
      : data.filter((appointment) => appointment.status === selectedTab);

  const handleViewDetails = (status) => {
    if (status === "Upcoming" || status === "Cancelled") {
      navigate("/event-details"); // Redirect to event details page for Upcoming or Cancelled
    } else {
      navigate("/completed-event-details"); // Redirect to appointment completed page for other statuses
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <h3 className="text-[24px] font-bold text-black">Events</h3>
        </div>
      </div>

      <div className="w-full h-auto bg-white p-2 rounded-md">
        <div className="flex gap-6 text-[14px] border-b mb-4">
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

export default DashboardEvents;
