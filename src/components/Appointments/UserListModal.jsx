import React, { useState, useEffect, useMemo } from "react";
import axios from "../../axios";
import { SuccessToast, ErrorToast } from "../Global/Toaster";
import { normalizeVaccineName } from "../../constants/utility";

const UserListModal = ({ isVisible, onClose, appointments = [] }) => {
  if (!isVisible) return null;

  const [bennyEventId, setBennyEventId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [selectedVaccinations, setSelectedVaccinations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  const allVaccinationsList = [
    { id: "FLU", name: "FLU", apiValue: "FLU" },
    { id: "TDAP", name: "TDAP", apiValue: "TDAP" },
    { id: "TD Vaccine", name: "TD Vaccine", apiValue: "TD Vaccine" },
    { id: "MMR", name: "MMR", apiValue: "MMR" },
    { id: "Rabies", name: "Rabies", apiValue: "Rabies" },
    { id: "Hepatitis B", name: "Hepatitis B", apiValue: "Hepatitis B" },
    { id: "Varicella", name: "Varicella", apiValue: "Varicella" },
  ];

  // Initialize current date on mount
  useEffect(() => {
    setCurrentDate(new Date().toISOString());
  }, []);

  // Find unique events from today's appointments if available
  const availableEvents = useMemo(() => {
    const map = new Map();
    appointments.forEach((app) => {
      if (app?.event && app?.event?.bennyEventId) {
        if (!map.has(app.event.bennyEventId)) {
          map.set(app.event.bennyEventId, app.event);
        }
      }
    });
    return Array.from(map.values());
  }, [appointments]);

  // Set default event if exactly one event is available
  useEffect(() => {
    if (!bennyEventId && availableEvents.length === 1) {
      setBennyEventId(availableEvents[0].bennyEventId);
    }
  }, [availableEvents, bennyEventId]);

  // Find the selected event based on bennyEventId
  const matchedEvent = useMemo(() => {
    if (!bennyEventId) return null;
    return (
      availableEvents.find(
        (ev) =>
          ev?.bennyEventId?.toString().toLowerCase() ===
          bennyEventId.toString().trim().toLowerCase()
      ) || null
    );
  }, [bennyEventId, availableEvents]);

  // Extract event-associated vaccines
  const eventVaccines = useMemo(() => {
    if (!matchedEvent) return null;
    const fromVaccinations = matchedEvent.vaccinations || [];
    const fromLots = matchedEvent.lotNumber
      ? Object.keys(matchedEvent.lotNumber)
      : [];
    const combined = Array.from(new Set([...fromVaccinations, ...fromLots]));
    return combined.length > 0 ? combined : null;
  }, [matchedEvent]);

  // Check if a vaccination is allowed for this event
  const isVaccineSelectable = (vaccineItem) => {
    if (!eventVaccines) return true; // If no event restriction known, allow selection
    const itemNorm = normalizeVaccineName(vaccineItem.name || vaccineItem.id);
    return eventVaccines.some(
      (ev) => normalizeVaccineName(ev) === itemNorm
    );
  };

  // Find matching exact event vaccine key
  const getMappedEventVaccineName = (vaccineItem) => {
    if (!eventVaccines) return vaccineItem.apiValue;

    const itemNorm = normalizeVaccineName(vaccineItem.apiValue);

    const matched = eventVaccines.find(
      (ev) => normalizeVaccineName(ev) === itemNorm
    );

    // Always return the exact backend enum value
    return vaccineItem.apiValue;
  };

  // Handle vaccination checkbox change
  const handleVaccinationChange = (vaccineItem, checked) => {
    const mappedName = getMappedEventVaccineName(vaccineItem);

    setSelectedVaccinations((prev) => {
      if (checked) {
        if (prev.includes(mappedName)) return prev;
        return [...prev, mappedName];
      }

      return prev.filter(
        (v) => v !== mappedName
      );
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userEmail.trim() || !emailRegex.test(userEmail.trim())) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    if (!bennyEventId.trim()) {
      setErrorMessage("Please provide a Benny Event ID.");
      return;
    }
    if (selectedVaccinations.length === 0) {
      setErrorMessage("Please select at least one vaccination associated with the event.");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    const requestBody = {
      vaccinations: selectedVaccinations,
      currentDate: currentDate,
      bennyEventId: bennyEventId.trim(),
      userEmail: userEmail.trim(),
    };

    try {
      const response = await axios.post("/admin/appointment/walkin", requestBody);

      if (response?.data?.success) {
        SuccessToast("Walk-in appointment created successfully");
        onClose();
      } else {
        const errorMsg = response?.data?.message || "";
        if (/email/i.test(errorMsg) && (/invalid/i.test(errorMsg) || /format/i.test(errorMsg) || /syntax/i.test(errorMsg))) {
          setErrorMessage("Please enter a valid email address");
        } else {
          setErrorMessage(
            errorMsg || "An unexpected error occurred. Please try again."
          );
        }
      }
    } catch (error) {
      console.error("Error submitting walk-in appointment:", error);
      const rawMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "An error occurred while creating the walk-in appointment.";
      let msg = rawMsg;
      if (/email/i.test(rawMsg) && (/invalid/i.test(rawMsg) || /format/i.test(rawMsg) || /syntax/i.test(rawMsg) || /validation/i.test(rawMsg))) {
        msg = "Please enter a valid email address";
      }
      setErrorMessage(msg);
      ErrorToast(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] my-auto overflow-y-auto">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Create Walk-In Appointment
        </h3>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="bennyEventId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Event ID *
            </label>
            <input
              id="bennyEventId"
              type="text"
              placeholder="Enter Event ID (e.g. EVT-1001)"
              className="block w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={bennyEventId}
              onChange={(e) => setBennyEventId(e.target.value)}
              disabled={loading}
              required
            />
            {matchedEvent && (
              <p className="text-xs text-green-600 mt-1 font-medium">
                Matched Event: {matchedEvent.title} ({matchedEvent.school?.schoolName || "School"})
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="userEmail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              User Email *
            </label>
            <input
              id="userEmail"
              type="email"
              placeholder="Enter User Email"
              className="block w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Vaccination(s) *
              {eventVaccines && (
                <span className="text-xs text-gray-500 block font-normal">
                  (Only vaccines included in this event are selectable)
                </span>
              )}
            </label>

            <div className="space-y-2 max-h-48 overflow-y-auto border p-3 rounded-md bg-gray-50">
              {allVaccinationsList.map((vaccine) => {
                const selectable = isVaccineSelectable(vaccine);
                const isChecked = selectedVaccinations.some(
                  (v) =>
                    normalizeVaccineName(v) ===
                    normalizeVaccineName(vaccine.name || vaccine.id)
                );

                return (
                  <div
                    key={vaccine.id}
                    className={`flex items-center justify-between p-1.5 rounded ${selectable ? "hover:bg-white" : "opacity-40 cursor-not-allowed"
                      }`}
                  >
                    <label
                      htmlFor={`vaccine-${vaccine.id}`}
                      className={`text-sm flex items-center cursor-pointer ${selectable ? "text-gray-900 font-medium" : "text-gray-400"
                        }`}
                    >
                      <input
                        type="checkbox"
                        id={`vaccine-${vaccine.id}`}
                        value={vaccine.id}
                        checked={isChecked}
                        onChange={(e) =>
                          handleVaccinationChange(vaccine, e.target.checked)
                        }
                        disabled={loading || !selectable}
                        className="mr-2 h-4 w-4 rounded text-blue-600"
                      />
                      {vaccine.name}
                    </label>
                    {!selectable && (
                      <span className="text-xs text-gray-400 italic">
                        Not in event
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-700 bg-gray-200 hover:bg-gray-300 py-2 px-5 rounded-md transition duration-200 font-medium"
            >
              Close
            </button>
            <button
              type="submit"
              className={`text-white py-2 px-6 rounded-md transition duration-200 font-medium ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800"
                }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserListModal;
