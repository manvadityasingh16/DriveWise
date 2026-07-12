import { API_BASE_URL } from "../../api";
import { useEffect, useRef, useState } from "react";
import { FaCar, FaChevronDown, FaCheck, FaSearch } from "react-icons/fa";

function CarSelector({ value, onChange }) {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/cars`)
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error("Failed to load cars:", err));
  }, []);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;

    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const options = cars.map((car) => `${car.brand} ${car.model}`);
  const filtered = options.filter((label) =>
    label.toLowerCase().includes(query.trim().toLowerCase())
  );

  const select = (label) => {
    onChange(label);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center gap-3 rounded-xl border bg-white p-3 text-left transition-colors ${
          open
            ? "border-blue-500 ring-2 ring-blue-100"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
          <FaCar />
        </span>
        <span
          className={`flex-1 truncate ${
            value ? "text-slate-800" : "text-slate-400"
          }`}
        >
          {value || "Select a Car"}
        </span>
        <FaChevronDown
          className={`text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl ring-1 ring-black/5">
          {/* Search */}
          <div className="border-b border-slate-100 p-2">
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
              <FaSearch className="text-sm text-slate-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search cars..."
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Options */}
          <ul className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-slate-400">
                No cars found
              </li>
            )}

            {filtered.map((label) => {
              const active = label === value;
              return (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => select(label)}
                    className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                      active
                        ? "bg-blue-50 font-medium text-blue-600"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="truncate">{label}</span>
                    {active && <FaCheck className="shrink-0 text-blue-500" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CarSelector;