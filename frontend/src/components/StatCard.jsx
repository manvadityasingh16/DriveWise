import React from "react";

function StatCard({ title, value, icon, color }) {
  return (
    <div className="card p-5 flex justify-between items-center hover:shadow-md transition">
      <div>
        <p className="stat-label">{title}</p>

        <h2 className="stat-value mt-1">
          {value}
        </h2>
      </div>

      <div className={`${color} text-white text-xl p-3 rounded-xl`}>
        {icon}
      </div>
    </div>
  );
}

export default StatCard;