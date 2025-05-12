import { Typography } from "@mui/material";
import { Message as MessageType } from "../../types";
import MessageItem from "./MessageItem";

type MessageListProps = {
  messages: MessageType[];
};

const MessageList = ({ messages }: MessageListProps) => {
  if (messages.length === 0) {
    return (
      <Typography variant="body1" color="textSecondary">
        No messages yet.
      </Typography>
    );
  }

  return (
    <>
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </>
  );
};

export default MessageList;
