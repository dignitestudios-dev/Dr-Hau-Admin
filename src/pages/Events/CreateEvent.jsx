import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [vaccinationFile, setVaccinationFile] = useState(null);
  const [selectedCampus, setSelectedCampus] = useState("");
  const [error, setError] = useState("");

  const campuses = ["Campus A", "Campus B", "Campus C"]; 
  const schools = ["School A", "School B", "School C"]; 

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!eventName || !eventDate || !eventTime || !eventDescription || !vaccinationFile || !selectedCampus || !selectedSchool) {
      setError("All fields are required!");
      return;
    }

    const newEvent = {
      eventName,
      eventDate,
      eventTime,
      eventDescription,
      vaccinationFile,
      selectedCampus,
    };

    console.log("Event Created:", newEvent);

    navigate("/events");
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
        <div className="flex items-center">
          <h3 className="text-2xl font-bold text-black"> Create Event</h3>
        </div>
       
      </div>
    <div className="w-full mx-auto p-8 bg-white shadow-lg rounded-lg">
      

      {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Name */}
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

        {/* Event Date */}
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

        {/* Event Time */}
        <div>
          <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700">Event Time</label>
          <input
            id="eventTime"
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
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

        {/* School Selection */}
        <div>
          <label htmlFor="selectedSchool" className="block text-sm font-medium text-gray-700">Select School</label>
          <select
            id="selectedSchool"
            value={selectedCampus}
            onChange={(e) => setSelectedSchool(e.target.value)}
            required
            className="w-full p-4 mt-2 border text-black border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a school</option>
            {schools.map((school, index) => (
              <option key={index} value={school}>
                {school}
              </option>
            ))}
          </select>
        </div>

        {/* Campus Selection */}
        <div>
          <label htmlFor="selectedCampus" className="block text-sm font-medium text-gray-700">Select Campus</label>
          <select
            id="selectedCampus"
            value={selectedCampus}
            onChange={(e) => setSelectedCampus(e.target.value)}
            required
            className="w-full p-4 mt-2 border text-black border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a campus</option>
            {campuses.map((campus, index) => (
              <option key={index} value={campus}>
                {campus}
              </option>
            ))}
          </select>
        </div>

      {/* Vaccination Document Upload */}
      <div>
          <label htmlFor="vaccinationFile" className="block text-sm font-medium text-gray-700">Vaccination Document</label>
          <input
            id="vaccinationFile"
            type="file"
            onChange={(e) => setVaccinationFile(e.target.files[0])}
            required
            className="w-full p-1 mt-2 text-black rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
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
