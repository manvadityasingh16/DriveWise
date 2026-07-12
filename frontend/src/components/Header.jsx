import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Header() {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  return (
    <header className="bg-white rounded-xl shadow-sm px-4 md:px-8 py-4 md:py-5 flex flex-wrap items-center justify-between gap-4 relative">

      {/* Left */}
      <div>
        <h1 className="page-title">
          Dashboard
        </h1>

        <p className="page-subtitle">
          Welcome back to DriveWise 🚗
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 md:gap-6">

        {/* Notification */}
        <div className="relative">

          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);

              // Mark notifications as read
              setNotificationCount(0);
            }}
            className="relative"
          >
            <FaBell className="text-xl text-gray-600 hover:text-blue-600 transition duration-300" />

            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-4 w-72 bg-white rounded-2xl shadow-xl border z-50 overflow-hidden">

              <div className="px-5 py-4 font-bold border-b bg-gray-50">
                Notifications
              </div>

              <div className="px-5 py-4 hover:bg-gray-50 cursor-pointer transition">
                🚗 New brochure uploaded successfully
              </div>

              <div className="px-5 py-4 hover:bg-gray-50 cursor-pointer transition">
                🤖 AI indexed all brochures
              </div>

              <div className="px-5 py-4 hover:bg-gray-50 cursor-pointer transition">
                📊 Analytics updated
              </div>

            </div>
          )}

        </div>

        {/* Profile */}
        <div className="relative">

          <div
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 cursor-pointer"
          >

            <FaUserCircle className="text-3xl md:text-4xl text-blue-600" />

            <div className="hidden sm:block">
              <h3 className="font-semibold">
                Admin
              </h3>

              <p className="text-sm text-gray-500">
                Project Manager
              </p>
            </div>

          </div>

          {showProfile && (

            <div className="absolute right-0 mt-4 w-60 bg-white rounded-2xl shadow-xl border overflow-hidden z-50">

              <button
                onClick={() => {
                  navigate("/settings");
                  setShowProfile(false);
                }}
                className="flex items-center gap-3 w-full px-5 py-4 hover:bg-gray-100 transition"
              >
                <FaCog className="text-gray-700" />

                Settings
              </button>

              <button
                onClick={() => {
                  alert("Logout feature coming soon!");
                  setShowProfile(false);
                }}
                className="flex items-center gap-3 w-full px-5 py-4 hover:bg-red-50 text-red-600 transition"
              >
                <FaSignOutAlt />

                Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}

export default Header;