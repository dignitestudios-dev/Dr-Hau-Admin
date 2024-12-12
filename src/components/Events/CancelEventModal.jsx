import React, { useState } from 'react';
import axios from '../../axios'; // Import axios to make the API request
import { IoMdClose } from 'react-icons/io'; // Close Icon

const CancelEventModal = ({ isOpen, onRequestClose, eventId, onCancelEvent }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCancelEvent = async () => {
    setLoading(true);
    const currentDate = new Date().toISOString(); // Current date for cancel API

    try {
      const response = await axios.post(`/admin/event/cancel/${eventId}`, {
        currentDate,
      });

      if (response.data.success) {
        onCancelEvent(); // Update the event status in parent component
        onRequestClose(); // Close the modal
      } else {
        setError('Failed to cancel the event. Please try again later.');
      }
    } catch (err) {
      setError('Error cancelling the event.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-[400px]">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-black">Confirm Cancellation</h3>
          <IoMdClose 
            onClick={onRequestClose} 
            className="cursor-pointer text-gray-500 text-2xl" 
          />
        </div>

        <p className="mt-4 text-sm text-gray-700">
          Are you sure you want to cancel this event? This action cannot be undone.
        </p>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="mt-6 flex justify-end gap-4">
          <button 
            onClick={onRequestClose} 
            className="px-4 py-2 text-sm font-semibold text-gray-600 border rounded-md"
          >
            Cancel
          </button>
          <button 
            onClick={handleCancelEvent}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md"
            disabled={loading}
          >
            {loading ? 'Cancelling...' : 'Cancel Event'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelEventModal;
