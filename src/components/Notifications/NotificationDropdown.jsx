import React from "react";

const notifications = [
  {
    id: 1,
    title: "New Vaccination Event",
    description:
      "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
    time: "7:30PM",
    isUnread: true,
  },
  // You can add more notifications here
  {
    id: 2,
    title: "New Vaccination Event",
    description:
      "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
    time: "7:30PM",
    isUnread: true,
  },
  {
    id: 3,
    title: "New Vaccination Event",
    description:
      "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
    time: "7:30PM",
    isUnread: true,
  },
  {
    id: 4,
    title: "New Vaccination Event",
    description:
      "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
    time: "7:30PM",
    isUnread: true,
  },
  {
    id: 5,
    title: "New Vaccination Event",
    description:
      "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
    time: "7:30PM",
    isUnread: true,
  },
  {
    id: 6,
    title: "New Vaccination Event",
    description:
      "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
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
      {notifications.map((notification) => (
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
              <span>{notification?.time}</span>
            </p>
            {notification?.isUnread && (
              <span className="text-xs text-white bg-red-500 rounded-full px-2 py-1">
                1
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationDropdown;
