import React, { useState, useEffect } from "react";
import NotificationsModal from "../../components/Notifications/NotificationsModal";
import SendNotificationModal from "../../components/Notifications/SendNotificationModal"; // Import SendNotificationModal
import axios from "../../axios";
import { SuccessToast, ErrorToast } from "../../components/Global/Toaster"; // Import toast functions
import { formatNotificationTimestamp } from "../../constants/utility";

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
          setSentNotifications(sentResponse?.data?.data || []);
        } else {
          console.error("Failed to fetch sent notifications.");
        }

        // Fetch Received Notifications
        const receivedResponse = await axios.get("/admin/notifications/admin");
        if (receivedResponse?.data?.success) {
          setReceivedNotifications(receivedResponse?.data?.data || []);
          window.dispatchEvent(new Event("notificationsRead"));
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
        window.dispatchEvent(new Event("notificationsRead"));
      } else {
        ErrorToast("Failed to clear notifications. Please try again.");
      }
    } catch (error) {
      ErrorToast("Error clearing notifications. Please try again.");
      console.error("Error clearing notifications:", error);
    }
  };

  // Helper for BUG-006: Extract sender / user identity information
  const getUserIdentity = (item) => {
    if (!item) return null;

    // Direct user entity
    if (item.user && typeof item.user === "object") {
      const fullName = [item.user.firstName, item.user.lastName].filter(Boolean).join(" ");
      if (fullName) return item.user.email ? `${fullName} (${item.user.email})` : fullName;
      if (item.user.name) return item.user.email ? `${item.user.name} (${item.user.email})` : item.user.name;
      if (item.user.email) return item.user.email;
    }

    // Direct sender entity
    if (item.sender && typeof item.sender === "object") {
      const fullName = [item.sender.firstName, item.sender.lastName].filter(Boolean).join(" ");
      if (fullName) return item.sender.email ? `${fullName} (${item.sender.email})` : fullName;
      if (item.sender.name) return item.sender.email ? `${item.sender.name} (${item.sender.email})` : item.sender.name;
      if (item.sender.email) return item.sender.email;
    }

    // Metadata payload
    const meta = item.meta || item.metadata;
    if (meta && typeof meta === "object") {
      const metaFullName = [meta.firstName || meta.first_name, meta.lastName || meta.last_name].filter(Boolean).join(" ");
      if (metaFullName) return (meta.email || meta.userEmail) ? `${metaFullName} (${meta.email || meta.userEmail})` : metaFullName;
      if (meta.userName || meta.name || meta.senderName) return meta.userName || meta.name || meta.senderName;
      if (meta.email || meta.userEmail) return meta.email || meta.userEmail;
    }

    // Direct properties on item
    const directName = item.userName || item.senderName || [item.firstName || item.first_name, item.lastName || item.last_name].filter(Boolean).join(" ");
    const directEmail = item.userEmail || item.senderEmail || item.email;
    if (directName && directEmail) return `${directName} (${directEmail})`;
    if (directName) return directName;
    if (directEmail) return directEmail;

    return null;
  };

  const currentList = activeTab === "send" ? sentNotifications : receivedNotifications;

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
            {currentList.length === 0 ? (
              <p className="text-gray-500 text-sm py-4">No notifications found.</p>
            ) : (
              currentList.map((notification) => {
                const userIdentity = getUserIdentity(notification);
                // BUG-007: Standardize UTC server timestamp and convert to user's local timezone
                const formattedDate = formatNotificationTimestamp(
                  notification?.createdAt || notification?.date || notification?.updatedAt || notification?.timestamp
                );

                return (
                  <div key={notification._id || notification.id} className="mb-4 pb-4 flex justify-between items-start">
                    <div className="flex-grow border-b border-[#E4E4E4] max-w-[90%]">
                      <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <strong className="text-black">{notification?.title || "Notification"}</strong>
                          {/* BUG-006: Clearly display associated user/sender identity */}
                          {userIdentity && (
                            <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 font-medium px-2 py-0.5 rounded">
                              User: {userIdentity}
                            </span>
                          )}
                        </div>
                        <span className="text-gray-500 text-xs font-medium bg-gray-100 px-2 py-1 rounded">
                          {formattedDate}
                        </span>
                      </div>
                      <p className="text-[14px] text-[#555555] mb-2">{notification?.message || notification?.description}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onRequestClose={closeNotificationsModal}
        onConfirm={handleClearNotifications}
      />
      <SendNotificationModal
        isOpen={isSendNotificationModalOpen}
        onRequestClose={closeSendNotificationModal}
      />
    </div>
  );
};

export default Notifications;
