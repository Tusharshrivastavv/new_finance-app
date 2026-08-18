"use client";

import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            text: data.reply,
            sender: "bot",
          },
        ]);
      }
    } catch (error) {
      console.error("Chatbot Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          text: "Error: Unable to get a response.",
          sender: "bot",
        },
      ]);
    }

    setInput("");
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
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-2 ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
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