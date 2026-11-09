import React from "react";
import { formatNotificationTimestamp } from "../../constants/utility";

const notifications = [
  {
    id: 1,
    title: "New Vaccination Event",
    description:
      "A new vaccination event has been scheduled.",
    time: "7:30PM",
    isUnread: true,
  },
  {
    id: 2,
    title: "New Vaccination Event",
    description:
      "A new vaccination event has been scheduled.",
    time: "7:30PM",
    isUnread: true,
  },
];

const NotificationDropdown = () => {
  return (
    <div
      className="absolute w-[210px] right-0 -mt-6 lg:w-[480px] bg-white shadow-lg rounded-lg p-4 max-h-[300px] overflow-y-auto z-50"
      style={{ top: '60px' }} 
    >
      <h3 className="font-medium text-lg">Notifications</h3>
      {notifications.map((notification) => {
        const formattedDate = formatNotificationTimestamp(
          notification?.createdAt || notification?.date || notification?.time
        );

        return (
          <div
            key={notification?.id}
            className="flex justify-between items-start border-b py-3"
          >
            <div className="flex flex-col">
              <p className="font-semibold text-sm">{notification?.title}</p>
              <p className="text-sm text-gray-500">{notification?.description}</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-xs text-gray-400">
                <span>{formattedDate}</span>
              </p>
              {notification?.isUnread && (
                <span className="text-xs text-white bg-red-500 rounded-full px-2 py-1 mt-1">
                  1
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationDropdown;
