import React, { useState } from "react";

// UserListModal Component to display form where admin can select user, event, and vaccination
const UserListModal = ({ isVisible, onClose, users = [], events = [], vaccinations = [], onSubmit }) => {
  if (!isVisible) return null;

  // State to track selected values
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedVaccination, setSelectedVaccination] = useState("");

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

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Select User, Event, and Vaccination</h3>

        <form onSubmit={handleSubmit}>
          {/* User selection */}
          <div className="mb-5">
            <label htmlFor="user" className="block text-sm font-medium text-gray-700">Select User</label>
            <select
              id="user"
              name="user"
              className="mt-2 block w-full px-4 py-3 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
              value={selectedUser || ""}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select a User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Event selection */}
          <div className="mb-5">
            <label htmlFor="event" className="block  text-sm font-medium text-gray-700">Select Event</label>
            <select
              id="event"
              name="event"
              className="mt-2 block w-full px-4 py-3 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option value="">Select an Event</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>

          {/* Vaccination selection */}
          <div className="mb-5">
            <label htmlFor="vaccination" className="block text-sm font-medium text-gray-700">Select Vaccination</label>
            <select
              id="vaccination"
              name="vaccination"
              className="mt-2 block w-full px-4 py-3  text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
              value={selectedVaccination}
              onChange={(e) => setSelectedVaccination(e.target.value)}
            >
              <option value="">Select a Vaccination</option>
              {vaccinations.map((vaccination) => (
                <option key={vaccination.id} value={vaccination.id}>
                  {vaccination.name}
                </option>
              ))}
            </select>
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
