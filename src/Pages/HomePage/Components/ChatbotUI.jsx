// // src/components/ChatbotUI.jsx
// import React from "react";

// function ChatbotUI({ onClose }) {
//   return (
//     <div className="fixed bottom-24 right-5 sm:w-[400px] md:w-[600px] p-4 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-lg z-[1001]">
//       <h2 className="text-lg font-semibold mb-2">Totot Chatbot 🤖</h2>
//       <p>Hello, I'm the chatbot. This UI is working!</p>
//       <p>Hello, I'm the chatbot. This UI is working!</p>
//       <button
//         className="mt-4 w-full bg-ethiopian-red text-white py-2 rounded hover:opacity-90 transition"
//         onClick={onClose}
//       >
//         Close
//       </button>
//     </div>
//   );
// }

// export default ChatbotUI;

import React, { useState } from "react";
import { FaPaperPlane, FaUtensils, FaCalendarAlt, FaLeaf, FaQuestionCircle } from "react-icons/fa";

function ChatbotUI({ onClose }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim() === "") return;
    setMessages([...messages, { text: message, from: "user" }]);
    setMessage("");
  };

  const sampleQuestions = [
    "What's your most popular dish?",
    "Do you cater for events?",
    "Do you have vegan or vegetarian dishes?",
    "Are you open on holidays?",
    "Can you explain what kitfo is?",
  ];

  const handleSampleClick = (q) => {
    setMessages([...messages, { text: q, from: "user" }]);
  };

  return (
    <div className="fixed bottom-24 right-5 md:w-[700px] sm:w-[500px] p-4 bg-white dark:bg-gray-800 text-black dark:text-white rounded-3xl shadow-2xl z-[1001]">
      {/* Header */}
      <header className="mb-4 text-center">
        <h1 className="flex items-center justify-center gap-2 mb-1 text-2xl font-bold">
          <FaUtensils />
          Totot's Assistant
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Your AI powered culinary assistant
        </p>
      </header>

      {/* Chat Display */}
      <div className="p-4 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg min-h-48 max-h-48 overflow-y-auto scroll-smooth space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-1 rounded-lg ${
              msg.from === "user"
                ? "bg-amber-300 text-black self-end ml-auto w-fit"
                : "bg-white text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Sample Questions */}
      <section>
        <h2 className="mb-2 text-md font-bold">Sample Questions:</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {sampleQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSampleClick(q)}
              className="px-3 py-1 text-sm text-gray-800 bg-white border rounded-full shadow-sm hover:bg-gray-50 dark:bg-gray-600 dark:text-white"
            >
              {q}
            </button>
          ))}
        </div>
      </section>

      {/* Input + Send */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask Totobot anything..."
          className="flex-1 px-4 py-3 text-sm text-white bg-amber-800 border border-amber-700 rounded-2xl placeholder-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
        <button
          onClick={sendMessage}
          className="p-3 text-white bg-amber-600 rounded-2xl hover:bg-amber-500"
        >
          <FaPaperPlane className="w-5 h-5" />
        </button>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-1 right-5 mt-4 w-6 py-1 text-sm font-semibold text-white bg-ethiopian-red rounded hover:opacity-90"
      >
        X
      </button>
    </div>
  );
}

export default ChatbotUI;
