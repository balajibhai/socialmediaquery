import React, { ComponentType, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TextComponent from "./components/atoms/TextComponent";
import FooterTabs from "./components/molecules/FooterTabs";
import GraphComponent from "./components/molecules/GraphComponent";
import TableComponent from "./components/molecules/TableComponent";
import HomePage from "./pages/HomePage";
import { Message } from "./types";

const componentMap = {
  table: TableComponent,
  graph: GraphComponent,
  text: TextComponent,
};

// Allow the component slot to be either a React component or left undefined
type TabConfig = {
  label: string;
  value: string;
  component?: ComponentType<any>;
};

const App: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [allTabs, setAllTabs] = useState<TabConfig[]>([
    { label: "Tab1", value: "tab1", component: HomePage },
  ]);

  const onSend = async () => {
    if (!question) return;
    const newMessage: Message = {
      id: messages.length + 1,
      text: question,
    };
    setMessages((prev) => [...prev, newMessage]);
    setQuestion("");
    try {
      const response = await fetch("http://localhost:5000/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: question }),
      });
      const data = await response.json();

      if (data.key) {
        const Component = componentMap[data.key as keyof typeof componentMap];

        if (data.key === "tab") {
          // add N new empty tabs
          const newTabs = Array.from(
            { length: data.numberOfTabs },
            (_, index) => ({
              label: `Tab${allTabs.length + index + 1}`,
              value: `tab${allTabs.length + index + 1}`,
              component: undefined,
            })
          );
          setAllTabs((prev) => [...prev, ...newTabs]);
        } else if (data.key === "set") {
          // assign HomePage to a specific tab
          setAllTabs((prev) =>
            prev.map((tab) =>
              tab.value === `tab${data.numberOfTabs}`
                ? { ...tab, component: HomePage }
                : tab
            )
          );
        }

        // attach the answer/component to the message
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id
              ? {
                  ...msg,
                  answer: data.value,
                  timeStamp: data.timestamp,
                  component: Component,
                  maindata: data.maindata,
                }
              : msg
          )
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id
            ? { ...msg, answer: "Error fetching data" }
            : msg
        )
      );
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
                tab.component ? (
                  <tab.component
                    question={question}
                    setQuestion={setQuestion}
                    messages={messages}
                    onSend={onSend}
                  />
                ) : (
                  <div>No Component Assigned</div>
                )
              }
            />
          ))}

          {/* Optional: redirect root to first tab */}
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
