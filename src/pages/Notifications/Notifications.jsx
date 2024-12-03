import React, { useState } from "react";
import NotificationsModal from "../../components/Notifications/NotificationsModal";
import SendNotificationModal from "../../components/Notifications/SendNotificationModal"; // Import the SendNotificationModal

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("send");
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isSendNotificationModalOpen, setIsSendNotificationModalOpen] = useState(false); // State for SendNotificationModal

  const openNotificationsModal = () => {
    setIsNotificationsModalOpen(true);
  };

  const closeNotificationsModal = () => {
    setIsNotificationsModalOpen(false);
  };

  const openSendNotificationModal = () => {
    setIsSendNotificationModalOpen(true); // Open SendNotificationModal
  };

  const closeSendNotificationModal = () => {
    setIsSendNotificationModalOpen(false); // Close SendNotificationModal
  };

  const sentNotifications = [
    {
      id: 1,
      heading: "New Notification Heading 1",
      message:
        "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit. Cras sem egestas praesent enim elementum dolor arcu.",
      time: "10:30 AM",
    },
    {
      id: 2,
      heading: "New Notification Heading 2",
      message:
        "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit. Cras sem egestas praesent enim elementum dolor arcu.",
      time: "09:15 AM",
    },
    {
      id: 3,
      heading: "New Notification Heading 3",
      message:
        "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit. Cras sem egestas praesent enim elementum dolor arcu.",
      time: "08:45 AM",
    },
  ];
  
  const receivedNotifications = [
    {
      id: 1,
      heading: "New Notification Heading 4",
      message:
        "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit. Cras sem egestas praesent enim elementum dolor arcu.",
      time: "11:00 AM",
    },
    {
      id: 2,
      heading: "New Notification Heading 5",
      message:
        "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit. Cras sem egestas praesent enim elementum dolor arcu.",
      time: "10:00 AM",
    },
    {
      id: 3,
      heading: "New Notification Heading 6",
      message:
        "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit. Cras sem egestas praesent enim elementum dolor arcu.",
      time: "09:30 AM",
    },
  ];

  return (
    <div className="w-full h-auto p-6 bg-gray-100 overflow-auto">
      <div className="flex items-center mb-6">
        <h3 className="text-[24px] font-bold text-black">Notifications</h3>
      </div>

      <div className="bg-white shadow-md rounded-md p-6">
        <div className="flex mb-6 items-center">
          <div className="flex-grow border-b border-[#E4E4E4] max-w-[90%]">
            <div className="flex">
              <button
                className={`mr-4 pb-2 text-[16px] font-semibold ${
                  activeTab === "send" ? "text-black border-black" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("send")}
              >
                Sent
              </button>
              <button
                className={`pb-2 text-[16px] font-semibold ${
                  activeTab === "appointments" ? "text-black border-black" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("appointments")}
              >
                Received
              </button>
            </div>
          </div>
          <button onClick={openNotificationsModal} className="bg-black text-sm text-white p-1 lg:px-2 py-2 rounded-md ml-4">
            Clear All
          </button>
          <button onClick={openSendNotificationModal} className="bg-black text-sm text-white p-2 lg:px-2 py-2 rounded-md ml-1">
            Send
          </button>
        </div>

        <div>
          {(activeTab === "send" ? sentNotifications : receivedNotifications).map((notification) => (
            <div key={notification.id} className="mb-4 pb-4 flex justify-between items-start">
              <div className="flex-grow border-b border-[#E4E4E4] max-w-[90%]">
                <div className="flex justify-between">
                  <strong className="text-black">{notification.heading}</strong>
                  <span className="text-gray-500 text-sm">{notification.time}</span>
                </div>
                <p className="list-disc text-[14px] text-[#858585] mb-2">
                  {notification.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <NotificationsModal isOpen={isNotificationsModalOpen} onRequestClose={closeNotificationsModal} />
      <SendNotificationModal isOpen={isSendNotificationModalOpen} onRequestClose={closeSendNotificationModal} /> {/* Add SendNotificationModal here */}
    </div>
  );
};

export default Notifications;
