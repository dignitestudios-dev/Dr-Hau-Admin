import React, { useState } from "react";

// UserListModal Component to display form where admin can select user, event, and vaccination
const UserListModal = ({ isVisible, onClose, users = [], events = [], vaccinations = [], onSubmit }) => {
  if (!isVisible) return null;

  // State to track selected values
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedVaccination, setSelectedVaccination] = useState("");

  // State for search terms
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [eventSearchTerm, setEventSearchTerm] = useState("");
  const [vaccinationSearchTerm, setVaccinationSearchTerm] = useState("");

  // State to handle dropdown visibility
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showEventDropdown, setShowEventDropdown] = useState(false);
  const [showVaccinationDropdown, setShowVaccinationDropdown] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedUser || !selectedEvent || !selectedVaccination) {
      alert("Please select a user, event, and vaccination");
      return;
    }
    onSubmit(selectedUser, selectedEvent, selectedVaccination);
    onClose();
  };

  // Filtered users, events, and vaccinations based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(eventSearchTerm.toLowerCase())
  );

  const filteredVaccinations = vaccinations.filter((vaccination) =>
    vaccination.name.toLowerCase().includes(vaccinationSearchTerm.toLowerCase())
  );

  // Handle user selection from the dropdown
  const handleUserSelect = (userId, userName) => {
    setSelectedUser(userId);
    setUserSearchTerm(userName);
    setShowUserDropdown(false);
  };

  // Handle event selection from the dropdown
  const handleEventSelect = (eventId, eventName) => {
    setSelectedEvent(eventId);
    setEventSearchTerm(eventName);
    setShowEventDropdown(false);
  };

  // Handle vaccination selection from the dropdown
  const handleVaccinationSelect = (vaccinationId, vaccinationName) => {
    setSelectedVaccination(vaccinationId);
    setVaccinationSearchTerm(vaccinationName);
    setShowVaccinationDropdown(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Select User, Event, and Vaccination</h3>

        <form onSubmit={handleSubmit}>
          {/* User selection */}
          <div className="mb-5 relative">
            <label htmlFor="user" className="block text-sm font-medium text-gray-700">Select User</label>
            {/* Search input for users */}
            <input
              type="text"
              placeholder="Search User"
              className="mt-2 block w-full px-4 py-3 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
              value={userSearchTerm}
              onChange={(e) => {
                setUserSearchTerm(e.target.value);
                setShowUserDropdown(true); // Show the dropdown when typing
              }}
              onFocus={() => setShowUserDropdown(true)} // Show dropdown on focus
            />
            {/* User dropdown */}
            {showUserDropdown && userSearchTerm && (
              <ul className="absolute mt-1 w-full max-h-48 overflow-y-auto bg-white shadow-lg border border-gray-300 rounded-md z-10">
                {filteredUsers.map((user) => (
                  <li
                    key={user.id}
                    onClick={() => handleUserSelect(user.id, user.name)}
                    className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-black"
                  >
                    {user.name}
                  </li>
                ))}
                {filteredUsers.length === 0 && (
                  <li className="px-4 py-2 text-gray-500">No results found</li>
                )}
              </ul>
            )}
          </div>

          {/* Event selection */}
          <div className="mb-5 relative">
            <label htmlFor="event" className="block text-sm font-medium text-gray-700">Select Event</label>
            {/* Search input for events */}
            <input
              type="text"
              placeholder="Search Event"
              className="mt-2 block w-full px-4 py-3 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
              value={eventSearchTerm}
              onChange={(e) => {
                setEventSearchTerm(e.target.value);
                setShowEventDropdown(true);
              }}
              onFocus={() => setShowEventDropdown(true)}
            />
            {/* Event dropdown */}
            {showEventDropdown && eventSearchTerm && (
              <ul className="absolute mt-1 w-full max-h-48 overflow-y-auto bg-white shadow-lg border border-gray-300 rounded-md z-10">
                {filteredEvents.map((event) => (
                  <li
                    key={event.id}
                    onClick={() => handleEventSelect(event.id, event.name)}
                    className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-black"
                  >
                    {event.name}
                  </li>
                ))}
                {filteredEvents.length === 0 && (
                  <li className="px-4 py-2 text-gray-500">No results found</li>
                )}
              </ul>
            )}
          </div>

          {/* Vaccination selection */}
          <div className="mb-5 relative">
            <label htmlFor="vaccination" className="block text-sm font-medium text-gray-700">Select Vaccination</label>
            {/* Search input for vaccinations */}
            <input
              type="text"
              placeholder="Search Vaccination"
              className="mt-2 block w-full px-4 py-3 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
              value={vaccinationSearchTerm}
              onChange={(e) => {
                setVaccinationSearchTerm(e.target.value);
                setShowVaccinationDropdown(true);
              }}
              onFocus={() => setShowVaccinationDropdown(true)}
            />
            {/* Vaccination dropdown */}
            {showVaccinationDropdown && vaccinationSearchTerm && (
              <ul className="absolute mt-1 w-full max-h-48 overflow-y-auto bg-white shadow-lg border border-gray-300 rounded-md z-10">
                {filteredVaccinations.map((vaccination) => (
                  <li
                    key={vaccination.id}
                    onClick={() => handleVaccinationSelect(vaccination.id, vaccination.name)}
                    className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-black"
                  >
                    {vaccination.name}
                  </li>
                ))}
                {filteredVaccinations.length === 0 && (
                  <li className="px-4 py-2 text-gray-500">No results found</li>
                )}
              </ul>
            )}
          </div>

          {/* Submit button */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="submit"
              className="text-white bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 py-2 px-6 rounded-md transition duration-300"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 py-2 px-6 rounded-md transition duration-300"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserListModal;
