import React, { useState, useEffect } from 'react'; 
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios'; 
import { IoMdArrowBack } from 'react-icons/io';
import EventAppointmentsTable from '../../components/Events/EventAppointmentsTable';  // Assuming this table component is available
import EditEventModal from '../../components/Events/EditEventModal';  // Import the modal
import CancelEventModal from '../../components/Events/CancelEventModal';
import { FaSchool } from "react-icons/fa";
import { formatTimeUTC } from '../../constants/utility';


const EventDetail = () => {
  const location = useLocation(); 
  const { status } = location.state || {};
  const { eventId } = useParams();  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // State for cancel modal
  const navigate = useNavigate();

  // Fetch event details by ID
  const fetchEventDetails = async () => {
    try {
      const response = await axios?.post(`/admin/event/get/${eventId}`);  
      if (response?.data?.success) {
        setEvent(response?.data?.data);
      } else {
        setError('Event not found');
      }
    } catch (err) {
      setError('Error fetching event details');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchEventDetails();
  }, [eventId]);

  // Function to handle Edit Event Modal
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const updateEventData = (updatedEvent) => {
    setEvent(updatedEvent); // Update the event with new data from modal
  };

  // Function to handle Cancel Event Modal
  const openCancelModal = () => {
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  const handleEventCancelled = () => {
    setEvent((prevEvent) => ({ ...prevEvent, status: 'Cancelled' })); // Update event status to cancelled
  };

  if (loading) {
    return <p className='text-black p-4'>Loading event details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Determine the color for the event status
  const getStatusColor = (status) => {
    switch (status) {
      case 'cancelled':
        return 'bg-red-500 text-white'; // Red
      case 'completed':
        return 'bg-green-500 text-white'; // Green
      case 'upcoming':
        return 'bg-yellow-500 text-white'; // Yellow
      default:
        return 'bg-gray-500 text-white'; // Default gray if status is unknown
    }
  };

  const capitalizeFirstLetter = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

  return (
    <div className="w-full h-auto p-6 bg-gray-100 overflow-auto">

        <div className="flex items-center mb-6">
        <IoMdArrowBack 
          onClick={() => navigate("/events")} 
          className="text-[24px] text-gray-700 mr-3" 
        />
        <h3 className="text-[24px] font-bold text-black">Event Detail</h3>
      </div>

      <div className="bg-white shadow-md rounded-md p-6">
        <div className="flex mb-6 border-b">
          <button
            className={`mr-4 pb-2 text-[16px] font-semibold ${activeTab === 'details' ? 'text-black border-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button
            className={`pb-2 text-[16px] font-semibold ${activeTab === 'appointments' ? 'text-black border-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('appointments')}
          >
            Appointments
          </button>
        </div>

        {activeTab === 'details' ? (
          <div>
            <div className=" mx-auto bg-white rounded-lg ">
  <h4 className="text-[24px] font-bold text-black mb-6 flex items-center justify-between">
    {event?.title}
    {/* Status Badge */}
    <span className={`px-3 py-2 ml-3 text-[12px]  rounded-full ${getStatusColor(event?.status)}`}>
      {capitalizeFirstLetter(event?.status)}
    </span>
  </h4>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="border p-4 rounded-md">
      <div className="text-[18px] mb-2">
        <strong className='text-black'>Description:</strong>
        <p className="text-gray-600">{event?.description}</p>
      </div>
    </div>

    <div className="border p-4 rounded-md">
        <strong className='text-black'>Campus:</strong>

      <div className="text-[14px] text-gray-500 mt-2">
        
        <span className="mr-2">🎓</span>{event?.school.schoolName}
      </div>
      <div className="text-[14px] text-gray-500">
        <span className="mr-2">🏛️</span>{event?.school.campus}
      </div>
    </div>

    <div className="border p-4 rounded-md col-span-1 md:col-span-2">
      <strong className="block text-black mb-2">🏛️ Lot Numbers:</strong>
      <div className="rounded-md col-span-1 md:col-span-2">
  <ul className="flex flex-wrap text-[14px] text-gray-600 gap-6">
    {Object.entries(event?.lotNumber || {}).map(([vaccine, lotNumber]) => (
      <li className="flex items-center" key={vaccine}>
        <span className="font-semibold">{vaccine}:</span> {lotNumber}
      </li>
    ))}
  </ul>
</div>

    </div>

    <div className="border p-4 rounded-md">
      <div className="flex items-center text-[14px] text-gray-700">
        <span className="mr-3">🕒</span>
        <p>{new Date(event?.timeFrom)?.toLocaleTimeString()} - {new Date(event?.timeTo)?.toLocaleTimeString()}</p>
      </div>
    </div>

    <div className="border p-4 rounded-md">
      <div className="flex items-center text-[14px] text-gray-700">
        <span className="mr-3">📅</span>
        <p>{new Date(event?.date).toLocaleDateString()}</p>
      </div>
    </div>

   <div className="border p-4 rounded-md col-span-1 md:col-span-2">
  <strong className="text-black mb-2">Vaccinations:</strong>
  <ul className="flex flex-wrap gap-4 text-[14px] text-[#858585]">
    {event?.vaccinations.map((vaccination, index) => (
      <li key={index} className="flex items-center">
        {vaccination}
      </li>
    ))}
  </ul>
</div>

  </div>

  {event?.status === "upcoming" && (
    <div className="mt-6 flex gap-4">
      {/* Edit Event Button */}
      <button
        onClick={openEditModal}
        className="bg-black text-white px-4 py-3 rounded-md text-sm font-semibold hover:bg-gray-800 transition-colors"
      >
        Edit Event
      </button>

      {/* Cancel Event Button */}
      <button
        onClick={openCancelModal}
        className="bg-red-500 text-white px-4 py-3 rounded-md text-sm text-lg font-semibold hover:bg-red-600 transition-colors"
        disabled={event?.status === 'Cancelled'}
      >
        {event?.status === 'Cancelled' ? 'Event Cancelled' : 'Cancel Event'}
      </button>
    </div>
  )}
</div>

          </div>
        ) : (
          <EventAppointmentsTable eventId={eventId} />
        )}
      </div>
      
      {/* Edit Event Modal */}
      <EditEventModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        eventData={event}
        onUpdateEvent={fetchEventDetails}
      />

      {/* Cancel Event Modal */}
      <CancelEventModal
        isOpen={isCancelModalOpen}
        onRequestClose={closeCancelModal}
        eventId={eventId}
        onCancelEvent={handleEventCancelled}
      />
    </div>
  );
};

export default EventDetail;
