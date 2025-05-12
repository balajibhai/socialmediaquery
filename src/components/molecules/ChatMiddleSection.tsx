import { Box, Typography } from "@mui/material";
import React from "react";
import { Message } from "../../types";

type ChatMiddleSectionProps = {
  messages: Message[];
};

const ChatMiddleSection = (props: ChatMiddleSectionProps) => {
  const { messages } = props;
  return (
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
  );
};

export default ChatMiddleSection;
