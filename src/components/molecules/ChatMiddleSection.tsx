import { Box } from "@mui/material";
import MessageList from "./MessageList";

const ChatMiddleSection = () => {
  return (
    <Box style={{ overflowY: "auto", padding: "16px" }}>
      <MessageList />
    </Box>
  );
};

export default ChatMiddleSection;
