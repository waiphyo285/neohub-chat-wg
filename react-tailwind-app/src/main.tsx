import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import LiveChat from "./LiveChat";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}

    <LiveChat
      config={{
        position: "right",
        iconColor: "#1890ff",
        headerText: "Customer Support",
      }}
    />
  </StrictMode>
);
