import {
  FaHome,
  FaRobot,
  FaCar,
  FaFilePdf,
  FaChartLine,
  FaCog,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    icon: <FaHome />,
    title: "Dashboard",
    path: "/",
  },
  {
    icon: <FaRobot />,
    title: "AI Assistant",
    path: "/assistant",
  },
  {
    icon: <FaCar />,
    title: "Compare Cars",
    path: "/compare",
  },
  {
    icon: <FaFilePdf />,
    title: "Brochures",
    path: "/brochures",
  },
  {
    icon: <FaChartLine />,
    title: "Analytics",
    path: "/analytics",
  },
  {
    icon: <FaCog />,
    title: "Settings",
    path: "/settings",
  },
];

function Sidebar({ open = false, onClose = () => {} }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 w-64 h-screen lg:self-start bg-slate-900 text-white p-6 overflow-y-auto transform transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="text-3xl font-bold mb-10">
          🚗 DriveWise
        </h1>

        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-700"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;