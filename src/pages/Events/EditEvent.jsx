import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const EditEvent = () => {
  const navigate = useNavigate();

  // Example event data for the details page
  const eventData = {
    date: "Jun 12, 2024",
    vaccination: "Hepatitis B vaccination",
    time: "08:00 A.M - 02:00 P.M",
    status: "Upcoming",
    bookingStats: {
      totalBooked: 50,
      availableSpots: 20,
      confirmed: 45,
      pending: 5,
    },
    enrolledUsers: [
      { name: "John Doe", status: "Confirmed" },
      { name: "Jane Smith", status: "Pending" },
      { name: "Mary Johnson", status: "Confirmed" },
      { name: "James Lee", status: "Confirmed" },
    ],
  };

  const handleCancelEvent = () => {
    alert("Event cancelled.");
    // Implement actual event cancellation logic here
  };

  const handleModifyEvent = () => {
    alert("Redirecting to modify event.");
    // Implement actual event modification logic here
    // For example, redirect to a form for modifying the event.
  };

  return (
    <div className="w-full h-auto p-6 bg-gray-100 overflow-auto">
      <div className="flex items-center mb-4">
        <IoMdArrowBack
          className="cursor-pointer text-[24px] text-black"
          onClick={() => navigate("/events")} // Navigate back to the events list
        />
        <h3 className="ml-4 text-[24px] font-bold text-black">Event Details</h3>
      </div>

      <div className="bg-white w-full h-auto sm:h-auto sm:mt-8 mt-6 p-4 lg:p-10 sm:p-6 rounded-lg shadow-lg">
        <div className="mb-6">
        <span
            className={`py-1 px-3 rounded-full text-white ${
              eventData.status === "Upcoming"
                ? "bg-orange-500"
                : eventData.status === "Completed"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {eventData.status}
          </span>
          <h4 className="text-xl text-black font-semibold mt-4">{eventData.vaccination}</h4>
          <p className="text-sm text-gray-500">Date: {eventData.date}</p>
          <p className="text-sm text-gray-500">Time: {eventData.time}</p>
          
        </div>

        <div className="mb-6">
          <h4 className="text-lg text-black font-semibold mb-2">Booking Stats</h4>
          <ul className="text-sm text-gray-700">
            <li>Total Booked: {eventData.bookingStats.totalBooked}</li>
            <li>Available Spots: {eventData.bookingStats.availableSpots}</li>
            <li>Confirmed: {eventData.bookingStats.confirmed}</li>
            <li>Pending: {eventData.bookingStats.pending}</li>
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-lg text-black font-semibold mb-2">Enrolled Users</h4>
          <ul className="space-y-2">
            {eventData.enrolledUsers.map((user, index) => (
              <li key={index} className="text-sm text-gray-700">
                {user.name} - <span className={`font-semibold ${user.status === "Confirmed" ? "text-green-500" : "text-yellow-500"}`}>{user.status}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleCancelEvent}
            className="bg-red-500 text-white py-2 px-4 rounded-md"
          >
            Cancel Event
          </button>
          <button
            onClick={handleModifyEvent}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Modify Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
