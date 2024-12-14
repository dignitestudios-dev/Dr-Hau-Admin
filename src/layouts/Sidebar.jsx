import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import { RiLogoutCircleLine, RiMenuLine } from "react-icons/ri";
import { sidebarArr } from "../constants/sidebarArr";
import { Logo } from "../assets/export";
import axios from "../axios"; 

const Sidebar = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Make an API request to logout
      await axios.post('/auth/logout');
      
      // Clear local storage or any authentication data
      localStorage.clear();
      
      // Redirect to login page or home
      navigate("/login"); // Or wherever you want the user to go after logging out
    } catch (error) {
      console.error("Logout failed", error);
      // Optionally, show a toast notification or an error message here
    } finally {
      handleCloseDrawer(); // Close the sidebar after logout
    }
  };

  return (
    <div>
      {/* Drawer Toggle Button */}
      <button
        onClick={toggleDrawer}
        className="lg:hidden fixed top-4 left-4 z-50 text-white"
      >
        <RiMenuLine size={24} />
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed lg:static top-0 left-0 w-[280px] bg-black py-4 px-6 flex flex-col justify-start items-start transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-40 h-screen overflow-y-auto`}
      >
        {/* <h1 className="text-white mt-2.5 text-[40px] font-bold">Logo</h1> */}
        <img src={Logo} alt="Logo" className="mt-2.5 h-[80px] w-auto" />

        <div className="w-full mt-12 flex flex-col justify-start items-start gap-2">
          {sidebarArr?.map((link, index) => (
            <SidebarLink
              key={index}
              link={link}
              onCloseDrawer={handleCloseDrawer}
            />
          ))}
          <button
            onClick={handleLogout}
            className={`w-full h-[46px] outline-none rounded-[12px] 
            bg-transparent text-white/50 
            font-medium flex items-center justify-start transition-all duration-500 hover:bg-[#D0FCB3] hover:text-black px-3 gap-2`}
          >
            <span className="text-2xl">
              <RiLogoutCircleLine />
            </span>
            <span className="capitalize text-[13px] font-normal">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay when drawer is open */}
      {isDrawerOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
