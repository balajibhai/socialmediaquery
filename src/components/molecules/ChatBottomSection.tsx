import { Box, Button, TextField } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const ChatBottomSection = () => {
  const { question, setQuestion, onSend } = useContext(AppContext)!;
  return (
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
  );
};

export default ChatBottomSection;
