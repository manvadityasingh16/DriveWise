import { API_BASE_URL } from "../api";
import { useState, useEffect } from "react";

function SearchBox() {

  // ---------------- STATES ----------------

  const [brand, setBrand] = useState("Hyundai");
  const [model, setModel] = useState("Creta Electric");
  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const [answer, setAnswer] = useState("");
  const [source, setSource] = useState("");
  const [page, setPage] = useState("");

  // ---------------- LOADING MESSAGES ----------------

  const loadingMessages = [
    "🔍 Searching brochure...",
    "📄 Reading relevant pages...",
    "🧠 Understanding your question...",
    "🤖 Generating AI answer...",
    "✅ Almost done..."
  ];

  // ---------------- LOADING ANIMATION ----------------

  useEffect(() => {

    if (!loading) return;

    let index = 0;

    setLoadingMessage(loadingMessages[0]);

    const interval = setInterval(() => {

      index++;

      if (index < loadingMessages.length) {
        setLoadingMessage(loadingMessages[index]);
      }

    }, 1200);

    return () => clearInterval(interval);

  }, [loading]);

  // ---------------- ASK AI ----------------

  const handleAsk = async () => {

    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(`${API_BASE_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brand,
          model,
          question,
        }),
      });

      const data = await response.json();

      setAnswer(data.answer);
      setSource(data.source);
      setPage(data.page);

    } catch (error) {

      console.error(error);
      alert("Unable to connect to backend.");

    } finally {

      setLoading(false);
      setLoadingMessage("");

    }

  };

  // ---------------- UI ----------------

  return (

    <div className="card p-6 mt-6">

      <h2 className="section-title mb-5">
        🤖 Ask DriveWise
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-500"
        >
          <option>Hyundai</option>
          <option>Tata</option>
          <option>Honda</option>
          <option>Mahindra</option>
        </select>

        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-500"
        >
          <option>Creta Electric</option>
          <option>Creta</option>
          <option>Venue</option>
          <option>Verna</option>
          <option>Exter</option>
          <option>Ioniq 5</option>
          <option>Alcazar</option>
        </select>

      </div>

      <textarea
        rows="4"
        className="border border-gray-200 rounded-lg p-3 mt-4 w-full outline-none resize-none focus:border-blue-500"
        placeholder="Ask anything about the vehicle..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg mt-4 font-medium transition disabled:opacity-60"
      >
        {loading ? "🤖 Thinking..." : "🚀 Ask AI"}
      </button>

      {loading && (

        <div className="mt-6">

          <p className="font-semibold text-blue-700 mb-3">
            {loadingMessage}
          </p>

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">

            <div className="bg-blue-600 h-3 rounded-full animate-pulse w-full"></div>

          </div>

        </div>

      )}

      {answer && (

        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white p-4 flex items-center gap-3">

            <div className="text-2xl">
              🤖
            </div>

            <div>

              <h3 className="text-lg font-bold">
                DriveWise AI
              </h3>

              <p className="text-blue-100 text-sm">
                Metadata-Aware Automotive Assistant
              </p>

            </div>

          </div>

          <div className="p-5">

            <h4 className="text-base font-semibold mb-3 text-slate-800">
              💬 Answer
            </h4>

            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4 text-gray-800 leading-7">

              {answer}

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

              <div className="bg-gray-100 rounded-xl p-4">

                <p className="stat-label">
                  Source
                </p>

                <p className="font-semibold mt-2">
                  📄 {source}
                </p>

              </div>

              <div className="bg-gray-100 rounded-xl p-4">

                <p className="stat-label">
                  Page
                </p>

                <p className="font-semibold mt-2">
                  📖 {page}
                </p>

              </div>

              <div className="bg-green-100 rounded-xl p-4">

                <p className="text-green-700 text-sm">
                  Confidence
                </p>

                <p className="font-bold text-green-800 mt-2">
                  🟢 High
                </p>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default SearchBox;