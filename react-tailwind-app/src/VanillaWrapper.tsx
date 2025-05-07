// Define a type for the config
interface ChatConfig {
  // Add your expected properties here
  apiKey?: string;
  userId?: string;
  theme?: string;
  [key: string]: unknown; // fallback for dynamic keys
}

// Define a type for the global window
declare global {
  interface Window {
    NeoChatConfig?: ChatConfig;
    NeoChat?: {
      init: (config?: ChatConfig) => void;
    };
  }
}

import React from "react";
import ReactDOM from "react-dom/client";
import LiveChat from "./LiveChat";

export function initializeChat() {
  const container = document.createElement("div");
  document.body.appendChild(container);

  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <LiveChat />
    </React.StrictMode>
  );
}

// Auto-initialize if config exists
if (typeof window !== "undefined" && window.NeoChatConfig) {
  initializeChat();
}

// Export for manual initialization
window.NeoChat = { init: initializeChat };
