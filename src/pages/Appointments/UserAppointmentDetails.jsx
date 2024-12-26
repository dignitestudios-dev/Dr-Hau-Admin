import React, { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import axios from '../../axios'; // Ensure axios instance is imported
import ApproveModal from "../../components/Appointments/ApproveModal";
import RejectModal from "../../components/Appointments/RejectModal";
import MarkAsCompletedModal from "../../components/Appointments/MarkAsCompletedModal";
import { ErrorToast, SuccessToast } from "../../components/Global/Toaster";
import PasswordModal from "../../components/Students/PasswordModal";

const UserAppointmentDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const appointmentId = location.state?.appointment?._id;

  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [showApproveModal, setShowApproveModal] = useState(false);  // Track visibility of Approve Modal
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [ showCompleteModal, setShowCompleteModal] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // Password modal state
  const [password, setPassword] = useState(""); // Password input
  const [passwordError, setPasswordError] = useState(""); // Error message for incorrect password
  const [isAuthorizedToViewMedical, setIsAuthorizedToViewMedical] = useState(false);
  
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
        SuccessToast(response.data.message);
      }
    } catch (err) {
      console.error(err);
      ErrorToast(err.response.data.message)
    }
  };

  const handleComplete = async (approval) => {
    const currentDate = new Date().toISOString();
    
    const requestBody = {
      date: currentDate,
      appointmentId: appointmentId,
      status: true
    };

    try {
      const response = await axios.post('/admin/appointment/status', requestBody);
      if (response?.data?.success) {
        SuccessToast(response?.data?.message);
        setShowCompleteModal(false)
      }
    } catch (err) {
      ErrorToast(err.response?.data?.message)
      console.error(err);
    }
  };

  
  const handlePasswordSubmit = async () => {
    try {
      const response = await axios.post("/admin/password", { password });
      if (response.data.success) {
        setPassword(""); // Reset password input
        setPasswordError(""); // Clear any previous error
        setIsPasswordModalOpen(false); // Close modal
        setIsAuthorizedToViewMedical(true); // Allow access to medical history
      } else {
        setPasswordError("Incorrect password. Please try again.");
      }
    } catch (error) {
      setPasswordError("An error occurred. Please try again.");
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

  const data = appointmentData && appointmentData?.user ? appointmentData?.user : {};
  const event = appointmentData?.event;

  // Check if vaccinations array is empty
  const vaccinations = appointmentData?.vaccinations || [];

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
            src={data?.profilePicture || "https://i.pravatar.cc/?img=8"} 
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500"
          />
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-gray-800">{data?.firstName} {data?.lastName}</p>
            <p className="text-sm text-gray-500">{data?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
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
            { label: "", value:  '' },
          ].map((item, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <p className="text-xs font-semibold text-gray-500">{item?.label}</p>
              <p className="text-sm text-gray-700">{item?.value}</p>
            </div>
          ))}
        <div className="bg-white rounded-lg mt-8 space-y-4 justify-start">
          <h4 className="text-xl font-semibold text-gray-800">Vaccinations</h4>
          <ul className="list-disc pl-5">
            {vaccinations?.length > 0 ? (
              vaccinations?.map((vaccination, index) => (
                <li key={index} className="text-sm text-gray-700">{vaccination}</li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No vaccinations recorded.</p>
            )}
          </ul>
        </div>
        <div className="bg-white rounded-lg  mt-8 space-y-4">
          <h4 className="text-xl font-semibold text-gray-800">Medical History</h4>
          <div className="bg-white rounded-lg mt-8 space-y-4">
  <ul className="list-disc pl-5">
    
    {isAuthorizedToViewMedical ? (
      <li
        className="text-blue-600 text-sm cursor-pointer underline"
        onClick={() => navigate("/medicaldetail", { state: appointmentData })}
      >
        Click to view medical details
      </li>
    ) : (
      <li
        className="text-blue-600 text-sm cursor-pointer underline"
        onClick={() => setIsPasswordModalOpen(true)}
      >
        Password required to view
      </li>
    )}
  </ul>
</div>

        </div>
        </div>
        {
          appointmentData?.status === "completed" ? (
            <></>
          ) :(
            <>
            {vaccinations.length > 0 && (
              <div className="flex justify-start space-x-4 mt-8">
    
    {/* Mark as Completed Button */}
  {approvalStatus === 'approved' && (
    <button
      onClick={() => setShowCompleteModal(true)} // Open Complete Modal
      className="bg-green-500 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-xl transition-transform transform hover:scale-105"
    >
      Mark as Completed
    </button>
  )}
                {/* Approve Button */}
                {approvalStatus === 'approved' ? (
                  <button
                    disabled
                    className="display:none"
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
                {!(approvalStatus === 'rejected' || approvalStatus === 'approved') && (
  <button
    onClick={() => setShowRejectModal(true)}  // Open Reject Modal
    className="bg-red-500 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-xl transition-transform transform hover:scale-105"
  >
    Reject
  </button>
)}
    
    
              </div>
            )}
            </>
          )
        }

        {/* Conditional Rendering for Approve and Reject Buttons */}
        
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

      <MarkAsCompletedModal show={showCompleteModal}
        onConfirm={() => { handleComplete(false); setShowCompleteModal(false); }}  // Confirm rejection
        onCancel={() => setShowCompleteModal(false)}/>



<PasswordModal
  isOpen={isPasswordModalOpen}
  onClose={() => setIsPasswordModalOpen(false)}
  onSubmit={handlePasswordSubmit}
  errorMessage={passwordError}
  password={password}
  setPassword={setPassword}
/>


    </div>
  );
};

export default UserAppointmentDetails;
