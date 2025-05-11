import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import TextComponent from "../atoms/TextComponent";
import FooterTabs from "../molecules/FooterTabs";
import GraphComponent from "../molecules/GraphComponent";
import TableComponent from "../molecules/TableComponent";

interface Message {
  id: number; // ID from the mock server
  text: string; // The user’s question
  answer?: string; // The server’s response
  timeStamp?: string; // The time the message was sent
  component?: React.FC<{ text: string }>; // The component to render
  maindata?: string; // The main data from the server
  // This is the data that will be passed to the component
}

const componentMap = {
  table: TableComponent,
  graph: GraphComponent,
  text: TextComponent,
};

const ChatInterface = () => {
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
    <Box
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        height: "100vh",
      }}
    >
      {/* ---------- MIDDLE SECTION: Chat / Messages ---------- */}
      <Box style={{ overflowY: "auto", padding: "16px" }}>
        {messages.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No messages yet.
          </Typography>
        ) : (
          messages.map((msg) => (
            <Box key={msg.id} style={{ marginBottom: "16px" }}>
              <Typography variant="body2" style={{ fontWeight: "bold" }}>
                Q: {msg.text}
              </Typography>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" style={{ marginLeft: "8px" }}>
                  A: {msg.answer}
                </Typography>
                <Typography variant="body2" style={{ marginLeft: "8px" }}>
                  {msg.timeStamp}
                </Typography>
                {msg.component &&
                  msg.maindata &&
                  React.createElement(msg.component, { text: msg.maindata })}
              </Box>
            </Box>
          ))
        )}
      </Box>

      {/* ---------- BOTTOM SECTION: Question box ---------- */}
      <Box
        style={{
          padding: "16px",
          borderTop: "1px solid #ccc",
          backgroundColor: "#fff",
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={2}
          placeholder="Ask something..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ marginBottom: "8px" }}
          disabled={false}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onSend}
          disabled={false}
        >
          Ask
        </Button>
        <div style={{ paddingBottom: 56 }}>
          <FooterTabs
            defaultTab="tab1"
            onChange={(tab) => console.log("Selected:", tab)}
            tabs={allTabs}
          />
        </div>
      </Box>
    </Box>
  );
};

export default ChatInterface;
