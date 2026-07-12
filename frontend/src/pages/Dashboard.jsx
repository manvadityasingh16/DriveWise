import SearchBox from "../components/SearchBox";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import ResponseCard from "../components/ResponseCard";


import {
  FaCar,
  FaBuilding,
  FaFilePdf,
  FaRobot,
} from "react-icons/fa";

function Dashboard() {

  const stats = [
    {
      title: "Cars",
      value: 20,
      icon: <FaCar />,
      color: "bg-blue-600",
    },
    {
      title: "Brands",
      value: 8,
      icon: <FaBuilding />,
      color: "bg-green-600",
    },
    {
      title: "Brochures",
      value: 25,
      icon: <FaFilePdf />,
      color: "bg-red-600",
    },
    {
      title: "AI Queries",
      value: 0,
      icon: <FaRobot />,
      color: "bg-purple-600",
    },
  ];

  return (
    <main className="bg-gray-100 min-h-screen p-4 md:p-8 pt-10 md:pt-14">

      <Header />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

        {stats.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
          />
        ))}

      </div>
      <SearchBox />
      <ResponseCard />

    </main>
  );
}

export default Dashboard;