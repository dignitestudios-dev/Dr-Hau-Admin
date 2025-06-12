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
            <h4 className="text-[20px] font-bold text-black mb-4">
            <p className="text-[24px] text-black font-bold mb-4 ">{event?.title}
               {/* Status Badge */}
               <span className={`px-3 py-2 ml-2 text-[12px] rounded-full ${getStatusColor(event?.status)}`}>
    {capitalizeFirstLetter(event?.status)}
              </span>
            </p>
              <span className="text-[18px]">Description : {event?.description}</span>
              <br/>
              <span className="text-[14px] text-gray-500 font mb-4">🎓 School : {event?.school.schoolName}</span>
              <br/>
              <span className="text-[14px] text-gray-500  mb-4">🏛️ Campus : {event?.school.campus}</span>
              <br/>

              <span className="text-[14px] text-gray-500 mb-4">🏛️ Lot Numbers:</span>
<ul className="text-[14px] text-black mb-4">
  {Object.entries(event?.lotNumber || {}).map(([vaccine, lotNumber]) => (
    <li className='ml-5 text-gray-600' key={vaccine}>
      <span>{vaccine}:</span> {lotNumber}
    </li>
  ))}
</ul>
            </h4>

            <div className="flex items-center text-[14px] text-gray-700 mb-2">
<span className="mr-3">🕒</span> 
<p>
  {new Date(event?.timeFrom)?.toLocaleTimeString()} - {new Date(event?.timeTo)?.toLocaleTimeString()}
</p>
            </div>


            
            <div className="flex items-center text-[14px] text-gray-700 mb-4">
              <span className="mr-3">📅</span> {new Date(event?.date).toLocaleDateString()}
            </div>

            <div className="mb-4">
              <strong className="text-black">Vaccinations:</strong>
              <ul className="list-disc ml-5 text-[14px] text-[#858585]">
                {event?.vaccinations.map((vaccination, index) => (
                  <li key={index}>{vaccination}</li>
                ))}
              </ul>
            </div>
            {event?.status === "upcoming" ? (
              <>
              {/* Edit Event Button */}
            <button 
              onClick={openEditModal} 
              className="bg-black text-white px-4 py-2 rounded-md mr-4"
            >
              Edit Event
            </button>

            {/* Cancel Event Button */}
            <button 
              onClick={openCancelModal} 
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              disabled={event?.status === 'Cancelled'} // Disable if the event is already cancelled
            >
              {event.status === 'Cancelled' ? 'Event Cancelled' : 'Cancel Event'}
            </button>
              </>
            ):(
              <></>
            )}
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
