import { API_BASE_URL } from "../api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
} from "recharts";

import {
    Database,
    FileText,
    Layers,
    HardDrive,
    Activity,
} from "lucide-react";

export default function Analytics() {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {

        const res = await fetch(`${API_BASE_URL}/analytics`);

        const json = await res.json();

        setData(json);

    };

    if (!data)
        return (
            <div className="flex justify-center items-center h-screen text-2xl font-bold">
                Loading Analytics...
            </div>
        );

    const brandData = Object.entries(data.brands).map(
        ([name, value]) => ({
            name,
            value,
        })
    );

    const BRAND_COLORS = {
  Hyundai: "#2563EB",
  Honda: "#DC2626",
  Mahindra: "#16A34A",
  Tata: "#F59E0B",
  Toyota: "#7C3AED",
  Kia: "#06B6D4",
  "Maruti Suzuki": "#EC4899",
};

    return (

        <motion.div

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

            className="min-h-screen bg-linear-to-br from-slate-100 via-white to-blue-100 p-4 sm:p-6 md:p-8 pt-10 sm:pt-12 md:pt-14"

        >

            <h1 className="page-title mb-1">

                📊 Analytics Dashboard

            </h1>

            <p className="page-subtitle mb-8">

                Monitor DriveWise performance and brochure statistics.

            </p>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

                <div className="card p-5">

                    <FileText
                        className="text-blue-600 mb-2"
                        size={24}
                    />

                    <h2 className="stat-label">
                        Brochures
                    </h2>

                    <p className="stat-value">
                        {data.brochures}
                    </p>

                </div>

                <div className="card p-5">

                    <HardDrive
                        className="text-green-600 mb-2"
                        size={24}
                    />

                    <h2 className="stat-label">

                        Storage

                    </h2>

                    <p className="stat-value">

                        {data.storage} MB

                    </p>

                </div>

                <div className="card p-5">

                    <Layers
                        className="text-orange-500 mb-2"
                        size={24}
                    />

                    <h2 className="stat-label">

                        Vector Chunks

                    </h2>

                    <p className="stat-value">

                        {data.chunks}

                    </p>

                </div>

                <div className="card p-5">

                    <Database
                        className="text-purple-600 mb-2"
                        size={24}
                    />

                    <h2 className="stat-label">

                        Vector Store

                    </h2>

                    <p className="text-lg font-bold text-green-600">

                        {data.vector_ready ? "Ready" : "Missing"}

                    </p>

                </div>

            </div>

            <div className="grid xl:grid-cols-2 gap-6">
                              {/* Bar Chart */}

                <div className="card p-6">

                    <h2 className="section-title mb-5">

                        🚗 Brochures by Brand

                    </h2>

                    <ResponsiveContainer width="100%" height={350}>

                        <BarChart data={brandData}>

                            <XAxis dataKey="name" />

                            <YAxis />

                            <Tooltip />

                            <Bar
  dataKey="value"
  radius={[8, 8, 0, 0]}
  barSize={40}
  maxBarSize={40}
>
  {brandData.map((entry, index) => (
    <Cell
      key={index}
      fill={BRAND_COLORS[entry.name] || "#6B7280"}
    />
  ))}
</Bar>

                        </BarChart>

                    </ResponsiveContainer>

                </div>

                {/* Pie Chart */}

                <div className="card p-6">

                    <h2 className="section-title mb-5">

                        📄 Brand Distribution

                    </h2>

                    <ResponsiveContainer width="100%" height={350}>

                        <PieChart>
                          <Legend />

                            <Pie
                                data={brandData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={120}
                                label
                            >

                                {brandData.map((entry, index) => (

                                    <Cell
                                    key={index}
                                    fill={BRAND_COLORS[entry.name] || "#6B7280"}
                                    />

                                ))}
                            <Legend />
                            </Pie>

                            <Tooltip />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>

            {/* System Status */}

            <div className="card p-6 mt-6">

                <h2 className="section-title mb-5">

                    ⚙ System Status

                </h2>

                <div className="grid sm:grid-cols-3 gap-4">

                    <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">

                        <div>

                            <p className="font-semibold">

                                Backend

                            </p>

                            <p className="text-gray-500">

                                FastAPI Running

                            </p>

                        </div>

                        <Activity
                            className="text-green-500"
                            size={26}
                        />

                    </div>

                    <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">

                        <div>

                            <p className="font-semibold">

                                Vector Database

                            </p>

                            <p className="text-gray-500">

                                FAISS Ready

                            </p>

                        </div>

                        <Database
                            className="text-blue-600"
                            size={26}
                        />

                    </div>

                    <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">

                        <div>

                            <p className="font-semibold">

                                AI Assistant

                            </p>

                            <p className="text-gray-500">

                                Gemini Connected

                            </p>

                        </div>

                        <Activity
                            className="text-purple-600"
                            size={26}
                        />

                    </div>

                </div>

            </div>

        </motion.div>

    );

}