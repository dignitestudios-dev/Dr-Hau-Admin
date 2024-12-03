import React, { useEffect, useState } from "react";
import DashboardStats from "../../components/Dashboard/DashboardStats";
import DashboardAppointmentsTable from "../../components/Dashboard/DashboardAppointmentsTable";

const Home = () => {

  return (
    <>
      <div className="h-screen overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start bg-[#f8f8f8]">
        <h1 className="text-black text-[24px] font-bold">Dashboard</h1>
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <DashboardStats />
        </div>

        <div className="w-full bg-white p-6 rounded-[18px] shadow-xl ">
          <DashboardAppointmentsTable />
        </div>

        
      </div>
    </>
  );
};

export default Home;
