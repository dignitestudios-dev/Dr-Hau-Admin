import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { validateLotNumber } from '../../constants/utility';

const EditEventModal = ({ isOpen, onRequestClose, eventData, onUpdateEvent }) => {
  const [description, setDescription] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [vaccinations, setVaccinations] = useState([]); // This is no longer needed for the backend
  const [vaccinationLotNumbers, setVaccinationLotNumbers] = useState({}); // This will hold the lot numbers
  const [lotErrors, setLotErrors] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const vaccinationOptions = [
    'Hepatitis B',
    'Rabies',
    'MMR',
    'Varicella',
    'Tdap', // Changed from 'TDAP' to 'Tdap'
    'FLU',
    // 'Tdap', // Changed from 'TD Vaccine' to 'Tdap' for consistency
  ];

  // Initialize modal state with current event data
useEffect(() => {
  if (eventData) {
    setDescription(eventData.description);
    setTimeFrom(eventData.timeFrom);
    setTimeTo(eventData.timeTo);

    console.log('Event Data:', eventData);
    
    // Initialize the selected vaccinations and lot numbers
    setVaccinations(eventData.vaccinations || []);  // Set the selected vaccinations
    const initialLotNumbers = {};
    eventData.lotNumber && Object.entries(eventData.lotNumber).forEach(([vaccination, lotNumber]) => {
      initialLotNumbers[vaccination] = lotNumber;
    });
    setVaccinationLotNumbers(initialLotNumbers);
  }
}, [eventData, isOpen]);


  // Handle checkbox change (add or remove vaccinations)
  const handleVaccinationChange = (e) => {
    const vaccination = e.target.value;
    if (e.target.checked) {
      // If checked, add to vaccination list
      setVaccinations((prevVaccinations) => [...prevVaccinations, vaccination]);
    } else {
      // If unchecked, remove from vaccination list
      setVaccinations((prevVaccinations) => prevVaccinations.filter((v) => v !== vaccination));
    }
  };

  // Handle lot number change
  const handleLotNumberChange = (vaccination, lotNumber) => {
    setVaccinationLotNumbers((prevLotNumbers) => ({
      ...prevLotNumbers,
      [vaccination]: lotNumber,
    }));
    if (lotErrors[vaccination]) {
      setLotErrors((prev) => ({ ...prev, [vaccination]: null }));
    }
  };

  const handleSubmit = async () => {
    setError(null);

    // Validate lot numbers for each selected vaccination
    const errors = {};
    for (const v of vaccinations) {
      const lotVal = vaccinationLotNumbers[v];
      const err = validateLotNumber(lotVal);
      if (err) {
        errors[v] = err;
      }
    }

    if (Object.keys(errors).length > 0) {
      setLotErrors(errors);
      setError("Please fix the lot number errors before saving.");
      return;
    }

    setLoading(true);

    // Now send the lot numbers as an object
    const updatedEvent = {
      description,
      timeFrom,
      timeTo,
      lotNumber: vaccinationLotNumbers, // Send only lotNumber field now
    };

    try {
      const response = await axios.post(`/admin/event/${eventData._id}`, updatedEvent);
      if (response.data.success) {
        onUpdateEvent();
        onRequestClose();
      } else {
        setError('Failed to update event. Please try again later.');
      }
    } catch (err) {
      setError('Error updating event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${isOpen ? 'block' : 'hidden'}`}
      onClick={onRequestClose}
    >
      <div
        className="bg-white p-6 rounded-md max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl text-black font-semibold mb-4">Edit Event</h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-black font-medium" htmlFor="description">
              Description
            </label>
            <span className={`text-xs ${(description?.length || 0) >= 2000 ? "text-red-500 font-semibold" : "text-gray-500"}`}>
              {description?.length || 0}/2000
            </span>
          </div>
          <input
            type="text"
            id="description"
            value={description}
            maxLength={2000}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border text-black rounded-md"
          />
        </div>

        {/* <div className="mb-4">
          <label className="block text-black font-medium mb-2" htmlFor="timeFrom">
            Start Time
          </label>
          <input
            type="datetime-local"
            id="timeFrom"
            value={timeFrom}
            onChange={(e) => setTimeFrom(e.target.value)}
            className="w-full p-2 text-gray-700 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black font-medium mb-2" htmlFor="timeTo">
            End Time
          </label>
          <input
            type="datetime-local"
            id="timeTo"
            value={timeTo}
            onChange={(e) => setTimeTo(e.target.value)}
            className="w-full p-2 text-gray-700 border rounded-md"
          />
        </div> */}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="vaccinations">
            Vaccinations
          </label>
          <div className="space-y-2">
            {vaccinationOptions.map((vaccination) => (
              <div key={vaccination} className="flex items-center">
                <input
                  type="checkbox"
                  id={vaccination}
                  value={vaccination}
                  checked={vaccinations.includes(vaccination)}
                  onChange={handleVaccinationChange}
                  className="mr-2"
                />
                <label htmlFor={vaccination} className="text-gray-700">{vaccination}</label>

                {/* Lot Number Input */}
                {vaccinations.includes(vaccination) && (
                  <div className="ml-4 flex flex-col">
                    <input
                      type="text"
                      placeholder="Lot number (3-20 chars)"
                      value={vaccinationLotNumbers[vaccination] || ''}
                      onChange={(e) => handleLotNumberChange(vaccination, e.target.value)}
                      className={`p-2 border ${
                        lotErrors[vaccination] ? "border-red-500 ring-1 ring-red-500" : "border-black"
                      } text-black rounded-lg shadow-sm`}
                    />
                    {lotErrors[vaccination] && (
                      <p className="text-red-500 text-xs mt-1">{lotErrors[vaccination]}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onRequestClose}
            className="border text-gray-600 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEventModal;
