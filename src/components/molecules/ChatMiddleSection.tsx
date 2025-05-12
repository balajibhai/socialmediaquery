import { Box } from "@mui/material";
import { Message } from "../../types";
import MessageList from "./MessageList";

type ChatMiddleSectionProps = {
  messages: Message[];
};

const ChatMiddleSection = ({ messages }: ChatMiddleSectionProps) => {
  return (
    <Box style={{ overflowY: "auto", padding: "16px" }}>
      <MessageList messages={messages} />
    </Box>
  );
};

export default ChatMiddleSection;
