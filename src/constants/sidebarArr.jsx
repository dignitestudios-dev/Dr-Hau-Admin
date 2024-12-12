import { GoHome } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { RiNotificationLine } from "react-icons/ri";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BsExclamationSquare } from "react-icons/bs";
import { HiOutlineShieldExclamation } from "react-icons/hi2";
import { FiUsers } from "react-icons/fi";
import { IoDocumentOutline } from "react-icons/io5";
import { BsFiletypePdf } from "react-icons/bs";






export const sidebarArr = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <RxDashboard />,
  },
  {
    title: "Events",
    url: "/events",
    icon: <HiOutlineDocumentText />,
    submenu: [
      {
        title: "All Events",
        url: "/events",
        icon: <FiUsers />,
      },
      {
        title: "Create Event",
        url: "/create-event",
        icon: <RiNotificationLine />,
      },
    ],
  },
  {
    title: "Create Profile",
    url: "/create-profile",
    icon: <FiUser />,
    
  },

  {
    title: "Appointments ",
    url: "/appointments",
    icon: <IoDocumentOutline />,
  },
  

  {
    title: "Users",
    url: "/students",
    icon: <FiUsers />,
    submenu: [
      {
        title: "All Users",
        url: "/users",
        icon: <FiUsers />,
      },
      // {
      //   title: "Students",
      //   url: "/students",
      //   icon: <FiUsers />,
      // },
      // {
      //   title: "Appointments",
      //   url: "/appointments",
      //   icon: <RiNotificationLine />,
      // },
      {
        title: "School Admins",
        url: "/admins",
        icon: <HiOutlineShieldExclamation />,
      },
    ],
  },




  {
    title: "Notifications",
    url: "/notifications",
    icon: <RiNotificationLine />,
  },
  {
    title: "CDC Sheets",
    url: "/cdc-sheets",
    icon: <BsFiletypePdf />,
  },
 
  {
    title: "Terms Of Services",
    url: "/termsofservice",
    icon: <HiOutlineShieldExclamation />,
  },
  {
    title: "Privacy Policy",
    url: "/privacy-policy",
    icon: <HiOutlineExclamationCircle />,
  },

  
];