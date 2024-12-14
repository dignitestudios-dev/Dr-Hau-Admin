import React, { useState, useEffect } from "react";
import NotificationsModal from "../../components/Notifications/NotificationsModal";
import SendNotificationModal from "../../components/Notifications/SendNotificationModal"; // Import SendNotificationModal
import axios from "../../axios";
import { SuccessToast, ErrorToast } from "../../components/Global/Toaster"; // Import toast functions

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("send");
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isSendNotificationModalOpen, setIsSendNotificationModalOpen] = useState(false); // State for SendNotificationModal
  const [sentNotifications, setSentNotifications] = useState([]); // State to hold sent notifications
  const [receivedNotifications, setReceivedNotifications] = useState([]); // State to hold received notifications
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator

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

  // Fetch Sent and Received notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true); // Set loading state to true

      try {
        // Fetch Sent Notifications
        const sentResponse = await axios.get("/admin/notifications");
        if (sentResponse?.data?.success) {
          setSentNotifications(sentResponse?.data?.data);
        } else {
          console.error("Failed to fetch sent notifications.");
        }

        // Fetch Received Notifications
        const receivedResponse = await axios.get("/admin/notifications/admin");
        if (receivedResponse?.data?.success) {
          setReceivedNotifications(receivedResponse?.data?.data);
        } else {
          console.error("Failed to fetch received notifications.");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoading(false); // Set loading state to false once data is fetched
      }
    };

    fetchNotifications();
  }, []); // Empty dependency array to run this effect only once on mount

  const handleClearNotifications = async () => {
    try {
      // Call the clear all notifications API
      const response = await axios.post('/admin/notifications/admin/clear');
      if (response?.status === 200) {
        SuccessToast("All notifications cleared successfully!");
        // Clear notifications from the state
        setSentNotifications([]);
        setReceivedNotifications([]);
        closeNotificationsModal(); // Close the modal
      } else {
        ErrorToast("Failed to clear notifications. Please try again.");
      }
    } catch (error) {
      ErrorToast("Error clearing notifications. Please try again.");
      console.error("Error clearing notifications:", error);
    }
  };

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
          <button
            onClick={openNotificationsModal}
            className="bg-black text-sm text-white p-1 lg:px-2 py-2 rounded-md ml-4"
          >
            Clear All
          </button>
          <button
            onClick={openSendNotificationModal}
            className="bg-black text-sm text-white p-2 lg:px-2 py-2 rounded-md ml-1"
          >
            Send
          </button>
        </div>

        {/* Show loading state or the notifications */}
        {isLoading ? (
          <div className="flex justify-center items-center py-6">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        ) : (
          <div>
            {/* Display Sent Notifications */}
            {(activeTab === "send" ? sentNotifications : receivedNotifications).map((notification) => (
              <div key={notification._id} className="mb-4 pb-4 flex justify-between items-start">
                <div className="flex-grow border-b border-[#E4E4E4] max-w-[90%]">
                  <div className="flex justify-between">
                    <strong className="text-black">{notification?.title}</strong>
                    <span className="text-gray-500 text-sm">
                      {new Date(notification?.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="list-disc text-[14px] text-[#858585] mb-2">{notification?.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onRequestClose={closeNotificationsModal}
        onConfirm={handleClearNotifications} // Pass the clear function to the modal
      />
      <SendNotificationModal
        isOpen={isSendNotificationModalOpen}
        onRequestClose={closeSendNotificationModal}
      /> {/* Add SendNotificationModal here */}
    </div>
  );
};

export default Notifications;
