import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import NotificationDropdown from "../components/Notifications/NotificationDropdown";
import axios from "../axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("/admin/notifications/unread-count");
      if (response?.data?.success) {
        const count =
          response.data.data?.unreadCount ??
          response.data.unreadCount ??
          response.data.data?.count ??
          response.data.count ??
          (typeof response.data.data === "number" ? response.data.data : 0);
        setUnreadCount(Number(count) || 0);
      }
    } catch (err) {
      // If error or unauthenticated, ignore gracefully
    }
  };

  useEffect(() => {
    fetchUnreadCount();

    const handleNotificationsUpdated = () => {
      fetchUnreadCount();
    };

    window.addEventListener("notificationsRead", handleNotificationsUpdated);
    window.addEventListener("notificationReceived", handleNotificationsUpdated);

    return () => {
      window.removeEventListener("notificationsRead", handleNotificationsUpdated);
      window.removeEventListener("notificationReceived", handleNotificationsUpdated);
    };
  }, []);

  // When navigating to /notifications, refresh count
  useEffect(() => {
    if (location.pathname === "/notifications") {
      fetchUnreadCount();
    }
  }, [location.pathname]);

  const handleNotificationClick = () => {
    navigate("/notifications");
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full h-[60px] bg-black flex justify-end items-center px-4 relative">
      <div className="flex items-center gap-6 py-4 font-normal text-gray-900">
        <div className="relative">
          <button
            onClick={handleNotificationClick}
            className="w-[29px] h-[29px] rounded-lg flex items-center justify-center bg-[#252525] p-1 relative"
            aria-label="Notifications"
          >
            <IoNotificationsOutline className="text-white w-full h-full" />
            {unreadCount > 0 && (
              <GoDotFill className="w-[20px] h-[20px] text-[#F44237] absolute -top-2 -right-1" />
            )}
          </button>

          {isDropdownOpen && <NotificationDropdown />}
        </div>

        <button
          onClick={() => navigate("/change-password")}
          className="flex items-center gap-2 relative"
        >
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
