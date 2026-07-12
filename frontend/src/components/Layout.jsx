import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 w-full min-w-0">

        {/* Mobile top bar (hidden on large screens) */}
        <div className="lg:hidden sticky top-0 z-20 bg-white shadow px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="p-2 rounded-lg hover:bg-gray-100 text-slate-800"
          >
            <FaBars className="text-2xl" />
          </button>

          <span className="font-bold text-lg text-slate-800">
            🚗 DriveWise
          </span>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Layout;
