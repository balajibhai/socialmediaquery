// src/context/AppContext.tsx
import React, { createContext, ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
import HomePage from "../components/pages/HomePage";
import { MessageComponent } from "../constants";
import { AppDispatch } from "../redux/store";
import { createComponent, mergeHomeComponents } from "../redux/tabsSlice";
import { MessageHandler } from "../services/MessageHandler";
import { Message, TabConfig } from "../types";
import { parseComponentInput } from "../utils/parseComponentInput";

interface AppContextType {
  question: string;
  setQuestion: (q: string) => void;
  messages: Message[];
  onSend: () => Promise<void>;
  allTabs: TabConfig[];
  setMessages: (m: Message[]) => void;
  // you can expose these if you need them elsewhere:
  handleTabCreation: (data: any) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [question, setQuestion] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  // TODO: using the HomePage as a component and defining it as tab1 feels bad
  // why to forcefully bring the chat and preview under tab?
  const [allTabs, setAllTabs] = useState<TabConfig[]>([
    { label: "Preview tab", value: "tab1", component: HomePage, currentTab: 0 },
  ]);
  const dispatch = useDispatch<AppDispatch>();

  const handleTabCreation = (data: any) => {
    if (data.key === "tab") {
      const newTabs = Array.from({ length: data.numberOfTabs }, (_, i) => ({
        label: `Tab${allTabs.length + i + 1}`,
        value: `tab${allTabs.length + i + 1}`,
        component: undefined,
      }));
      setAllTabs((prev) => [...prev, ...newTabs]);
    } else if (data.key === "set") {
      // TODO: what happens if tab(say tab2) does not exist?
      setAllTabs((prev) =>
        prev.map((t) =>
          t.value === `tab${data.numberOfTabs}`
            ? { ...t, currentTab: data.numberOfTabs }
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
        const { data } = result;
        if (
          data.key !== MessageComponent.TAB &&
          data.key !== MessageComponent.SET
        ) {
          const { type, format } = parseComponentInput(question);
          await dispatch(
            createComponent({
              key: "tab1",
              type: type, // or "table" | "text"
              data: format,
            })
          );
        }
        if (data.key === MessageComponent.SET) {
          await dispatch(mergeHomeComponents(`tab${data.numberOfTabs}`));
        }
        handleTabCreation(data);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === newMessage.id
              ? {
                  ...m,
                  answer: data.value,
                  timeStamp: data.timestamp,
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
        setMessages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
