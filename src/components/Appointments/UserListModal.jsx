import React, { useState, useEffect } from "react";
import axios from "../../axios"; // Assuming axios is set up

const UserListModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const [lotNumber, setLotNumber] = useState(""); // For lot number input
  const [userEmail, setUserEmail] = useState(""); // For user email input
  const [selectedVaccinations, setSelectedVaccinations] = useState([]); // Store selected vaccinations
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [loading, setLoading] = useState(false); // Loading state
  const [currentDate, setCurrentDate] = useState(""); // Store current date in ISO format

  // Predefined vaccinations list (could be extended or fetched from an API)
  const vaccinationsList = [
    { id: "FLU", name: "FLU" },
    { id: "TDAP", name: "TDAP" },
    { id: "TD Vaccine", name: "TD Vaccine" },
    { id: "MMR", name: "MMR" },
    { id: "Rabies", name: "Rabies" },
    { id: "Hepatitis B", name: "Hepatitis B" },
    { id: "Varicella", name: "Varicella" },
  ];

  // Initialize the current date when the component mounts
  useEffect(() => {
    const today = new Date().toISOString();
    setCurrentDate(today); // Set the current date as the initial value
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail || selectedVaccinations.length === 0 || !lotNumber) {
      setErrorMessage("Please provide user email, lot number, and vaccination(s).");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    const requestBody = {
      vaccinations: selectedVaccinations, // Only the selected vaccinations
      currentDate: currentDate, 
      lotNumber: lotNumber,
      userEmail: userEmail,
    };

    try {
      const response = await axios.post("/admin/appointment/walkin", requestBody);

      if (response?.data?.success) {
        alert("Walk-in appointment created successfully");
        onClose(); 
      } else {
        setErrorMessage(response?.data?.message || "An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting walk-in appointment:", error);

      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "An error occurred. Please try again.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle vaccination checkbox change
  const handleVaccinationChange = (e) => {
    const { value, checked } = e.target;
    setSelectedVaccinations((prev) => {
      if (checked) {
        return [...prev, value]; // Add vaccination to selected list if checked
      } else {
        return prev.filter((vaccination) => vaccination !== value); // Remove if unchecked
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Create Walk-In Appointment
        </h3>

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="lotNumber" className="block text-sm font-medium text-gray-700">
              Lot Number
            </label>
            <input
              id="lotNumber"
              type="text"
              placeholder="Enter Lot Number"
              className="mt-2 block w-full px-4 py-3 border text-black border-gray-300 rounded-md shadow-sm"
              value={lotNumber}
              onChange={(e) => setLotNumber(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">
              User Email
            </label>
            <input
              id="userEmail"
              type="email"
              placeholder="Enter User Email"
              className="mt-2 block w-full px-4 py-3 border text-black border-gray-300 rounded-md shadow-sm"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Select Vaccination(s)
            </label>
            <div className="mt-2">
              {vaccinationsList.map((vaccination) => (
                <div key={vaccination.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={vaccination.id}
                    value={vaccination.id}
                    checked={selectedVaccinations.includes(vaccination.id)}
                    onChange={handleVaccinationChange}
                    disabled={loading}
                    className="mr-2"
                  />
                  <label htmlFor={vaccination.id} className="text-sm text-gray-700">
                    {vaccination.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="submit"
              className={`text-white py-2 px-6 rounded-md transition duration-300 ${loading ? "bg-gray-500" : "bg-black"}`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-700 bg-gray-200 hover:bg-gray-300 py-2 px-6 rounded-md transition duration-300"
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
