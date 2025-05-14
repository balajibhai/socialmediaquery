import { Box } from "@mui/material";
import ChatBottomSection from "../molecules/ChatBottomSection";
import ChatMiddleSection from "../molecules/ChatMiddleSection";

const ChatInterface = () => {
  return (
    <Box
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        height: "100vh",
      }}
    >
      <h1>Dynamic component chat</h1>
      <ChatMiddleSection />
      <ChatBottomSection />
    </Box>
  );
};

export default ChatInterface;
