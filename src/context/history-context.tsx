import { createContext, useContext, useEffect, useState } from "react";
import type { ColorType } from "../shared/types/colortype";

interface HistoryContextType {
  history: ColorType[];
  setHistory: React.Dispatch<React.SetStateAction<ColorType[]>>;
}
const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<ColorType[]>(() => {
    try {
      const stored = localStorage.getItem("history");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("history", JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history:", e);
    }
  }, [history]);

  return (
    <HistoryContext.Provider value={{ history, setHistory }}>
      {children}{" "}
    </HistoryContext.Provider>
  );
}

export function useHistoryContext() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistoryContext must be used within a HistoryProvider");
  }
  return context;
}
