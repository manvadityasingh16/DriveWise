import { FaRobot, FaFilePdf } from "react-icons/fa";

function ResponseCard() {
  return (
    <div className="card p-6 mt-6">

      <div className="flex items-center gap-3 mb-5">
        <FaRobot className="text-3xl text-blue-600" />
        <h2 className="section-title">
          AI Response
        </h2>
      </div>

      <div className="space-y-3">

        <p>
          <span className="font-semibold">Mileage:</span> 21.8 km/l
        </p>

        <p>
          <span className="font-semibold">Fuel Tank:</span> 50 L
        </p>

        <p>
          <span className="font-semibold">Engine:</span> 1493 cc
        </p>

      </div>

      <hr className="my-5" />

      <div className="flex items-center gap-2 text-gray-600">
        <FaFilePdf className="text-red-600" />

        <span>
          Source:
          <strong> Hyundai_Creta_2025.pdf</strong>
        </span>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Page 18
      </p>

    </div>
  );
}

export default ResponseCard;