import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { Message } from "../../types";

type ChatInterfaceProps = {
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  messages: Message[];
  onSend: () => void;
};

const ChatInterface = (props: ChatInterfaceProps) => {
  const { question, setQuestion, messages, onSend } = props;
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
      </Box>
    </Box>
  );
};

export default ChatInterface;
