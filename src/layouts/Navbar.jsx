import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { IoNotificationsOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import NotificationDropdown from "../components/Notifications/NotificationDropdown";

const Navbar = () => {
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNotificationClick = () => {
    navigate("/notifications"); // Redirect to /notifications
    setIsDropdownOpen(false); // Optionally close the dropdown when navigating
  };

  return (
    <div className="w-full h-[60px] bg-black flex justify-end items-center px-4 relative">
      <div className="flex items-center gap-6 py-4 font-normal text-gray-900">
        <div className="relative">
          <button
            onClick={handleNotificationClick} // Use handleNotificationClick to navigate to /notifications
            className="w-[29px] h-[29px] rounded-lg flex items-center justify-center bg-[#252525] p-1 relative"
          >
            <IoNotificationsOutline className="text-white w-full h-full" />
            <GoDotFill className="w-[20px] h-[20px] text-[#F44237] absolute -top-2 -right-1" />
          </button>

          {isDropdownOpen && <NotificationDropdown />}
        </div>

        <button
          onClick={() => navigate("/change-password")} // Navigate to the profile page when clicked
          className="flex items-center gap-2 relative"
        >
          {/* <img
            src={`https://i.pravatar.cc/40?img=3`}
            alt="Profile"
            className="w-[28px] h-[28px] rounded-full cursor-pointer"
          /> */}
          <div className="w-auto flex flex-col justify-start items-start">
            <p className="text-[11px] font-normal text-white/50">Welcome back,</p>
            <p className="text-[11px] font-medium text-white">Admin</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
