import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import SearchBar from "../molecules/SearchBar";

interface Message {
  id: number;
  text: string; // The user’s question
  answer?: string; // The server’s answer
}

const InfluencerSearch = () => {
  const [socialMedia, setSocialMedia] = useState<string>("linkedin");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedInfluencer, setSelectedInfluencer] = useState<string | null>(
    null
  );
  const [question, setQuestion] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSocialMediaChange = (event: SelectChangeEvent<string>) => {
    setSocialMedia(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      setSelectedInfluencer(searchQuery);
      // Clear any existing messages when a new influencer is searched
      setMessages([]);
    }
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  // --------------------
  // POST the question to the mock server and retrieve a response
  // --------------------
  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    try {
      const response = await fetch("http://localhost:3001/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: question,
          answer: `Mock answer for "${question}"`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post question");
      }
      const newMessage: Message = await response.json();
      setQuestion("");
      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error("Error posting question:", error);
    }
  };

  return (
    <Box
      // Use grid to pin the bottom, scroll in the middle
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        height: "100vh",
      }}
    >
      {/* ---------- TOP (Search Bar & Influencer Info) ---------- */}
      <Box style={{ padding: "16px" }}>
        <SearchBar
          socialMedia={socialMedia}
          onSocialMediaChange={handleSocialMediaChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />

        {selectedInfluencer && (
          <Typography variant="h6" style={{ marginTop: "16px" }}>
            Influencer: {selectedInfluencer} ({socialMedia})
          </Typography>
        )}
      </Box>

      {/* ---------- MIDDLE (Chat Section) ---------- */}
      <Box
        style={{
          overflowY: "auto",
          padding: "16px",
        }}
      >
        {/* Display each question and answer */}
        {messages.map((msg) => (
          <Box key={msg.id} style={{ marginBottom: "16px" }}>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              Q: {msg.text}
            </Typography>
            {msg.answer && (
              <Typography variant="body1">A: {msg.answer}</Typography>
            )}
          </Box>
        ))}

        {!messages.length && selectedInfluencer && (
          <Typography variant="body2" color="textSecondary">
            No messages yet. Ask your first question!
          </Typography>
        )}
      </Box>

      {/* ---------- BOTTOM (Question Box) ---------- */}
      {selectedInfluencer && (
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
            placeholder="Ask any question based on their profile..."
            value={question}
            onChange={handleQuestionChange}
            style={{ marginBottom: "8px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAskQuestion}
          >
            Ask Question
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default InfluencerSearch;
