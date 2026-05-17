import { useState } from "react";
import { Chatbot } from "supersimpledev";
import LoadingSpinner from "../assets/loading-spinner.gif";
import "./ChatInput.css";
import dayjs from "dayjs";

type ChatMessagesProps = {
    message: string|Element;
    sender: string;
    time: string;
    id: string;
  } | {
    message: React.JSX.Element;
    sender: string;
    time: string;
    id: `${string}-${string}-${string}-${string}-${string}`;
};

type ChatInputProps = {
  chatMessages: ChatMessagesProps[],
  setChatMessages: (chatMessages: ChatMessagesProps[]) => void
};

export function ChatInput({ chatMessages, setChatMessages }: ChatInputProps) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setLoadingState] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === "") {
      return;
    }

    const time = dayjs().valueOf();
    const currentTime = dayjs(time).format("h:mma");

    setInputText("");
    setLoadingState(true);

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        time: currentTime,
        id: crypto.randomUUID(),
      },
    ];

    const loadingMessage = [
      ...newChatMessages,
      {
        message: <img src={LoadingSpinner} className="loading-image" />,
        sender: "robot",
        time: currentTime,
        id: crypto.randomUUID(),
      },
    ];

    setChatMessages(loadingMessage); //Replaces the current data with a new array

    const response = await Chatbot.getResponseAsync(inputText);
    console.log(response);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        time: currentTime,
        id: crypto.randomUUID(),
      },
    ]);
    setLoadingState(false);
  }

  function enterMessage(event) {
    if (event.key === "Enter") {
      sendMessage();
    }

    if (event.key === "Escape") {
      setInputText("");
    }
  }

  function clearMessages() {
    setChatMessages([]);
    localStorage.setItem("messages", JSON.stringify([]));
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        onKeyDown={enterMessage}
        value={inputText}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
      <button onClick={clearMessages} className="clear-button">
        Clear
      </button>
    </div>
  );
}
