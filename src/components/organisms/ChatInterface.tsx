import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import TableComponent from "../molecules/TableComponent";

interface Message {
  id: number; // ID from the mock server
  text: string; // The user’s question
  answer?: string; // The server’s response
  timeStamp?: string; // The time the message was sent
  component?: React.FC; // The component to render
}

const componentMap = {
  table: TableComponent,
  // text: "TextComponent",
  // graph: "GraphComponent",
};

const ChatInterface = () => {
  const [question, setQuestion] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

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
        console.log("Component: ", Component);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id
              ? {
                  ...msg,
                  answer: data.value,
                  timeStamp: data.timestamp,
                  component: Component,
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
              <Box style={{ display: "flex", flexDirection: "row" }}>
                <Typography variant="body2" style={{ marginLeft: "8px" }}>
                  A: {msg.answer}
                </Typography>
                <Typography variant="body2" style={{ marginLeft: "8px" }}>
                  {msg.timeStamp}
                </Typography>
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
      </Box>
    </Box>
  );
};

export default ChatInterface;
