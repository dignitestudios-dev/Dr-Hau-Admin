import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { CgFileDocument } from "react-icons/cg";
import { IoDocumentOutline } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import { FaSpinner } from "react-icons/fa"; 
import axios from '../../axios'; 

const DashboardStats = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    admins: 0,
    appointments: 0,
    events: 0,
    upcomingEvents: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios?.get('/admin/stats');
        if (response?.data?.success) {
          setStats(response?.data?.data);
        } else {
          setError('Failed to fetch statistics');
        }
      } catch (err) {
        setError('Error fetching statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="w-full lg:w-[70%] grid grid-cols-2 lg:grid-cols-5 justify-start items-start gap-2 lg:gap-[280px]">
        <StatCard loading={true} />
        <StatCard loading={true} />
        <StatCard loading={true} />
        <StatCard loading={true} />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="w-full lg:w-[70%] grid grid-cols-2 lg:grid-cols-5 justify-start items-start gap-2 lg:gap-[280px]">
      <StatCard 
        title="Total Users" 
        value={stats?.users} 
        icon={<FiUsers />} 
        onClick={() => navigate("/users")}
      />
      <StatCard 
        title="Upcoming Events" 
        value={stats?.upcomingEvents} 
        icon={<CgFileDocument />} 
        onClick={() => navigate("/events")}
      />
      <StatCard 
        title="Appointments" 
        value={stats?.appointments} 
        icon={<IoDocumentOutline />} 
        onClick={() => navigate("/appointments")}
      />
      <StatCard 
        title="Admins" 
        value={stats?.admins} 
        icon={<RiAdminLine />} 
        onClick={() => navigate("/admins")}
      />
    </div>
  );
};

// StatCard component
const StatCard = ({ title, value, icon, loading, onClick }) => {
  return (
    <div 
      className="w-full lg:w-[240px] h-[100px] rounded-[8px] border border-gray-300 bg-white p-[12px] flex gap-2 items-center justify-start cursor-pointer"
      onClick={onClick}
    >
      <span className="w-[32px] h-[32px] rounded-md bg-black text-white[#35CFFF] text-2xl flex items-center justify-center mb-4">
        {loading ? (
          <FaSpinner className="animate-spin h-6 w-6 text-gray-400" /> // Loading spinner icon
        ) : (
          icon
        )}
      </span>
      <div className="w-auto flex flex-col justify-start items-start">
        {loading ? (
          <div className="h-6 bg-gray-200 w-[80%] rounded-full animate-pulse" /> // Placeholder for loading
        ) : (
          <>
            <span className="text-[28px] font-bold text-black">{value}</span>
            <span className="text-black text-[14px] font-normal">{title}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardStats;
