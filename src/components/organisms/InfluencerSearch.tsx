import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect, useState } from "react";

interface Influencer {
  id: number;
  name: string;
  socialMedia: string;
}

interface SelectedInfluencer extends Influencer {
  selectedId?: number; // ID in the "selectedInfluencers" table (if you want to track that)
}

interface Message {
  id: number;
  text: string; // The user’s question
  answer?: string; // The server’s answer
  influencerId: number;
}

// Mock question response:
interface QuestionPayload {
  text: string;
  answer: string;
  influencerId: number;
}

const InfluencerSearch: React.FC = () => {
  // -----------------------------
  // State
  // -----------------------------
  const [socialMedia, setSocialMedia] = useState<string>("linkedin");
  const [searchValue, setSearchValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Influencer[]>([]);
  const [selectedInfluencers, setSelectedInfluencers] = useState<
    SelectedInfluencer[]
  >([]);
  const [question, setQuestion] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  // -----------------------------
  // Handlers
  // -----------------------------
  const handleSocialMediaChange = (event: SelectChangeEvent<string>) => {
    setSocialMedia(event.target.value);
    setSearchValue(""); // reset search on social media switch
    setSuggestions([]);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // Add new influencer chip and save to mock server
  const handleSelectInfluencer = async (influencer: Influencer) => {
    // Already selected? skip
    if (selectedInfluencers.find((inf) => inf.id === influencer.id)) {
      return;
    }

    try {
      // POST to /selectedInfluencers to store
      const response = await fetch(
        "http://localhost:3001/selectedInfluencers",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(influencer),
        }
      );
      if (!response.ok) throw new Error("Failed to save influencer");

      const savedInfluencer = await response.json();
      // Merge the "selectedId" if you want to track the record’s ID in that table
      const newSelected: SelectedInfluencer = {
        ...influencer,
        selectedId: savedInfluencer.id,
      };

      setSelectedInfluencers((prev) => [...prev, newSelected]);
    } catch (error) {
      console.error("Error saving influencer:", error);
    }
  };

  // Remove influencer chip from local state and from mock server
  const handleRemoveInfluencer = async (infId: number, selectedId?: number) => {
    // Remove from local state
    setSelectedInfluencers((prev) => prev.filter((inf) => inf.id !== infId));

    // Also remove from server by its "selectedInfluencers" ID
    if (selectedId) {
      try {
        const response = await fetch(
          `http://localhost:3001/selectedInfluencers/${selectedId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete influencer");
      } catch (error) {
        console.error("Error deleting influencer:", error);
      }
    }
  };

  // Ask question for the *last* selected influencer (or adapt to your needs)
  const handleAskQuestion = async () => {
    if (!question.trim() || selectedInfluencers.length === 0) return;

    // Let's say we ask the question for the most recently selected influencer:
    const currentInf = selectedInfluencers[selectedInfluencers.length - 1];

    try {
      // POST a new question to /questions. The server might generate the answer, or we do it mock.
      // We'll store a mock "answer" to demonstrate how to fetch it back
      const response = await fetch("http://localhost:3001/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: question,
          answer: `Mock answer for ${currentInf.name}: [${question}]`,
          influencerId: currentInf.id,
        } as QuestionPayload),
      });
      if (!response.ok) throw new Error("Failed to post question");

      const newMessage: Message = await response.json();
      setMessages((prev) => [...prev, newMessage]);
      setQuestion("");
    } catch (error) {
      console.error("Error posting question:", error);
    }
  };

  // -----------------------------
  // Fetch suggestions on searchValue or socialMedia change
  // -----------------------------
  useEffect(() => {
    if (!searchValue.trim()) {
      setSuggestions([]);
      return;
    }
    // GET from /influencers?socialMedia=xxx&q=searchValue
    const fetchSuggestions = async () => {
      try {
        const resp = await fetch(
          `http://localhost:3001/influencers?socialMedia=${socialMedia}&q=${searchValue}`
        );
        if (!resp.ok) throw new Error("Failed to fetch suggestions");
        const data: Influencer[] = await resp.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching influencers:", error);
      }
    };

    fetchSuggestions();
  }, [searchValue, socialMedia]);

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <Box
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        height: "100vh",
      }}
    >
      {/* ---------- TOP SECTION: Dropdown + Autocomplete + Chips ---------- */}
      <Box style={{ padding: "16px", borderBottom: "1px solid #ccc" }}>
        {/* Social Media Dropdown */}
        <FormControl
          variant="outlined"
          style={{ marginRight: "16px", minWidth: "150px" }}
        >
          <InputLabel id="social-media-label">Social Media</InputLabel>
          <Select
            labelId="social-media-label"
            value={socialMedia}
            onChange={handleSocialMediaChange}
            label="Social Media"
          >
            <MenuItem value="linkedin">LinkedIn</MenuItem>
            <MenuItem value="facebook">Facebook</MenuItem>
            <MenuItem value="youtube">YouTube</MenuItem>
            <MenuItem value="twitter">Twitter</MenuItem>
          </Select>
        </FormControl>

        {/* Autocomplete for influencer suggestions */}
        <Autocomplete
          freeSolo
          options={suggestions}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.name
          }
          onChange={(event, newValue) => {
            // If user picks an option from the dropdown
            if (newValue && typeof newValue !== "string") {
              handleSelectInfluencer(newValue);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Search influencers..."
              value={searchValue}
              onChange={handleSearchChange}
              style={{ width: 300 }}
            />
          )}
          style={{ display: "inline-block" }}
        />

        {/* Chips for selected influencers */}
        <Box style={{ marginTop: "16px" }}>
          {selectedInfluencers.map((inf) => (
            <Chip
              key={inf.id}
              label={inf.name}
              onDelete={() => handleRemoveInfluencer(inf.id, inf.selectedId)}
              style={{ marginRight: "8px", marginBottom: "8px" }}
            />
          ))}
        </Box>
      </Box>

      {/* ---------- MIDDLE SECTION: Chat / Messages ---------- */}
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
              <Typography variant="body2" style={{ marginLeft: "8px" }}>
                A: {msg.answer}
              </Typography>
            </Box>
          ))
        )}
      </Box>

      {/* ---------- BOTTOM SECTION: Question box ---------- */}
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
          placeholder={
            selectedInfluencers.length === 0
              ? "Select at least one influencer first..."
              : "Ask any question to the last selected influencer..."
          }
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ marginBottom: "8px" }}
          disabled={selectedInfluencers.length === 0}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAskQuestion}
          disabled={selectedInfluencers.length === 0}
        >
          Ask Question
        </Button>
      </Box>
    </Box>
  );
};

export default InfluencerSearch;
