import React, { useState, useRef, useEffect } from "react";
import {
  FaPaperPlane,
  FaUtensils,
  FaCalendarAlt,
  FaLeaf,
  FaQuestionCircle,
} from "react-icons/fa";

function ChatbotUI({ onClose }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null); // ✅ 1. Add ref

  const sampleQuestions = [
    "What's your most popular dish?",
    "Do you cater for events?",
    "Do you have vegan or vegetarian dishes?",
    "Are you open on holidays?",
    "Can you explain what kitfo is?",
  ];

  // ✅ 2. Scroll to bottom on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const triggerBotResponse = (currentMessages) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages([
        ...currentMessages,
        { text: "Totobot is still learning. Please stay tuned!", from: "bot" },
      ]);
    }, 1500); // simulate typing delay
  };

  const sendMessage = () => {
    if (message.trim() === "") return;
    const newMessages = [...messages, { text: message, from: "user" }];
    setMessages(newMessages);
    setMessage("");
    triggerBotResponse(newMessages);
  };

  const handleSampleClick = (q) => {
    const newMessages = [...messages, { text: q, from: "user" }];
    setMessages(newMessages);
    triggerBotResponse(newMessages);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-[1000]">
      <div className="relative w-full max-w-2xl p-4 text-black bg-white shadow-2xl dark:bg-gray-800 dark:text-white rounded-3xl">
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
        <div
          ref={chatContainerRef} // ✅ 3. Attach ref
          className="p-4 mb-4 space-y-2 overflow-y-auto bg-gray-100 rounded-lg dark:bg-gray-700 min-h-48 max-h-48 scroll-smooth"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-1 rounded-lg ${
                msg.from === "user"
                  ? "bg-amber-300 text-black self-end ml-auto w-fit"
                  : "bg-white dark:bg-gray-600 text-black dark:text-white w-fit"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 p-2 bg-white rounded-lg dark:bg-gray-600 w-fit animate-pulse">
              <span className="text-sm text-gray-600 dark:text-gray-200">
                Totobot is typing...
              </span>
            </div>
          )}
        </div>

        {/* Sample Questions */}
        <section>
          <h2 className="mb-2 font-bold text-md">Sample Questions:</h2>
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
            className="flex-1 px-4 py-3 text-sm text-white border bg-amber-800 border-amber-700 rounded-2xl placeholder-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
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
          className="absolute w-6 py-1 mt-4 text-sm font-semibold text-white rounded top-1 right-5 bg-ethiopian-red hover:opacity-90"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default ChatbotUI;
