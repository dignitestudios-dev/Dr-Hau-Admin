import React, { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SSNModal from "../../components/Students/SSNModal";
import ReportModal from "../../components/Students/ReportModal";
import axios from "../../axios";
import PasswordModal from "../../components/Students/PasswordModal";

const StudentProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [showSSN, setShowSSN] = useState(false);
  const [isSSNModalOpen, setIsSSNModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // Password modal state
  const [password, setPassword] = useState(""); // Password input
  const [passwordError, setPasswordError] = useState(""); // Error message for incorrect password
  const [isAuthorizedToViewMedical, setIsAuthorizedToViewMedical] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/admin/users/${userId}`);
        if (response.data.success) {
          setUserData(response.data.data);
        } else {
          console.error("Failed to fetch user data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleSSNModalToggle = () => setIsSSNModalOpen(!isSSNModalOpen);
  const handleReportModalToggle = () => setIsReportModalOpen(!isReportModalOpen);

  const handlePasswordSubmit = async () => {
    try {
      const response = await axios.post("/admin/password", { password });
      if (response.data.success) {
        setShowSSN(true); // Show SSN if password is correct
        setIsPasswordModalOpen(false); // Close password modal
        setIsAuthorizedToViewMedical(true); // Allow access to medical history
      } else {
        setPasswordError("Incorrect password. Please try again.");
      }
    } catch (error) {
      setPasswordError("An error occurred. Please try again.");
    }
  };

  const handleReportSubmit = () => setShowReport(true);

  // Navigate to the Medical History page when clicked
  const viewMedicalHistory = () => {
    if (isAuthorizedToViewMedical) {
      navigate(`/usermedicaldetails/${userId}`);
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  if (!userData) {
    return <div className="text-black p-4">Loading...</div>;
  }

  return (
    <div className="w-full p-6 rounded-md overflow-auto">
      <div className="flex items-center mb-4">
        <IoMdArrowBack onClick={() => navigate("/dashboard")} className="cursor-pointer text-[24px] text-gray-700 mr-2" />
        <h3 className="text-[24px] font-bold text-black">Student Profile</h3>
      </div>

      <div className="rounded-lg shadow-customShadow bg-white p-8">
        <div className="rounded-lg shadow-customShadow bg-gray-50 py-4 px-6 mb-6">
          <div className="grid grid-cols-1 mb-6">
            <p className="font-medium text-[20px] text-black">Personal Information</p>
          </div>
          
          {/* Profile Picture and Name */}
          <div className="flex items-center mb-6">
            <img
              src={userData.profilePicture || "/path/to/default-avatar.png"}
              alt="Profile"
              className="w-12 h-12 rounded-full mr-4"
            />
            <p className="text-[14px] text-[#181818] font-semibold">
              {userData?.firstName} {userData?.lastName}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
            <div>
              <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Name</p>
              <p className="text-[14px] text-[#181818]">{userData.firstName} {userData.lastName}</p>
            </div>
            <div className="w-[300px]">
              <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Date of Birth</p>
<p className="text-[14px] text-[#181818]">
  {new Date(userData.dob).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })}
</p>
            </div>

            
            <div className="w-[300px]">
              <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Program Attended</p>
              <p className="text-[14px] text-[#181818]">{userData?.programAttended}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
            <div>
              <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Last 4 SSN</p>
              <div className="flex items-center">
                <p className="text-[14px] text-[#181818]">
                  {showSSN ? userData.lastSSN : "*****"}
                </p>
                <button onClick={() => setIsPasswordModalOpen(true)} className="ml-2 text-black">
                  {showSSN ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="w-[300px]">
              <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Email</p>
              <p className="text-[14px] text-[#181818]">{userData?.email}</p>
            </div>
            <div className="w-[300px]">
              <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Medical Details</p>
              <button
                onClick={viewMedicalHistory}
                className="text-blue-500 underline"
              >
                {isAuthorizedToViewMedical ? "Click to view medical details" : "Password required to view"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SSNModal isOpen={isSSNModalOpen} onClose={handleSSNModalToggle} onSubmit={handlePasswordSubmit} />
      <ReportModal isOpen={isReportModalOpen} onClose={handleReportModalToggle} onSubmit={handleReportSubmit} />
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

export default StudentProfile;
