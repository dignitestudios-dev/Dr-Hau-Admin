import React, { useState, useEffect } from 'react';
import axios from '../../axios';

const EditEventModal = ({ isOpen, onRequestClose, eventData, onUpdateEvent }) => {
  const [description, setDescription] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [vaccinations, setVaccinations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const vaccinationOptions = [
    'Hepatitis B',
    'Rabies',
    'MMR',
    'Varicella',
    'TDAP',
    'FLU',
    'TD Vaccine'
  ];

  // Initialize modal state with current event data
  useEffect(() => {
    if (eventData) {
      setDescription(eventData.description);
      setTimeFrom(eventData.timeFrom);
      setTimeTo(eventData.timeTo);
      setVaccinations(eventData.vaccinations || []);
    }
  }, [eventData, isOpen]);

  // Handle checkbox change (add or remove vaccinations)
  const handleVaccinationChange = (e) => {
    const vaccination = e.target.value;
    setVaccinations((prevVaccinations) =>
      e.target.checked
        ? [...prevVaccinations, vaccination] // Add if checked
        : prevVaccinations.filter((v) => v !== vaccination) // Remove if unchecked
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const updatedEvent = {
      description,
      timeFrom,
      timeTo,
      vaccinations,
    };

    try {
      const response = await axios.post(`/admin/event/${eventData._id}`, updatedEvent);
      if (response.data.success) {
        onUpdateEvent(response.data.data); 
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
          <label className="block text-black font-medium mb-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border text-black rounded-md"
          />
        </div>

        <div className="mb-4">
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
        </div>

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
