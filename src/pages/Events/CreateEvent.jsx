import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";  

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");  
  const [eventEndTime, setEventEndTime] = useState("");  
  const [eventDescription, setEventDescription] = useState("");
  const [vaccinationFile, setVaccinationFile] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState("");  
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    if (!eventName || !eventDate || !eventStartTime || !eventEndTime || !eventDescription || !vaccinationFile || !selectedSchool) {
      setError("All fields are required!");
      return;
    }

    const timeFrom = new Date(`${eventDate}T${eventStartTime}:00Z`);
    const timeTo = new Date(`${eventDate}T${eventEndTime}:00Z`);

    if (timeTo <= timeFrom) {
      setError("End time must be later than start time.");
      return;
    }

    const school = String(selectedSchool);

    const eventData = {
      school,  
      lotNumber: eventName,  
      description: eventDescription,
      date: new Date(eventDate).toISOString(),
      timeFrom: timeFrom.toISOString(),  
      timeTo: timeTo.toISOString(),  // Convert end time to ISO
      vaccinations: ["Varicella", "MMR", "FLU", "TD Vaccine"], // Example vaccination list
    };

    try {
      const response = await axios.post("/admin/event", eventData);

      if (response.data.success) {
        console.log("Event Created:", response.data);
        navigate("/events");  // Navigate to events page
      } else {
        setError("Failed to create event. Please try again.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      setError("An error occurred while creating the event. Please try again.");
    }
  };

  return (
    <div className="w-full p-6 rounded-md shadow-md overflow-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/events")}
          className="text-black hover:text-gray-800 flex items-center gap-2 mr-2 text-xl"
        >
          <IoMdArrowBack />
        </button>
        <h3 className="text-2xl font-bold text-black">Create Event</h3>
      </div>

      <div className="w-full mx-auto p-8 bg-white shadow-lg rounded-lg">
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
            <input
              id="eventName"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              className="w-full p-4 mt-2 border text-black border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event name"
            />
          </div>

          <div>
            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Event Date</label>
            <input
              id="eventDate"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
              className="w-full p-4 mt-2 border text-black border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="eventStartTime" className="block text-sm font-medium text-gray-700">Start Time</label>
            <input
              id="eventStartTime"
              type="time"
              value={eventStartTime}
              onChange={(e) => setEventStartTime(e.target.value)}
              required
              className="w-full p-4 mt-2 border text-black border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Event End Time */}
          <div>
            <label htmlFor="eventEndTime" className="block text-sm font-medium text-gray-700">End Time</label>
            <input
              id="eventEndTime"
              type="time"
              value={eventEndTime}
              onChange={(e) => setEventEndTime(e.target.value)}
              required
              className="w-full p-4 mt-2 border text-black border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Event Description */}
          <div>
            <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">Event Description</label>
            <textarea
              id="eventDescription"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
              className="w-full p-4 mt-2 border text-black border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event description"
            />
          </div>

          {/* School Name Input */}
          <div>
            <label htmlFor="selectedSchool" className="block text-sm font-medium text-gray-700">Enter School Name</label>
            <input
              id="selectedSchool"
              type="text"
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              required
              className="w-full p-4 mt-2 border text-black border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the school name"
            />
          </div>

          {/* Vaccination Document Upload */}
          <div>
            <label htmlFor="vaccinationFile" className="block text-sm font-medium text-gray-700">Vaccination Document</label>
            <input
              id="vaccinationFile"
              type="file"
              onChange={(e) => setVaccinationFile(e.target.files[0])}
              required
              className="w-full p-1 mt-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
