import { API_BASE_URL } from "../api";
import { motion } from "framer-motion";
import { useState } from "react";
import CarSelector from "../components/Compare/CarSelector";
import ComparisonTable from "../components/Compare/ComparisonTable";

function CompareCars() {
  const [car1, setCar1] = useState("");
  const [car2, setCar2] = useState("");
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const compareCars = async () => {
    if (!car1 || !car2) return;

    setLoading(true);
    setError("");
    setComparison(null);

    try {
      const res = await fetch(
        `${API_BASE_URL}/compare?car1=${encodeURIComponent(
          car1
        )}&car2=${encodeURIComponent(car2)}`
      );

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setError(data.message || "Comparison failed. Please try again.");
        return;
      }

      setComparison(data);
    } catch (err) {
      console.error(err);
      setError("Unable to reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-linear-to-br from-slate-100 via-white to-blue-100 p-4 sm:p-6 md:p-8 pt-10 sm:pt-12 md:pt-14 space-y-8"
    >
      <div className="mb-2">
    <h1 className="page-title">
        🚗 Compare Cars
    </h1>

    <p className="page-subtitle">
        Compare specifications side by side and find your perfect ride.
    </p>
</div>

      {/* Selector card */}
      <div className="card p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="stat-label mb-2 block font-medium">
              First car
            </label>
            <CarSelector
              value={car1}
              onChange={setCar1}
            />
          </div>

          <div>
            <label className="stat-label mb-2 block font-medium">
              Second car
            </label>
            <CarSelector
              value={car2}
              onChange={setCar2}
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <motion.button
            onClick={compareCars}
            disabled={!car1 || !car2 || loading}
            whileHover={{
              scale: car1 && car2 && !loading ? 1.05 : 1,
            }}
            whileTap={{ scale: car1 && car2 && !loading ? 0.95 : 1 }}
            className="px-8 py-3 rounded-full bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "⏳ Comparing..." : "🚗 Compare Now"}
          </motion.button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-center">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="card p-12 text-center">
          <div className="text-4xl mb-3 animate-pulse">🚗💨</div>
          <h2 className="section-title">
            Comparing cars...
          </h2>
          <p className="page-subtitle max-w-md mx-auto">
            Reading both brochures and extracting specifications with AI. This can take up to a minute.
          </p>
        </div>
      )}

      {/* Empty state */}
      {!comparison && !loading && !error && (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-3">🚗↔️🚙</div>
          <h2 className="section-title">
            Ready to compare
          </h2>
          <p className="page-subtitle max-w-md mx-auto">
            Pick two cars above and hit <span className="font-semibold text-blue-600">Compare Now</span> to see their specifications side by side.
          </p>
        </div>
      )}

{/* Car Cards */}
{comparison && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center my-8">

    {/* Car 1 */}
    <div className="card p-5">
      <div className="text-4xl text-center">🚗</div>

      <h2 className="text-xl font-bold text-center mt-3 text-slate-800">
        {comparison.car1.car_name}
      </h2>

      <p className="text-center text-gray-500">
        {comparison.car1.brand}
      </p>

      <div className="mt-5 space-y-2">
        <p>⛽ {comparison.car1.fuel}</p>
        <p>⚙ {comparison.car1.engine}</p>
        <p className="font-bold text-blue-600">
          💰 {comparison.car1.price}
        </p>
      </div>
    </div>

    {/* VS */}
    <div className="flex justify-center">
      <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
        VS
      </div>
    </div>

    {/* Car 2 */}
    <div className="card p-5">
      <div className="text-4xl text-center">🚙</div>

      <h2 className="text-xl font-bold text-center mt-3 text-slate-800">
        {comparison.car2.car_name}
      </h2>

      <p className="text-center text-gray-500">
        {comparison.car2.brand}
      </p>

      <div className="mt-5 space-y-2">
        <p>⛽ {comparison.car2.fuel}</p>
        <p>⚙ {comparison.car2.engine}</p>
        <p className="font-bold text-blue-600">
          💰 {comparison.car2.price}
        </p>
      </div>
    </div>

  </div>
)}

{/* Comparison Table */}
{comparison && (
    <ComparisonTable comparison={comparison} />
)}
    </motion.div>
  );
}

export default CompareCars;