import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";



const Profile = () => {
  const navigate = useNavigate();

  const data = {
    name: "Olivia Mery",
    school: "Lorem Ipsum",
    campus: "Lorem Ipsum",
    email: "oliviamery@gmail.com",
    program: "Lorem Ipsum",
    vaccination: "Hepatitis B Vaccination",
    appointmentDate: "Jun 12, 2024",
    appointmentTime: "09:00 A.M - 02:00 P.M",
  };

  return (
    <div className="w-full p-6 rounded-md overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[24px] font-bold text-black">Profile</h3>

      </div>

      <div className="justify-center items-center">
        <div className="rounded-lg shadow-customShadow bg-white lg:h-[570px] p-8">
          <div className="rounded-xl shadow-customShadow  bg-gray-50 border border-[#F9FAFB] py-4 px-6 mb-6">
            <div className="grid grid-cols-1 mb-6">
            <div className="flex items-center justify-between ">
              <p className="font-medium text-[20px] text-black">Personal Information</p>
              <button onClick={() => navigate("/edit-profile")} className="bg-black grid grid-cols-2 justify-center items-center text-white px-4 py-2 rounded-md">
                <AiFillEdit />
              
          Edit
        </button>
              </div>
            </div>
            <div className="grid grid-cols-1 mb-6">
              <img src="https://i.pravatar.cc/40?img=3" alt="profile" className="w-14 h-14 rounded-full mx-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
              <div>
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Administrator Name</p>
                <p className="text-[14px] text-[#181818]">{data?.name}</p>
              </div>
              <div className="w-[300px]">
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">School Name</p>
                <p className="text-[14px] text-[#181818]">{data?.school}</p>
              </div>
              <div className="w-[300px]">
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Program Attended</p>
                <p className="text-[14px] text-[#181818]">{data?.program}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
              <div>
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Campus</p>
                <p className="text-[14px] text-[#181818]">{data?.campus}</p>
              </div>
              <div className="w-[300px]">
                <p className="text-[14px] text-[#787F8C] font-semibold uppercase">Email</p>
                <p className="text-[14px] text-[#181818]">{data?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
