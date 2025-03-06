import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);

    try {
      let responseText = "";

      // Check if user wants to track a complaint
      const trackMatch = userInput.toLowerCase().match(/track complaint (\w+)/);
      if (trackMatch) {
        const complaintId = trackMatch[1];  // Extracted complaint ID
        const response = await axios.get(`http://localhost:3000/track-complaint/${complaintId}`);
        if (response.data) {
          responseText = `Complaint Details:
          Status: ${response.data.status}
          Category: ${response.data.category}
          Department: ${response.data.department}
          Priority: ${response.data.priority}
          Sentiment: ${response.data.sentiment}`;
        } else {
          responseText = "Complaint not found.";
        }
      } else {
        // Handle as a general AI chat request
        const response = await axios.post("http://localhost:11434/api/generate", {
          model: "mistralai/Mistral-7B-v0.1",
          prompt: userInput,
          max_tokens: 100,
        });

        responseText = response.data.text || "No response from AI.";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: responseText }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, I couldn't process your request." }]);
    }

    setUserInput("");
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      {!isOpen && (
        <button onClick={toggleChat} style={{
          backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "50%",
          width: "50px", height: "50px", fontSize: "20px", cursor: "pointer", boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>💬</button>
      )}

      {isOpen && (
        <div style={{
          width: "300px", backgroundColor: "white", borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column"
        }}>
          <div style={{
            backgroundColor: "#007bff", color: "white", padding: "10px",
            display: "flex", justifyContent: "space-between"
          }}>
            <span>Chat with AI</span>
            <button onClick={toggleChat} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>✖</button>
          </div>

          <div style={{ height: "250px", overflowY: "auto", padding: "10px" }}>
            {messages.map((msg, index) => (
              <div key={index} style={{
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.sender === "user" ? "#007bff" : "#f1f1f1",
                color: msg.sender === "user" ? "white" : "black",
                padding: "8px", borderRadius: "10px", maxWidth: "70%"
              }}>{msg.text}</div>
            ))}
          </div>

          <div style={{ display: "flex", padding: "10px" }}>
            <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask something..." style={{ flex: 1, padding: "8px", borderRadius: "5px" }} />
            <button onClick={handleSend} style={{ marginLeft: "8px", backgroundColor: "#007bff", color: "white", borderRadius: "5px", padding: "8px" }}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
