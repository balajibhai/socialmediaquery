import { Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import MessageItem from "./MessageItem";

const MessageList = () => {
  const { messages } = useContext(AppContext)!;
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
