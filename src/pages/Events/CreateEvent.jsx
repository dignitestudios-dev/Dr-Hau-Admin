import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";  // Assuming axios is set up

const CreateEvent = () => {
  const schoolsData = {
    "ACC": ["Los Angeles", "Ontario", "Orange County"],
    "Annenberg": ["None"],
    "Azusa Adult School": ["None"],
    "CCC": ["Garden Grove", "North Hollywood", "San Bernardino", "San Diego"],
    "CDI": ["None"],
    "Claremont Adult School": ["None"],
    "CNI OC": ["None"],
    "College of the Desert": ["None"],
    "Crafton Hills": ["None"],
    "Fontana School District": ["None"],
    "Glendale Career College": ["None"],
    "Healthcare Career College": ["None"],
    "Monrovia Adult School": ["None"],
    "National Career College": ["None"],
    "NDCI": ["None"],
    "Northwest": ["Anaheim", "Long Beach", "Pomona", "Riverside", "San Diego", "Van Nuys", "West Covina"],
    "Pacific College": ["None"],
    "Platt": ["Alhambra", "Anaheim", "Ontario", "Riverside"],
    "Smith Chason": ["None"],
    "Unitek": ["Bakersfield", "Concord", "Fremont", "Hayward", "Reno", "Sacramento", "San Jose", "South San Francisco"]
  };

  const [eventName, setEventName] = useState("");  // Event name state
  const [eventDate, setEventDate] = useState("");  // Event date state
  const [eventStartTime, setEventStartTime] = useState("");  // Event start time state
  const [eventEndTime, setEventEndTime] = useState("");  // Event end time state
  const [eventDescription, setEventDescription] = useState("");  // Event description state
  const [selectedSchool, setSelectedSchool] = useState("");  // School dropdown selection
  const [selectedCampus, setSelectedCampus] = useState("");  // Campus dropdown selection
  const [selectedVaccinations, setSelectedVaccinations] = useState([]);  // Store selected vaccinations
  const [vaccinationLotNumbers, setVaccinationLotNumbers] = useState({}); // Track lot numbers for vaccines
  const [error, setError] = useState("");  // For handling form errors

  const vaccinationsList = [
    { id: "Tdap", name: "Tdap" },
    { id: "Td Vaccine", name: "Td Vaccine" },
    { id: "FLU", name: "FLU" },
    { id: "MMR", name: "MMR" },
    { id: "Varicella", name: "Varicella" },
    { id: "Hepatitis B", name: "Hepatitis B" },
    { id: "Rabies", name: "Rabies" }
  ];

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    // Check if all required fields are filled
    if (!eventName || !eventDate || !eventStartTime || !eventEndTime || !eventDescription || selectedVaccinations.length === 0 || !selectedSchool || !selectedCampus) {
      setError("All fields are required, including selecting at least one vaccination!");
      return;
    }

    // Create time objects from the selected date and times
    const timeFrom = new Date(`${eventDate}T${eventStartTime}:00Z`);
    const timeTo = new Date(`${eventDate}T${eventEndTime}:00Z`);

    if (timeTo <= timeFrom) {
      setError("End time must be later than start time.");
      return;
    }

    // Create the lotNumber object only for the selected vaccines with their lot numbers
    const lotNumber = selectedVaccinations.reduce((acc, vaccinationId) => {
      const lotNumberValue = vaccinationLotNumbers[vaccinationId];
      if (lotNumberValue) {
        const vaccineName = vaccinationsList.find(vaccine => vaccine.id === vaccinationId).name;
        acc[vaccineName] = lotNumberValue; // Store the lot number with the correct vaccine name
      }
      return acc;
    }, {});

    // If no lot numbers are provided for selected vaccines, show an error
    if (Object.keys(lotNumber).length === 0) {
      setError("Please provide lot numbers for the selected vaccinations.");
      return;
    }

    // Create the event data with school and campus
    const eventData = {
      title: eventName,
      schoolName: selectedSchool,
      schoolCampus: selectedCampus,
      description: eventDescription,
      date: new Date(eventDate).toISOString(),
      timeFrom: timeFrom.toISOString(),
      timeTo: timeTo.toISOString(),
      lotNumber, // Include the lot numbers for selected vaccines
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

  // Handle vaccination checkbox change
  const handleVaccinationChange = (e) => {
    const vaccinationId = e.target.value;
    setSelectedVaccinations((prev) =>
      prev.includes(vaccinationId)
        ? prev.filter((vaccination) => vaccination !== vaccinationId) // Remove if already selected
        : [...prev, vaccinationId] // Add if not selected
    );
  };

  // Handle lot number change for each vaccine
  const handleLotNumberChange = (vaccinationId, lotNumber) => {
    setVaccinationLotNumbers((prev) => ({
      ...prev,
      [vaccinationId]: lotNumber, // Update the lot number for the vaccine
    }));
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

          {/* Start Time */}
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

          {/* End Time */}
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

          {/* School Dropdown */}
          <div>
            <label htmlFor="selectedSchool" className="block text-sm font-medium text-gray-700">Select School</label>
            <select
              id="selectedSchool"
              value={selectedSchool}
              onChange={(e) => {
                setSelectedSchool(e.target.value);
                setSelectedCampus(""); // Reset campus selection when school changes
              }}
              required
              className="w-full p-4 mt-2 border text-black border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a School</option>
              {Object.keys(schoolsData).map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))}
            </select>
          </div>

          {/* Campus Dropdown */}
          {selectedSchool && (
            <div>
              <label htmlFor="selectedCampus" className="block text-sm font-medium text-gray-700">Select Campus</label>
              <select
                id="selectedCampus"
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                required
                className="w-full p-4 mt-2 border text-black border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Campus</option>
                {schoolsData[selectedSchool].map((campus, index) => (
                  <option key={index} value={campus}>
                    {campus}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Vaccination Checkbox */}
          <div>
            <h4 className="block text-sm font-medium text-gray-700">Select Vaccinations</h4>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {vaccinationsList.map((vaccination) => (
                <div key={vaccination.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={vaccination.id}
                    onChange={handleVaccinationChange}
                    checked={selectedVaccinations.includes(vaccination.id)}
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-black">{vaccination.name}</span>

                  {/* Lot Number Input */}
                  {selectedVaccinations.includes(vaccination.id) && (
                    <input
                      type="text"
                      placeholder="Lot number"
                      value={vaccinationLotNumbers[vaccination.id] || ""}
                      onChange={(e) => handleLotNumberChange(vaccination.id, e.target.value)}
                      className="p-2 border text-black border-black rounded-lg shadow-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
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
