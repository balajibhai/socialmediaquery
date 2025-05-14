import { Box, Typography } from "@mui/material";
import { Message } from "../../types";

type MessageItemProps = {
  message: Message;
};

const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <Box style={{ marginBottom: "16px" }}>
      <Typography variant="body2" style={{ fontWeight: "bold" }}>
        Q: {message.text}
      </Typography>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body2" style={{ marginLeft: "8px" }}>
          A: {message.answer}
        </Typography>
        <Typography variant="body2" style={{ marginLeft: "8px" }}>
          {message.timeStamp}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageItem;
