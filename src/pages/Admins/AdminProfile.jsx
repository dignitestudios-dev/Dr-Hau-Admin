import React, { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";  // useParams to access the adminId from the URL
import axios from "../../axios";  // Make sure the axios instance is imported

const AdminProfile = () => {
  const navigate = useNavigate();
  const { adminId } = useParams();  // Get the adminId from the URL

  const [adminData, setAdminData] = useState(null);  // State to hold admin data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState("");  // Error state

  // Fetch admin details from the API using the adminId
  useEffect(() => {
    const fetchAdminDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/admin/school/${adminId}`);
        if (response.data.success) {
          setAdminData(response.data.data);  // Set the fetched admin data
        } else {
          setError("Failed to fetch admin data.");
        }
      } catch (error) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    if (adminId) {
      fetchAdminDetails();  // Fetch admin data if adminId is available
    }
  }, [adminId]);  // Re-fetch if adminId changes

  // Show loading or error state
  if (loading) {
    return <div className="text-black p-4">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // If the admin data is successfully fetched, render it
  return (
    <div className="w-full p-6 rounded-md overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[24px] font-bold text-black">Admin Profile</h3>
      </div>

      <div className="justify-center items-center">
        <div className="rounded-lg shadow-customShadow bg-white lg:h-[570px] p-8">
          <div className="rounded-xl shadow-customShadow bg-gray-50 border border-[#F9FAFB] py-4 px-6 mb-6">
            <div className="grid grid-cols-1 mb-6">
              <div className="flex items-center justify-between">
                <p className="font-medium text-[20px] text-black">Admin Information</p>
              </div>
            </div>

            <div className="grid grid-cols-1 mb-6">
              <img
                src={adminData?.profilePicture || "https://i.pravatar.cc/40?img=3"} // Use the profile picture from data
                alt="profile"
                className="w-14 h-14 rounded-full mx-2"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
              <div>
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Administrator Name</p>
                <p className="text-[14px] text-[#181818]">{adminData?.adminName}</p>
              </div>
              <div className="w-[300px]">
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">School Name</p>
                <p className="text-[14px] text-[#181818]">{adminData?.schoolName}</p>
              </div>
              <div className="w-[300px]">
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Program Attended</p>
                <p className="text-[14px] text-[#181818]">{adminData?.programDep}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
              <div>
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Campus</p>
                <p className="text-[14px] text-[#181818]">{adminData?.campus}</p>
              </div>
              <div className="w-[300px]">
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Email</p>
                <p className="text-[14px] text-[#181818]">{adminData?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
