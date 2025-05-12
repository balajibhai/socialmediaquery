import { Box } from "@mui/material";
import React from "react";
import { Message } from "../../types";
import ChatBottomSection from "../molecules/ChatBottomSection";
import ChatMiddleSection from "../molecules/ChatMiddleSection";

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
      <h1 style={{ textAlign: "center" }}>Dynamic component chat</h1>
      <ChatMiddleSection messages={messages} />
      <ChatBottomSection
        question={question}
        setQuestion={setQuestion}
        onSend={onSend}
      />
    </Box>
  );
};

export default ChatInterface;
