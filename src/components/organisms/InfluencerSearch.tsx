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

// We store each Q&A message in the `messages` state:
interface Message {
  id: number; // ID from the mock server
  text: string; // The user’s question
  answer?: string; // The server’s response
  influencerId: number; // Which influencer answered
}

const InfluencerSearch = () => {
  // -----------------------------
  // State variables
  // -----------------------------
  const [socialMedia, setSocialMedia] = useState<string>("linkedin");
  const [searchValue, setSearchValue] = useState<string>("");

  // Suggestions from mock server filtered by social media + search text
  const [suggestions, setSuggestions] = useState<Influencer[]>([]);

  // The influencers chosen by the user (multi-select)
  const [selectedInfluencers, setSelectedInfluencers] = useState<Influencer[]>(
    []
  );

  // The typed question to be asked
  const [question, setQuestion] = useState<string>("");

  // All Q&A messages to display in the “chat” section
  const [messages, setMessages] = useState<Message[]>([]);

  // -----------------------------
  // Handlers
  // -----------------------------
  const handleSocialMediaChange = (event: SelectChangeEvent<string>) => {
    setSocialMedia(event.target.value);
    setSearchValue("");
    setSuggestions([]);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  /**
   * Called when Autocomplete’s selection changes.
   * `newValue` can contain strings (freeSolo) or Influencer objects.
   */
  const handleInfluencerChange = async (
    event: React.SyntheticEvent,
    newValue: Array<string | Influencer>
  ) => {
    // 1. Filter out any freeSolo strings (or handle them if you want to create new records)
    const filtered = newValue.filter(
      (item): item is Influencer => typeof item !== "string"
    );

    // 2. Build a set of IDs for quick membership checking
    const newIds = new Set(filtered.map((inf) => inf.id));

    // 3. Identify newly added influencers (in the new list but not in old)
    const newlyAdded = filtered.filter(
      (inf) => !selectedInfluencers.some((s) => s.id === inf.id)
    );

    // 4. Identify removed influencers (in the old list but not in new)
    const removed = selectedInfluencers.filter(
      (oldInf) => !newIds.has(oldInf.id)
    );

    // 5. POST newly added to `selectedInfluencers` on the server
    for (const inf of newlyAdded) {
      try {
        await fetch("http://localhost:3001/selectedInfluencers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inf),
        });
      } catch (error) {
        console.error("Error adding influencer:", inf.name, error);
      }
    }

    // 6. DELETE removed from server
    for (const inf of removed) {
      try {
        // We need the exact record ID in the `selectedInfluencers` table.
        // If we only have the influencer’s “id”, we must look up that record in the mock server.
        // In a real scenario, you'd store the ID from selectedInfluencers.
        // For simplicity, let’s do a find or we can do a naive approach:
        // GET /selectedInfluencers?name=inf.name&socialMedia=inf.socialMedia
        const resp = await fetch(
          `http://localhost:3001/selectedInfluencers?name=${encodeURIComponent(
            inf.name
          )}&socialMedia=${inf.socialMedia}`
        );
        const records: Influencer[] = await resp.json();
        if (records.length > 0) {
          // We’ll assume just one record
          const recordId = records[0].id;
          await fetch(`http://localhost:3001/selectedInfluencers/${recordId}`, {
            method: "DELETE",
          });
        }
      } catch (error) {
        console.error("Error removing influencer:", inf.name, error);
      }
    }

    // 7. Update local state
    setSelectedInfluencers(filtered);
  };

  // Ask a question to ALL selected influencers
  const handleAskQuestion = async () => {
    if (!question.trim() || selectedInfluencers.length === 0) return;

    try {
      // For each selected influencer, POST a new question to /questions
      const newMessages: Message[] = [];
      for (const inf of selectedInfluencers) {
        const response = await fetch("http://localhost:3001/questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: question,
            answer: `Mock answer from ${inf.name} for: "${question}"`,
            influencerId: inf.id,
          }),
        });
        if (!response.ok) throw new Error("Failed to post question");
        const createdMessage: Message = await response.json();
        newMessages.push(createdMessage);
      }
      // Update local messages state with all newly created Q&As
      setMessages((prev) => [...prev, ...newMessages]);
      setQuestion("");
    } catch (error) {
      console.error("Error posting question:", error);
    }
  };

  // -----------------------------
  // Fetch suggestions
  // -----------------------------
  useEffect(() => {
    if (!searchValue.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        // GET from /influencers?socialMedia=xxx&q=searchValue
        const resp = await fetch(
          `http://localhost:3001/influencers?socialMedia=${socialMedia}&q=${searchValue}`
        );
        if (!resp.ok) throw new Error("Failed to fetch influencers");
        const data: Influencer[] = await resp.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [searchValue, socialMedia]);

  // Optionally, on mount, fetch any previously selected influencers:
  useEffect(() => {
    const fetchSelectedInfluencers = async () => {
      try {
        const resp = await fetch("http://localhost:3001/selectedInfluencers");
        if (resp.ok) {
          const data: Influencer[] = await resp.json();
          setSelectedInfluencers(data);
        }
      } catch (error) {
        console.error("Error fetching selectedInfluencers:", error);
      }
    };
    fetchSelectedInfluencers();
  }, []);

  // -----------------------------
  // Layout
  // -----------------------------
  return (
    <Box
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        height: "100vh",
      }}
    >
      {/* ---------- TOP SECTION: Social Media + Autocomplete ---------- */}
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

        {/* Autocomplete with multiple selection */}
        <Autocomplete
          multiple
          freeSolo
          value={selectedInfluencers}
          options={suggestions}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.name
          }
          onChange={handleInfluencerChange}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip
                label={option.name}
                {...getTagProps({ index })} // This includes the "key" prop
              />
            ))
          }
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
        />
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
              : "Ask a question to ALL selected influencers..."
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
