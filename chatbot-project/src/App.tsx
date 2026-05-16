import { useState, useEffect } from "react";
import { ChatInput } from "./components/ChatInput";
import { Chatbot } from "supersimpledev";
import ChatMessages from "./components/ChatMessages";
import ChatbotFavicon from "./assets/robot.png";
import "./App.css";

function App() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem("messages")!) || [],
  );
  useEffect(() => {
    Chatbot.addResponses({
      goodbye: "Goodbye, have a good day!",
      "give me a random id": `Sure! You got: ${(() => crypto.randomUUID())()}`,
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  // const [chatMessages, setChatMessages] = array;

  /*
  const chatMessages = array[0]; // Current Data
  const setChatMessages = array[1]; // Updates the data
  */

  const num = chatMessages.length;
  const title = `${num} messasges`; 

  return (
    <>
      <title>{title}</title>
      <link rel="icon" href={ChatbotFavicon} />

      <div className="app-container">
        <ChatMessages chatMessages={chatMessages} />
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      </div>
    </>
  );
}

export default App;
