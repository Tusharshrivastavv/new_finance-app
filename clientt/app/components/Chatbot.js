"use client";

import { useState } from "react";
import { chatbotQA, SUGGESTED_QUESTION_IDS } from "../data/chatbotData";

const STARTER_SUGGESTIONS = SUGGESTED_QUESTION_IDS.map((id) =>
  chatbotQA.find((q) => q.id === id)
).filter(Boolean);

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(STARTER_SUGGESTIONS);

  async function sendToBot({ text, questionId }) {
    const userMessage = { text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setSuggestions([]);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, questionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      if (data.reply) {
        setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
      }

      if (data.suggestions && data.suggestions.length > 0) {
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error: Unable to get a response.", sender: "bot" },
      ]);
    }
  }

  async function sendMessage() {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    await sendToBot({ text });
  }

  async function handleSuggestionClick(suggestion) {
    await sendToBot({ text: suggestion.question, questionId: suggestion.id });
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-[1000]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full text-lg sm:text-xl border-none cursor-pointer shadow-lg transition"
      >
        💬
      </button>

      {isOpen && (
        <div
          className="
            absolute
            bottom-16
            right-0
            w-[calc(100vw-32px)]
            max-w-[350px]
            h-[70vh]
            max-h-[450px]
            min-h-[350px]
            bg-white
            shadow-xl
            rounded-xl
            flex
            flex-col
            overflow-hidden
            p-2
          "
        >
          <div className="flex-1 overflow-y-auto p-2 sm:p-3">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 text-sm mt-2 mb-3">
                Hi! Ask me anything about your finances, or pick a question below 👇
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <p
                  className={`px-3 py-2 rounded-xl max-w-[80%] break-words text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </p>
              </div>
            ))}

            {suggestions.length > 0 && (
              <div className="flex flex-col gap-2 mt-2">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSuggestionClick(s)}
                    className="text-left text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg px-3 py-2 transition cursor-pointer"
                  >
                    {s.question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex border-t border-gray-300 p-1 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              className="
                flex-1
                min-w-0
                p-2
                sm:p-3
                bg-white
                text-black
                caret-black
                placeholder-gray-500
                border-none
                outline-none
                text-sm
              "
              placeholder="Type a message..."
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg cursor-pointer transition"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}