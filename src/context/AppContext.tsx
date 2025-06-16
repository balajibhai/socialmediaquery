// src/context/AppContext.tsx
import React, { createContext, ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
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
  const [allTabs, setAllTabs] = useState<TabConfig[]>([
    {
      label: "Preview tab",
      value: "preview",
    },
  ]);
  const dispatch = useDispatch<AppDispatch>();

  const handleTabCreation = async (data: any) => {
    if (data.key === "tab") {
      const newTabs = Array.from({ length: data.numberOfTabs }, (_, i) => ({
        label: `Tab${allTabs.length + i}`,
        value: `tab${allTabs.length + i}`,
      }));
      setAllTabs((prev) => [...prev, ...newTabs]);
    } else if (data.key === "set") {
      setAllTabs((prev) =>
        prev.map((t) =>
          t.value === `tab${data.numberOfTabs}`
            ? { ...t, currentTab: data.numberOfTabs }
            : t
        )
      );
    } else if (data.key === "new") {
      setAllTabs((prev) =>
        prev.concat([
          {
            label: `Tab${allTabs.length}`,
            value: `tab${allTabs.length}`,
            currentTab: allTabs.length,
          },
        ])
      );
      await dispatch(mergeHomeComponents(`tab${allTabs.length}`));
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
          data.key !== MessageComponent.SET &&
          data.key !== MessageComponent.NEW
        ) {
          const { type, format } = parseComponentInput(question);
          await dispatch(
            createComponent({
              key: "preview",
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
