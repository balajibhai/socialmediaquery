import { Box, Button, TextField } from "@mui/material";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../../context/AppContext";
import { RootState } from "../../redux/store";
import FloatingButton from "../atoms/FloatingButton";

const ChatBottomSection = () => {
  const { question, setQuestion, onSend } = useContext(AppContext)!;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuestion(value);
  };
  const activeTabKey = useSelector(
    (state: RootState) => state.tabs.activeTabKey
  );

  return (
    <Box
      style={{
        padding: "16px",
        borderTop: "1px solid #ccc",
        backgroundColor: "#fff",
        width: "50%",
      }}
    >
      <TextField
        variant="outlined"
        fullWidth
        multiline
        rows={2}
        placeholder="Ask something..."
        value={question}
        onChange={handleChange}
        style={{ marginBottom: "8px" }}
        disabled={false}
      />
      {activeTabKey === "tab1" && <FloatingButton />}
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
