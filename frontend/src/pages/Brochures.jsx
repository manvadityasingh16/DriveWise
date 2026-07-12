import { API_BASE_URL } from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  Search,
  Eye,
  Download,
  Car,
  CheckCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Brochures() {
  const [search, setSearch] = useState("");
  const [brochures, setBrochures] = useState([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    loadBrochures();
  }, []);

  const loadBrochures = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/brochures`);

      const data = await response.json();

      setBrochures(data);
    } catch (err) {
      console.error("Failed to load brochures:", err);
    } finally {
      setLoading(false);
    }
  };

  const uploadBrochure = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      alert(result.message);

      loadBrochures();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }

    event.target.value = "";
  };

  const filtered = brochures.filter((brochure) =>
    brochure.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-linear-to-br from-slate-100 via-white to-blue-100 p-4 sm:p-6 md:p-8 pt-10 sm:pt-12 md:pt-14"
    >
      <input
        type="file"
        accept=".pdf"
        hidden
        ref={fileInputRef}
        onChange={uploadBrochure}
      />

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

        <div>

          <h1 className="page-title">
            <FileText
              className="text-blue-600 shrink-0"
              size={28}
            />
            Brochures
          </h1>

          <p className="page-subtitle">
            Manage all uploaded vehicle brochures.
          </p>

        </div>

        <button
          onClick={() => fileInputRef.current.click()}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl shadow-sm transition shrink-0 text-sm font-medium"
        >
          <Upload size={18} />
          Upload Brochure
        </button>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="card p-5">

          <h3 className="stat-label">
            Total Brochures
          </h3>

          <p className="stat-value mt-1">
            {brochures.length}
          </p>

        </div>

        <div className="card p-5">

          <h3 className="stat-label">
            Indexed
          </h3>

          <p className="text-2xl font-bold text-green-600 mt-1">
            {brochures.length}
          </p>

        </div>

        <div className="card p-5">

          <h3 className="stat-label">
            AI Ready
          </h3>

          <p className="text-2xl font-bold text-blue-600 mt-1">
            100%
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="relative mb-6">

        <Search
          className="absolute left-4 top-3.5 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search brochures..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-100 rounded-xl pl-11 pr-4 py-3 shadow-sm outline-none focus:border-blue-500"
        />

      </div>

      {loading ? (

        <div className="text-center py-20 text-xl text-gray-500">
          Loading brochures...
        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filtered.map((brochure) => (
            <motion.div
              key={brochure.filename}
              whileHover={{ scale: 1.02 }}
              className="card hover:shadow-md p-5 transition"
            >
              <div className="flex justify-between items-start">

                <FileText
                  className="text-blue-600"
                  size={32}
                />

                <div className="flex items-center gap-1 text-green-600 text-xs font-semibold">

                  <CheckCircle size={14} />

                  Indexed

                </div>

              </div>

              <h2 className="text-base font-bold mt-4 text-slate-800">
                {brochure.name}
              </h2>

              <p className="page-subtitle truncate">
                {brochure.filename}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {(brochure.size / 1024).toFixed(2)} KB
              </p>

              <div className="grid grid-cols-3 gap-2 mt-4">
                                <button
  className="flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 py-2 rounded-lg transition"
  onClick={() =>
    window.open(
      `${API_BASE_URL}/files/${brochure.filename}`,
      "_blank"
    )
  }
>
  <Eye size={16} />
</button>

                <button
                  className="flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 py-2 rounded-lg transition"
                  onClick={() =>
                    window.open(
                      `${API_BASE_URL}/files/${brochure.filename}`
                    )
                  }
                >
                  <Download size={16} />
                </button>

                <button
  className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
  onClick={() =>
    navigate(`/compare?car1=${encodeURIComponent(brochure.name)}`)
  }
>
  <Car size={16} />
</button>
              </div>
            </motion.div>
          ))}

          {!filtered.length && (
            <div className="col-span-full card p-10 text-center">

              <FileText
                size={60}
                className="mx-auto text-gray-300 mb-4"
              />

              <h2 className="section-title">
                No brochures found
              </h2>

              <p className="page-subtitle">
                Upload a brochure or try another search.
              </p>

            </div>
          )}

        </div>

      )}

    </motion.div>
  );
}