import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/app.tsx";
import { HistoryProvider } from "./context/history-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HistoryProvider>
      <App />
    </HistoryProvider>
  </StrictMode>
);
