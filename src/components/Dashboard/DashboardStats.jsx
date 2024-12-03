import React from "react";
import { FaRegUser } from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { IoDocumentOutline } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";






const DashboardStats = () => {
  const navigate = useNavigate();

 

  return (
    <div className="w-full lg:w-[70%] grid grid-cols-2 lg:grid-cols-5 justify-start items-start gap-2 lg:gap-[280px]">
      <div className="w-full lg:w-[240px] h-[100px] rounded-[8px] border border-gray-300 bg-white p-[12px] flex gap-2 items-center justify-start">
        <span className="w-[32px] h-[32px] rounded-md bg-black text-white[#35CFFF] text-2xl flex items-center justify-center mb-4">
        <FiUsers className="h-4" />
        </span>
        <div  onClick={() => navigate("/users")} className="w-auto flex flex-col justify-start items-start">
          <span className="text-[28px] font-bold text-black">15</span>
          <span className="text-black text-[14px] font-normal">Total Users</span>
        </div>
      </div>
      <div  onClick={() => navigate("/events")} className="w-full lg:w-[240px] h-[100px] rounded-[8px] border border-gray-300 bg-white p-[12px] flex gap-2 items-center justify-start">
        <span className="w-[32px] h-[32px] rounded-md bg-black text-white[#35CFFF] text-2xl flex items-center justify-center mb-4">
          <CgFileDocument className="h-4" />

        </span>
        <div className="w-auto flex flex-col justify-start items-start">
          <span className="text-[28px] font-bold text-black">06</span>
          <span className="text-black text-[14px] font-normal">Upcoming Events</span>
        </div>
      </div>
      <div onClick={() => navigate("/appointments")} className="w-full lg:w-[240px] h-[100px] rounded-[8px] border border-gray-300 bg-white p-[12px] flex gap-2 items-center justify-start">
        <span className="w-[32px] h-[32px] rounded-md bg-black text-white[#35CFFF] text-2xl flex items-center justify-center mb-4">
          <IoDocumentOutline className="h-4" />
        </span>
        <div className="w-auto flex flex-col justify-start items-start">
          <span className="text-[28px] font-bold text-black">13</span>
          <span className="text-black text-[14px] font-normal">Appointments</span>
        </div>
      </div>
      <div className="w-full lg:w-[240px] h-[100px] rounded-[8px] border border-gray-300 bg-white p-[12px] flex gap-2 items-center justify-start">
        <span className="w-[32px] h-[32px] rounded-md bg-black text-white[#35CFFF] text-2xl flex items-center justify-center mb-4">
          <RiAdminLine className="h-4" />
        </span>
        <div className="w-auto flex flex-col justify-start items-start">
          <span className="text-[28px] font-bold text-black">10</span>
          <span className="text-black text-[14px] font-normal">Admins</span>
        </div>
      </div>

      
    </div>
  );
};

export default DashboardStats;
