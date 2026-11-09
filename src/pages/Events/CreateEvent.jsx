import React, { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { validateLotNumber } from "../../constants/utility";
import { SuccessToast, ErrorToast } from "../../components/Global/Toaster";

const CreateEvent = () => {
  const [schoolsData, setSchoolsData] = useState({});
  const [loadingSchools, setLoadingSchools] = useState(true);

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");
  const [selectedVaccinations, setSelectedVaccinations] = useState([]);
  const [vaccinationLotNumbers, setVaccinationLotNumbers] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  // BUG-004: Fetch only registered and eligible schools from backend API
  useEffect(() => {
    const fetchRegisteredSchools = async () => {
      try {
        setLoadingSchools(true);
        const response = await axios.post("/admin/schools?page=1&limit=500", {});
        if (response?.data?.success && Array.isArray(response?.data?.data)) {
          const registeredSchools = response.data.data.filter(
            (s) => s && !s.isDeleted && (s.schoolName || s.name)
          );

          const mapped = {};
          registeredSchools.forEach((s) => {
            const name = s.schoolName || s.name;
            if (!mapped[name]) {
              mapped[name] = [];
            }
            const campusVal = s.campus || s.schoolCampus || "None";
            if (!mapped[name].includes(campusVal)) {
              mapped[name].push(campusVal);
            }
          });

          setSchoolsData(mapped);
        }
      } catch (err) {
        console.error("Error fetching registered schools:", err);
      } finally {
        setLoadingSchools(false);
      }
    };

    fetchRegisteredSchools();
  }, []);

  // Validation function for BUG-003, BUG-018, BUG-020, BUG-021
  const validateForm = () => {
    const errors = {};
    const lotErrors = {};

    if (!eventName.trim()) {
      errors.eventName = "Event name is required.";
    } else if (eventName.trim().length > 100) {
      errors.eventName = "Event name cannot exceed 100 characters.";
    }

    if (!eventDate) {
      errors.eventDate = "Event date is required.";
    } else {
      const todayStr = new Date().toISOString().split("T")[0];
      if (eventDate < todayStr) {
        errors.eventDate = "Event date cannot be in the past.";
      }
    }

    if (!eventStartTime) {
      errors.eventStartTime = "Start time is required.";
    }

    if (!eventEndTime) {
      errors.eventEndTime = "End time is required.";
    }

    if (eventDate && eventStartTime && eventEndTime) {
      const startDateTime = new Date(`${eventDate}T${eventStartTime}:00`);
      const endDateTime = new Date(`${eventDate}T${eventEndTime}:00`);
      if (endDateTime <= startDateTime) {
        errors.eventEndTime = "End time must be later than start time.";
      }
    }

    if (!eventDescription.trim()) {
      errors.eventDescription = "Event description is required.";
    } else if (eventDescription.trim().length > 2000) {
      errors.eventDescription = "Event description cannot exceed 2000 characters.";
    }

    if (!selectedSchool) {
      errors.selectedSchool = "Please select a registered school.";
    }

    if (!selectedCampus) {
      errors.selectedCampus = "Please select a campus.";
    }

    if (selectedVaccinations.length === 0) {
      errors.selectedVaccinations = "Please select at least one vaccination.";
    } else {
      // BUG-021: Strict lot number validation for each selected vaccine
      selectedVaccinations.forEach((vId) => {
        const val = vaccinationLotNumbers[vId];
        const err = validateLotNumber(val);
        if (err) {
          lotErrors[vId] = err;
        }
      });
    }

    if (Object.keys(lotErrors).length > 0) {
      errors.lotNumbers = lotErrors;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    if (!validateForm()) {
      ErrorToast("Please fix the validation errors below.");
      return;
    }

    // BUG-018 & BUG-020: Timezone-safe date and time serialization
    // Extract year, month, day to construct UTC midday to prevent shifting to next/previous day
    const [year, month, day] = eventDate.split("-").map(Number);
    const safeDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0)).toISOString();

    const eventStartDateTime = `${eventDate}T${eventStartTime}:00`;
    const eventEndDateTime = `${eventDate}T${eventEndTime}:00`;
    const timeFrom = new Date(eventStartDateTime).toISOString();
    const timeTo = new Date(eventEndDateTime).toISOString();

    // Map lot numbers to vaccine names
    const lotNumber = selectedVaccinations.reduce((acc, vaccinationId) => {
      const lotNumberValue = vaccinationLotNumbers[vaccinationId]?.trim();
      const vaccineItem = vaccinationsList.find((v) => v.id === vaccinationId);
      const vaccineName = vaccineItem ? vaccineItem.name : vaccinationId;
      acc[vaccineName] = lotNumberValue;
      return acc;
    }, {});

    const eventData = {
      title: eventName.trim(),
      schoolName: selectedSchool,
      schoolCampus: selectedCampus,
      description: eventDescription.trim(),
      date: safeDate,
      timeFrom,
      timeTo,
      lotNumber,
    };

    try {
      setSubmitting(true);
      const response = await axios.post("/admin/event", eventData);

      if (response?.data?.success) {
        SuccessToast("Event created successfully!");
        navigate("/events");
      } else {
        const msg = response?.data?.message || "Failed to create event. Please try again.";
        setGeneralError(msg);
        ErrorToast(msg);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      const msg = error?.response?.data?.message || "An error occurred while creating the event.";
      setGeneralError(msg);
      ErrorToast(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle vaccination checkbox change
  const handleVaccinationChange = (vaccinationId, checked) => {
    setSelectedVaccinations((prev) =>
      checked
        ? [...prev, vaccinationId]
        : prev.filter((id) => id !== vaccinationId)
    );

    if (fieldErrors.selectedVaccinations) {
      setFieldErrors((prev) => ({ ...prev, selectedVaccinations: null }));
    }
  };

  // Handle lot number change for each vaccine
  const handleLotNumberChange = (vaccinationId, lotNumber) => {
    setVaccinationLotNumbers((prev) => ({
      ...prev,
      [vaccinationId]: lotNumber,
    }));

    if (fieldErrors.lotNumbers?.[vaccinationId]) {
      setFieldErrors((prev) => ({
        ...prev,
        lotNumbers: { ...prev.lotNumbers, [vaccinationId]: null },
      }));
    }
  };

  const capitalizeFirstLetter = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <div className="w-full p-6 rounded-md shadow-md overflow-auto">
      <div className="flex items-center mb-6">
        <button
          type="button"
          onClick={() => navigate("/events")}
          className="text-black hover:text-gray-800 flex items-center gap-2 mr-2 text-xl"
        >
          <IoMdArrowBack />
        </button>
        <h3 className="text-2xl font-bold text-black">Create Event</h3>
      </div>

      <div className="w-full mx-auto p-8 bg-white shadow-lg rounded-lg max-w-4xl">
        {generalError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Name */}
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
                Event Name *
              </label>
              <span className={`text-xs ${eventName.length >= 100 ? "text-red-500 font-semibold" : "text-gray-500"}`}>
                {eventName.length}/100
              </span>
            </div>
            <input
              id="eventName"
              type="text"
              value={eventName}
              maxLength={100}
              onChange={(e) => {
                setEventName(capitalizeFirstLetter(e.target.value));
                if (fieldErrors.eventName) setFieldErrors((p) => ({ ...p, eventName: null }));
              }}
              className={`w-full p-3 mt-1 border text-black ${
                fieldErrors.eventName ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter event name"
            />
            {fieldErrors.eventName && (
              <p className="text-red-500 text-xs mt-1.5">{fieldErrors.eventName}</p>
            )}
          </div>

          {/* Event Date */}
          <div>
            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
              Event Date *
            </label>
            <input
              id="eventDate"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={eventDate}
              onChange={(e) => {
                setEventDate(e.target.value);
                if (fieldErrors.eventDate) setFieldErrors((p) => ({ ...p, eventDate: null }));
              }}
              className={`w-full p-3 mt-1 border text-black ${
                fieldErrors.eventDate ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {fieldErrors.eventDate && (
              <p className="text-red-500 text-xs mt-1.5">{fieldErrors.eventDate}</p>
            )}
          </div>

          {/* Start Time & End Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="eventStartTime" className="block text-sm font-medium text-gray-700">
                Start Time *
              </label>
              <input
                id="eventStartTime"
                type="time"
                value={eventStartTime}
                onChange={(e) => {
                  setEventStartTime(e.target.value);
                  if (fieldErrors.eventStartTime) setFieldErrors((p) => ({ ...p, eventStartTime: null }));
                }}
                className={`w-full p-3 mt-1 border text-black ${
                  fieldErrors.eventStartTime ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {fieldErrors.eventStartTime && (
                <p className="text-red-500 text-xs mt-1.5">{fieldErrors.eventStartTime}</p>
              )}
            </div>

            <div>
              <label htmlFor="eventEndTime" className="block text-sm font-medium text-gray-700">
                End Time *
              </label>
              <input
                id="eventEndTime"
                type="time"
                value={eventEndTime}
                onChange={(e) => {
                  setEventEndTime(e.target.value);
                  if (fieldErrors.eventEndTime) setFieldErrors((p) => ({ ...p, eventEndTime: null }));
                }}
                className={`w-full p-3 mt-1 border text-black ${
                  fieldErrors.eventEndTime ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {fieldErrors.eventEndTime && (
                <p className="text-red-500 text-xs mt-1.5">{fieldErrors.eventEndTime}</p>
              )}
            </div>
          </div>

          {/* Event Description */}
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">
                Event Description *
              </label>
              <span className={`text-xs ${eventDescription.length >= 2000 ? "text-red-500 font-semibold" : "text-gray-500"}`}>
                {eventDescription.length}/2000
              </span>
            </div>
            <textarea
              id="eventDescription"
              value={eventDescription}
              maxLength={2000}
              rows={3}
              onChange={(e) => {
                setEventDescription(capitalizeFirstLetter(e.target.value));
                if (fieldErrors.eventDescription) setFieldErrors((p) => ({ ...p, eventDescription: null }));
              }}
              className={`w-full p-3 mt-1 border text-black ${
                fieldErrors.eventDescription ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter event description"
            />
            {fieldErrors.eventDescription && (
              <p className="text-red-500 text-xs mt-1.5">{fieldErrors.eventDescription}</p>
            )}
          </div>

          {/* School Dropdown - BUG-004: Only registered schools */}
          <div>
            <label htmlFor="selectedSchool" className="block text-sm font-medium text-gray-700">
              Select School * {loadingSchools && <span className="text-xs text-gray-400">(Loading schools...)</span>}
            </label>
            <select
              id="selectedSchool"
              value={selectedSchool}
              onChange={(e) => {
                setSelectedSchool(e.target.value);
                setSelectedCampus("");
                if (fieldErrors.selectedSchool) setFieldErrors((p) => ({ ...p, selectedSchool: null }));
              }}
              className={`w-full p-3 mt-1 border text-black ${
                fieldErrors.selectedSchool ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
            >
              <option value="">Select a Registered School</option>
              {Object.keys(schoolsData).map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))}
            </select>
            {fieldErrors.selectedSchool && (
              <p className="text-red-500 text-xs mt-1.5">{fieldErrors.selectedSchool}</p>
            )}
          </div>

          {/* Campus Dropdown */}
          {selectedSchool && (
            <div>
              <label htmlFor="selectedCampus" className="block text-sm font-medium text-gray-700">
                Select Campus *
              </label>
              <select
                id="selectedCampus"
                value={selectedCampus}
                onChange={(e) => {
                  setSelectedCampus(e.target.value);
                  if (fieldErrors.selectedCampus) setFieldErrors((p) => ({ ...p, selectedCampus: null }));
                }}
                className={`w-full p-3 mt-1 border text-black ${
                  fieldErrors.selectedCampus ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
              >
                <option value="">Select a Campus</option>
                {(schoolsData[selectedSchool] || ["None"]).map((campus, index) => (
                  <option key={index} value={campus}>
                    {campus}
                  </option>
                ))}
              </select>
              {fieldErrors.selectedCampus && (
                <p className="text-red-500 text-xs mt-1.5">{fieldErrors.selectedCampus}</p>
              )}
            </div>
          )}

          {/* Vaccination Checkbox & Lot Numbers - BUG-003 & BUG-021 */}
          <div>
            <h4 className="block text-sm font-medium text-gray-700 mb-2">
              Select Vaccinations *
            </h4>

            {fieldErrors.selectedVaccinations && (
              <p className="text-red-500 text-xs mb-3">{fieldErrors.selectedVaccinations}</p>
            )}

            <div className="space-y-3 border p-4 rounded-lg bg-gray-50">
              {vaccinationsList.map((vaccination) => {
                const isChecked = selectedVaccinations.includes(vaccination.id);
                const lotErr = fieldErrors.lotNumbers?.[vaccination.id];

                return (
                  <div key={vaccination.id} className="p-2 bg-white rounded border border-gray-200">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          value={vaccination.id}
                          onChange={(e) => handleVaccinationChange(vaccination.id, e.target.checked)}
                          checked={isChecked}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <span className="text-sm font-medium text-black">{vaccination.name}</span>
                      </label>
                    </div>

                    {/* Lot Number Input for selected vaccine */}
                    {isChecked && (
                      <div className="mt-2 pl-6">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Lot Number * (3-20 characters, no symbols like @, #, $, %, ^, &, *, (, ), !, or emojis)
                        </label>
                        <input
                          type="text"
                          placeholder={`Enter lot number for ${vaccination.name}`}
                          value={vaccinationLotNumbers[vaccination.id] || ""}
                          onChange={(e) => handleLotNumberChange(vaccination.id, e.target.value)}
                          className={`w-full p-2 border text-black text-sm rounded-md ${
                            lotErr ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                          } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                        {lotErr && (
                          <p className="text-red-500 text-xs mt-1">{lotErr}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/events")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 transition"
            >
              {submitting ? "Creating Event..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
