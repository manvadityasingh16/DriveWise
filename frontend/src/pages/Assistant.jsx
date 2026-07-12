import { API_BASE_URL } from "../api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Send,
  Car,
  Copy,
  Trash2,
  Sparkles,
} from "lucide-react";

export default function Assistant() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/brochures`);
      const data = await res.json();

      setCars(data);

      if (data.length > 0) {
        setSelectedCar(data[0].name);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const askAI = async (customQuestion = null) => {
    const finalQuestion = customQuestion || question;

    if (!finalQuestion.trim()) return;

    setLoading(true);

    const userMessage = {
      type: "user",
      text: finalQuestion,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch(`${API_BASE_URL}/ask`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    brand: selectedCar.split(" ")[0],
    model: selectedCar.split(" ").slice(1).join(" "),
    question: finalQuestion,
  }),
});

const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          answer: data.answer,
          source: data.source,
          page: data.page,
        },
      ]);

      setQuestion("");
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const suggestedQuestions = [
    "What is the mileage?",
    "Tell me about the engine.",
    "What are the safety features?",
    "What is the price?",
    "What are the dimensions?",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-linear-to-br from-slate-100 via-white to-blue-100 p-4 sm:p-6 md:p-8 pt-10 sm:pt-12 md:pt-14"
    >
      {/* Header */}

      <div className="mb-6">

        <h1 className="page-title">

          <Bot
            size={28}
            className="text-blue-600 shrink-0"
          />

          DriveWise AI Assistant

        </h1>

        <p className="page-subtitle">

          Ask intelligent questions about uploaded vehicle brochures.

        </p>

      </div>

      {/* Car Selector */}

      <div className="card p-5 mb-5">

        <label className="font-semibold flex items-center gap-2 mb-3 text-slate-700 text-sm">

          <Car size={18} />

          Select Vehicle

        </label>

        <select
          value={selectedCar}
          onChange={(e) => setSelectedCar(e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500"
        >
          {cars.map((car) => (
            <option
              key={car.filename}
              value={car.name}
            >
              {car.name}
            </option>
          ))}
        </select>

      </div>

      {/* Question Box */}

      <div className="card p-5 mb-5">

        <textarea
          rows="4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything about this vehicle..."
          className="w-full border border-gray-200 rounded-xl p-3 outline-none resize-none focus:border-blue-500"
        />

        <button
          onClick={() => askAI()}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold flex justify-center items-center gap-2 transition disabled:opacity-60"
        >
          <Sparkles size={18} />

          {loading ? "Thinking..." : "Ask DriveWise"}

        </button>

      </div>

      {/* Chat */}

      <div className="card p-5">

        <div className="flex justify-between items-center mb-5">

          <h2 className="section-title flex items-center gap-2">

            <Bot className="text-blue-600" size={20} />

            Conversation

          </h2>

          <button
            onClick={() => setMessages([])}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition"
          >
            <Trash2 size={16} />
            Clear Chat
          </button>

        </div>

        {messages.length === 0 && (

          <div className="text-center py-10">

            <Bot
              size={48}
              className="mx-auto text-blue-600 mb-3"
            />

            <h3 className="section-title">

              Start chatting with DriveWise AI

            </h3>

            <p className="page-subtitle">

              Ask questions about any uploaded brochure.

            </p>

          </div>

        )}

        <div className="space-y-5">

          {messages.map((msg, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >

              {msg.type === "user" ? (

                <div className="flex justify-end">

                  <div className="bg-blue-600 text-white rounded-2xl px-5 py-4 max-w-2xl">

                    {msg.text}

                  </div>

                </div>

              ) : (

                <div className="flex justify-start">

                  <div className="bg-slate-100 rounded-2xl p-5 max-w-3xl w-full">

                    <div className="flex items-center gap-2 mb-4">

                      <Bot
                        className="text-blue-600"
                        size={22}
                      />

                      <span className="font-bold">

                        DriveWise AI

                      </span>

                    </div>

                    <p className="leading-8 whitespace-pre-wrap">

                      {msg.answer}

                    </p>

                    <div className="mt-5 flex flex-wrap justify-between items-center border-t pt-4">

                      <div>

                        <p className="text-sm text-gray-500">

                          📄 {msg.source}

                        </p>

                        <p className="text-sm text-gray-500">

                          Page {msg.page}

                        </p>

                      </div>

                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(msg.answer)
                        }
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
                      >

                        <Copy size={18} />

                        Copy

                      </button>

                    </div>

                  </div>

                </div>

              )}

            </motion.div>

          ))}

        </div>

      </div>

      {/* Suggested Questions */}

      <div className="card p-5 mt-5">

        <h2 className="section-title mb-4">

          💡 Suggested Questions

        </h2>

        <div className="flex flex-wrap gap-2">

          {suggestedQuestions.map((q) => (

            <button
              key={q}
              onClick={() => askAI(q)}
              className="bg-slate-100 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full text-sm transition"
            >

              {q}

            </button>

          ))}

        </div>

      </div>

    </motion.div>
  );
}