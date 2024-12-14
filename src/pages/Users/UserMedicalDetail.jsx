import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";

const UserMedicalDetails = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

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

  if (!userData) {
    return <div className="text-black p-4">Loading user data...</div>;
  }

  const { medicalHistory, profilePicture, email, firstName, lastName, dob, lastSSN, schoolName, programAttended, campus, gender, isProfileComplete } = userData;

  return (
    <div className="w-full h-auto bg-gray-100 p-10 overflow-auto">
      {/* <h2 className="text-4xl font-semibold text-left mb-8 text-gray-800">Medical History</h2> */}

      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 space-y-8">
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">{firstName} {lastName}</h3>
            <p className="text-lg text-gray-600">{email}</p>
            <p className="text-lg text-gray-600">School: {schoolName} ({campus})</p>
            <p className="text-lg text-gray-600">Program: {programAttended}</p>
            <p className="text-lg text-gray-600">Gender: {gender}</p>
            <p className="text-lg text-gray-600">Date of Birth: {new Date(dob).toLocaleDateString()}</p>
            {/* <p className="text-lg text-gray-600">SSN: {lastSSN}</p> */}
            {/* <p className="text-lg text-gray-600">Profile Complete: {isProfileComplete ? "Yes" : "No"}</p> */}
          </div>
        </div>

        {/* Medical History Section */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Medical History</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Medical Problems</label>
            <p className="text-lg text-gray-600">{medicalHistory.medicalProblems}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Surgeries</label>
            <p className="text-lg text-gray-600">{medicalHistory.surgeries}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Medications</label>
            <p className="text-lg text-gray-600">{medicalHistory.medications}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Allergies</label>
            <p className="text-lg text-gray-600">{medicalHistory.allergies}</p>
          </div>

          {/* Pregnancy & Health Conditions */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Is Pregnant</label>
            <p className="text-lg text-gray-600">{medicalHistory.isPregnant ? "Yes" : "No"}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Exercise Regularly</label>
            <p className="text-lg text-gray-600">{medicalHistory.isExercise ? "Yes" : "No"}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Is Healthy</label>
            <p className="text-lg text-gray-600">{medicalHistory.isHealthy ? "Yes" : "No"}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Has TB</label>
            <p className="text-lg text-gray-600">{medicalHistory.isTB ? "Yes" : "No"}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Uses Tobacco</label>
            <p className="text-lg text-gray-600">{medicalHistory.isTobacco ? "Yes" : "No"}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Alcoholic</label>
            <p className="text-lg text-gray-600">{medicalHistory.isAlcoholic ? "Yes" : "No"}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Is Bending</label>
            <p className="text-lg text-gray-600">{medicalHistory.isBending ? "Yes" : "No"}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Is Lifting</label>
            <p className="text-lg text-gray-600">{medicalHistory.isLifting ? "Yes" : "No"}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Is Moving Hands</label>
            <p className="text-lg text-gray-600">{medicalHistory.isMovingHands ? "Yes" : "No"}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <label className="block text-xl font-medium text-gray-700 mb-2">Vision or Hearing Issues</label>
            <p className="text-lg text-gray-600">{medicalHistory.isVisionOrHearing ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMedicalDetails;
