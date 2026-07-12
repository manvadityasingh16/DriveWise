import {
  FaCogs,
  FaBolt,
  FaSyncAlt,
  FaGasPump,
  FaExchangeAlt,
  FaRoad,
  FaTag,
} from "react-icons/fa";

const fields = [
  { key: "engine", label: "Engine", icon: <FaCogs /> },
  { key: "power", label: "Power", icon: <FaBolt /> },
  { key: "torque", label: "Torque", icon: <FaSyncAlt /> },
  { key: "fuel", label: "Fuel", icon: <FaGasPump /> },
  { key: "transmission", label: "Transmission", icon: <FaExchangeAlt /> },
  { key: "mileage", label: "Mileage", icon: <FaRoad /> },
  { key: "price", label: "Price", icon: <FaTag /> },
];

const isEmpty = (value) =>
  !value || String(value).trim().toLowerCase() === "not available";

function Cell({ value }) {
  if (isEmpty(value)) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-slate-400 italic">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        Not Available
      </span>
    );
  }
  return <span className="text-slate-700">{value}</span>;
}

function ComparisonTable({ comparison }) {
  const { car1, car2 } = comparison;

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-lg ring-1 ring-black/5">
      <table className="w-full min-w-160 border-collapse text-left">
        <thead>
          <tr className="bg-linear-to-r from-slate-900 to-slate-700 text-white">
            <th className="px-5 py-4 text-sm font-semibold uppercase tracking-wide">
              Specification
            </th>
            <th className="px-5 py-4 text-base font-bold">
              {car1.car_name}
            </th>
            <th className="px-5 py-4 text-base font-bold">
              {car2.car_name}
            </th>
          </tr>
        </thead>

        <tbody>
          {fields.map(({ key, label, icon }, index) => (
            <tr
              key={key}
              className={`group transition-colors ${
                index % 2 === 0 ? "bg-white" : "bg-slate-50/60"
              } hover:bg-blue-50/70`}
            >
              <td className="whitespace-nowrap border-t border-slate-100 px-5 py-4 align-top">
                <span className="flex items-center gap-2.5 font-semibold text-slate-800">
                  <span className="text-blue-500">{icon}</span>
                  {label}
                </span>
              </td>

              <td className="border-t border-slate-100 px-5 py-4 align-top leading-relaxed">
                <Cell value={car1[key]} />
              </td>

              <td className="border-t border-slate-100 px-5 py-4 align-top leading-relaxed">
                <Cell value={car2[key]} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComparisonTable;
