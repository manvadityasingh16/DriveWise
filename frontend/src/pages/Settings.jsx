import { API_BASE_URL } from "../api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Database,
  Bot,
  FileText,
  Layers,
  Server,
  RefreshCw,
  Trash2,
  CheckCircle,
} from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/settings`)
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(console.error);
  }, []);

  if (!settings) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading Settings...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-linear-to-br from-slate-100 via-white to-blue-100 p-4 sm:p-6 md:p-8 pt-10 sm:pt-12 md:pt-14"
    >
      {/* Header */}

      <div className="mb-8">
        <h1 className="page-title">
          <Settings className="text-blue-600 shrink-0" size={28} />
          Settings
        </h1>

        <p className="page-subtitle">
          Configure and monitor the DriveWise AI system.
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

        <div className="card p-5">
          <Bot className="text-purple-600 mb-3" size={24} />

          <h3 className="stat-label">Gemini API</h3>

          <p className="text-lg font-bold text-green-600 mt-1">
            {settings.gemini ? "Connected" : "Offline"}
          </p>
        </div>

        <div className="card p-5">
          <Database className="text-blue-600 mb-3" size={24} />

          <h3 className="stat-label">Vector Store</h3>

          <p className="text-lg font-bold text-green-600 mt-1">
            {settings.vector_store ? "Ready" : "Missing"}
          </p>
        </div>

        <div className="card p-5">
          <FileText className="text-green-600 mb-3" size={24} />

          <h3 className="stat-label">Brochures</h3>

          <p className="stat-value mt-1">
            {settings.brochures}
          </p>
        </div>

        <div className="card p-5">
          <Layers className="text-orange-500 mb-3" size={24} />

          <h3 className="stat-label">Chunks</h3>

          <p className="stat-value mt-1">
            {settings.chunks}
          </p>
        </div>

      </div>

      {/* AI Configuration */}

      <div className="card p-6 mb-6">

        <h2 className="section-title mb-5 flex items-center gap-2">
          🤖 AI Configuration
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between border-b pb-3">
            <span className="font-medium">Embedding Model</span>
            <span className="text-blue-600 font-semibold">
              {settings.embedding_model}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="font-medium">Backend Status</span>

            <span className="text-green-600 flex items-center gap-2">
              <CheckCircle size={18} />
              Online
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Version</span>

            <span className="font-semibold">
              {settings.version}
            </span>
          </div>

        </div>

      </div>

      {/* Maintenance */}

      <div className="card p-6">

        <h2 className="section-title mb-5">
          🛠 Maintenance
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">

          <button
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
            onClick={() => alert("Rebuild Vector Database coming soon!")}
          >
            <RefreshCw size={18} />
            Rebuild Vector Database
          </button>

          <button
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition"
            onClick={() => alert("Clear Vector Database coming soon!")}
          >
            <Trash2 size={18} />
            Clear Vector Database
          </button>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 card p-5 flex flex-wrap items-center justify-between gap-4">

        <div className="flex items-center gap-3">

          <Server className="text-green-600" size={20} />

          <div>

            <p className="font-semibold text-slate-800">
              DriveWise Backend
            </p>

            <p className="stat-label">
              FastAPI Server Running
            </p>

          </div>

        </div>

        <span className="text-green-600 font-semibold text-sm">
          ● Online
        </span>

      </div>
    </motion.div>
  );
}