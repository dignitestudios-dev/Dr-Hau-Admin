import React, { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import axios from '../../axios'; // Ensure axios instance is imported
import ApproveModal from "../../components/Appointments/ApproveModal";
import RejectModal from "../../components/Appointments/RejectModal";

const UserAppointmentDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const appointmentId = location.state?.appointment?._id;

  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [showApproveModal, setShowApproveModal] = useState(false);  // Track visibility of Approve Modal
  const [showRejectModal, setShowRejectModal] = useState(false);    // Track visibility of Reject Modal

  useEffect(() => {
    if (appointmentId) {
      const fetchAppointmentDetails = async () => {
        try {
          const response = await axios.get(`/admin/appointments/${appointmentId}`);
          if (response.data.success) {
            setAppointmentData(response.data.data);
            setApprovalStatus(response.data.data.approval);
          }
        } catch (err) {
          setError("Error fetching appointment details.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchAppointmentDetails();
    }
  }, [appointmentId]);

  const handleApproval = async (approval) => {
    const currentDate = new Date().toISOString();
    
    const requestBody = {
      currentDate: currentDate,
      appointmentId: appointmentId,
      approval: approval
    };

    try {
      const response = await axios.post('/admin/appointment/approvalStatus', requestBody);
      if (response.data.success) {
        setApprovalStatus(approval);
        alert(response.data.message);
      } else {
        alert("Failed to update approval status.");
      }
    } catch (err) {
      alert("Error occurred while updating approval status.");
      console.error(err);
    }
  };

  // Loading or error handling UI
  if (loading) {
    return (
      <div className="w-full p-6 bg-gray-100 h-auto overflow-auto mt-1">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-black flex items-center transition-colors hover:text-gray-700"
          >
            <IoMdArrowBack className="text-2xl" />
          </button>
          <h3 className="text-3xl font-semibold text-black ml-2">Loading...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 bg-gray-100 h-auto overflow-auto mt-1">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-black flex items-center transition-colors hover:text-gray-700"
          >
            <IoMdArrowBack className="text-2xl" />
          </button>
          <h3 className="text-3xl font-semibold text-black ml-2">Error: {error}</h3>
        </div>
      </div>
    );
  }

  const data = appointmentData && appointmentData.user ? appointmentData.user : {};
  const event = appointmentData?.event;

  return (
    <div className="w-full p-6 bg-gray-100 h-auto overflow-auto mt-1">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-black flex items-center transition-colors hover:text-gray-700"
        >
          <IoMdArrowBack className="text-2xl" />
        </button>
        <h3 className="text-3xl font-semibold text-black ml-2">User Appointment</h3>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-8 space-y-8">
        <div className="flex items-center space-x-6 border-b pb-6">
          <img
            src={data.profilePicture || "https://i.pravatar.cc/?img=8"} 
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500"
          />
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-gray-800">{data?.firstName} {data?.lastName}</p>
            <p className="text-sm text-gray-500">{data?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[ 
            { label: "Date of Birth", value: new Date(data?.dob).toLocaleDateString() },
            { label: "School Name", value: appointmentData?.user?.schoolName || 'N/A' },
            { label: "Program", value: appointmentData?.user?.programAttended || 'N/A' },
            { label: "Campus", value: appointmentData?.user?.campus || 'N/A' },
            { label: "Email", value: data?.email },
            { label: "Appointment Status", value: appointmentData?.status },
            { label: "Appointment Date", value: new Date(appointmentData?.date).toLocaleDateString() },
            { label: "Event Description", value: event?.description || 'N/A' },
            { label: "Event Time", value: `${new Date(event?.timeFrom).toLocaleTimeString()} - ${new Date(event?.timeTo).toLocaleTimeString()}` },
            { label: "Lot Number", value: event?.lotNumber || 'N/A' },
          ].map((item, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <p className="text-xs font-semibold text-gray-500">{item.label}</p>
              <p className="text-sm text-gray-700">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 mt-8 space-y-4">
          <h4 className="text-xl font-semibold text-gray-800">Vaccinations</h4>
          <ul className="list-disc pl-5">
            {appointmentData?.vaccinations?.map((vaccination, index) => (
              <li key={index} className="text-sm text-gray-700">{vaccination}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          {/* Approve Button */}
          {approvalStatus === 'approved' ? (
            <button
              disabled
              className="bg-green-500 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-xl transition-transform transform hover:scale-105"
            >
              Approved
            </button>
          ) : (
            <button
              onClick={() => setShowApproveModal(true)}  // Open Approve Modal
              disabled={approvalStatus === 'approved'}
              className="bg-green-500 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-xl transition-transform transform hover:scale-105"
            >
              Approve
            </button>
          )}

          {/* Reject Button */}
          {approvalStatus === 'rejected' ? (
            <button
              disabled
              className="bg-red-500 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-xl transition-transform transform hover:scale-105"
            >
              Rejected
            </button>
          ) : (
            <button
              onClick={() => setShowRejectModal(true)}  // Open Reject Modal
              disabled={approvalStatus === 'rejected'}
              className="bg-red-500 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-xl transition-transform transform hover:scale-105"
            >
              Reject
            </button>
          )}
        </div>
      </div>

      {/* Approve Modal */}
      <ApproveModal
        show={showApproveModal}
        onConfirm={() => { handleApproval(true); setShowApproveModal(false); }}  // Confirm approval
        onCancel={() => setShowApproveModal(false)}  // Cancel approval
      />

      {/* Reject Modal */}
      <RejectModal
        show={showRejectModal}
        onConfirm={() => { handleApproval(false); setShowRejectModal(false); }}  // Confirm rejection
        onCancel={() => setShowRejectModal(false)}  // Cancel rejection
      />
    </div>
  );
};

export default UserAppointmentDetails;
