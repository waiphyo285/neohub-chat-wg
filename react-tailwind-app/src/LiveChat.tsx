import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

interface LiveChatProps {
  config?: {
    position?: "left" | "right";
    iconColor?: string;
    headerText?: string;
  };
}

const LiveChat: React.FC<LiveChatProps> = ({ config = {} }) => {
  const {
    position = "right",
    iconColor = "#1890ff",
    headerText = "Live Chat",
  } = config;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);
  const closeChat = () => setIsOpen(false);

  const sendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;

    const newMessage: Message = {
      id: Date.now(),
      text,
      isUser: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    setTimeout(() => {
      const response: Message = {
        id: Date.now() + 1,
        text: "Thanks for your message! We'll respond shortly.",
        isUser: false,
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className={`fixed bottom-5 ${
        position === "left" ? "left-5" : "right-5"
      } z-[9999]`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className={`h-14 rounded-full cursor-pointer text-white ${
          isOpen ? "hidden" : "block"
        }`}
        style={{ backgroundColor: iconColor }}
        aria-label="Open chat"
      >
        💬
      </button>

      {/* Chat Box */}
      <div
        className={`w-100 h-[420px] bg-white border border-gray-300 mt-2 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {/* Header */}
        <div
          className="relative p-2 text-white"
          style={{ backgroundColor: iconColor }}
        >
          <span
            className="absolute right-2 top-1 cursor-pointer text-lg"
            onClick={closeChat}
            aria-label="Close chat"
          >
            ×
          </span>
          {headerText}
        </div>

        {/* Messages */}
        <div
          ref={chatBodyRef}
          className="h-[300px] overflow-y-auto p-2 font-sans text-sm"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`my-1 p-2 rounded max-w-[80%] text-black  ${
                message.isUser
                  ? "ml-auto bg-gray-100 text-right"
                  : "mr-auto bg-blue-50 text-left"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex p-2 gap-1">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 text-black "
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="p-2 text-white"
            style={{ backgroundColor: iconColor }}
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
