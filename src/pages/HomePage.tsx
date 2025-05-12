import { useState } from "react";
import TextComponent from "../components/atoms/TextComponent";
import FooterTabs from "../components/molecules/FooterTabs";
import GraphComponent from "../components/molecules/GraphComponent";
import TableComponent from "../components/molecules/TableComponent";
import ChatInterface from "../components/organisms/ChatInterface";
import { Message } from "../types";

const componentMap = {
  table: TableComponent,
  graph: GraphComponent,
  text: TextComponent,
};

const HomePage = () => {
  const [question, setQuestion] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [allTabs, setAllTabs] = useState([{ label: "Tab1", value: "tab1" }]);
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: question }),
      });
      const data = await response.json();
      if (data.key) {
        const Component = componentMap[data.key as keyof typeof componentMap];
        if (data.key === "tab") {
          const newTabs = Array.from(
            { length: data.numberOfTabs },
            (_, index) => ({
              label: `Tab${allTabs.length + index + 1}`,
              value: `tab${allTabs.length + index + 1}`,
            })
          );
          setAllTabs((prev) => [...prev, ...newTabs]);
        } else if (data.key === "set") {
          setAllTabs((prev) =>
            prev.map((tab) =>
              tab.value === `tab${data.numberOfTabs}`
                ? { ...tab, text: data.maindata }
                : tab
            )
          );
        }
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
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Dynamic component chat</h1>
      <ChatInterface
        question={question}
        setQuestion={setQuestion}
        messages={messages}
        onSend={onSend}
      />
      <div style={{ paddingBottom: 56 }}>
        <FooterTabs
          defaultTab="tab1"
          onChange={(tab) => console.log("Selected:", tab)}
          tabs={allTabs}
        />
      </div>
    </div>
  );
};

export default HomePage;
