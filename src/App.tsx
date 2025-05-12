import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FooterTabs from "./components/molecules/FooterTabs";
import TabRoute from "./components/molecules/TabRoute";
import HomePage from "./pages/HomePage";
import { MessageHandler } from "./services/MessageHandler";
import { Message, TabConfig } from "./types";

const App: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [allTabs, setAllTabs] = useState<TabConfig[]>([
    { label: "Tab1", value: "tab1", component: HomePage },
  ]);

  const handleTabCreation = (data: any) => {
    if (data.key === "tab") {
      const newTabs = Array.from({ length: data.numberOfTabs }, (_, index) => ({
        label: `Tab${allTabs.length + index + 1}`,
        value: `tab${allTabs.length + index + 1}`,
        component: undefined,
      }));
      setAllTabs((prev) => [...prev, ...newTabs]);
    } else if (data.key === "set") {
      setAllTabs((prev) =>
        prev.map((tab) => {
          if (tab.value === `tab${data.numberOfTabs}`) {
            return { ...tab, component: HomePage };
          }
          return tab;
        })
      );
    }
  };

  const updateMessage = (newMessage: Message, data: any, Component: any) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === newMessage.id) {
          return {
            ...msg,
            answer: data.value,
            timeStamp: data.timestamp,
            component: Component,
            maindata: data.maindata,
          };
        }
        return msg;
      })
    );
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
        updateMessage(newMessage, data, Component);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      updateMessage(newMessage, { value: "Error fetching data" }, null);
    }
  };

  return (
    <BrowserRouter>
      <div>
        <Routes>
          {allTabs.map((tab) => (
            <Route
              key={tab.value}
              path={`/${tab.value}`}
              element={
                <TabRoute
                  tab={tab}
                  question={question}
                  setQuestion={setQuestion}
                  messages={messages}
                  onSend={onSend}
                />
              }
            />
          ))}

          <Route
            path="/"
            element={<div>Please select a tab from the footer.</div>}
          />
          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>

        <div style={{ paddingBottom: 56 }}>
          <FooterTabs
            defaultTab="tab1"
            onChange={(tab) => null}
            tabs={allTabs}
          />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
