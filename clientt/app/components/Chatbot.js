import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
      }
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [...prev, { text: "Error: Unable to get a response.", sender: "bot" }]);
    }

    setInput("");
  }

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 15px",
          borderRadius: "50%",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
        }}
      >
        💬
      </button>

      {isOpen && (
        <div
          style={{
            width: "300px",
            height: "400px",
            backgroundColor: "white",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "absolute",
            bottom: "60px",
            right: "0",
            padding: "10px",
          }}
        >
          <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
            {messages.map((msg, index) => (
              <p
                key={index}
                style={{
                  backgroundColor: msg.sender === "user" ? "#007bff" : "#f1f1f1",
                  color: msg.sender === "user" ? "white" : "black",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  maxWidth: "80%",
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  marginBottom: "5px",
                }}
              >
                {msg.text}
              </p>
            ))}
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #ddd", padding: "5px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                outline: "none",
                fontSize: "14px",
              }}
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "10px 15px",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
