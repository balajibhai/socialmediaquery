// src/context/AppContext.tsx
import React, { createContext, ReactNode, useState } from "react";
import HomePage from "../pages/HomePage";
import { MessageHandler } from "../services/MessageHandler";
import { Message, TabConfig } from "../types";

interface AppContextType {
  question: string;
  setQuestion: (q: string) => void;
  messages: Message[];
  onSend: () => Promise<void>;
  allTabs: TabConfig[];
  // you can expose these if you need them elsewhere:
  handleTabCreation: (data: any) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [question, setQuestion] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [allTabs, setAllTabs] = useState<TabConfig[]>([
    { label: "Tab1", value: "tab1", component: HomePage },
  ]);

  const handleTabCreation = (data: any) => {
    if (data.key === "tab") {
      const newTabs = Array.from({ length: data.numberOfTabs }, (_, i) => ({
        label: `Tab${allTabs.length + i + 1}`,
        value: `tab${allTabs.length + i + 1}`,
        component: undefined,
      }));
      setAllTabs((prev) => [...prev, ...newTabs]);
    } else if (data.key === "set") {
      setAllTabs((prev) =>
        prev.map((t) =>
          t.value === `tab${data.numberOfTabs}`
            ? { ...t, component: HomePage }
            : t
        )
      );
    }
  };

  const onSend = async () => {
    if (!question) return;
    const newMessage = MessageHandler.createNewMessage(
      question,
      messages.length
    );
    setMessages((prev) => [...prev, newMessage]);
    setQuestion("");

    try {
      const result = await MessageHandler.handleMessageSubmission(
        question,
        messages
      );
      if (result) {
        const { data, Component } = result;
        handleTabCreation(data);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === newMessage.id
              ? {
                  ...m,
                  answer: data.value,
                  timeStamp: data.timestamp,
                  component: Component,
                  maindata: data.maindata,
                }
              : m
          )
        );
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === newMessage.id ? { ...m, answer: "Error fetching data" } : m
        )
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        question,
        setQuestion,
        messages,
        onSend,
        allTabs,
        handleTabCreation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
