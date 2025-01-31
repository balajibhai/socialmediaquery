import React from "react";
import Dropdown from "../atoms/Dropdown";
import SearchInput from "../atoms/SearchInput";
import { Box, Button, SelectChangeEvent } from "@mui/material";

interface SearchBarProps {
  socialMedia: string;
  onSocialMediaChange: (event: SelectChangeEvent<string>) => void;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const socialMediaOptions = [
  { label: "LinkedIn", value: "linkedin" },
  { label: "Facebook", value: "facebook" },
  { label: "YouTube", value: "youtube" },
  { label: "Twitter", value: "twitter" },
];

const SearchBar: React.FC<SearchBarProps> = ({
  socialMedia,
  onSocialMediaChange,
  searchQuery,
  onSearchChange,
  onSearch,
}) => {
  return (
    <Box
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        marginBottom: "16px",
      }}
    >
      <Dropdown
        label="Social Media"
        value={socialMedia}
        onChange={onSocialMediaChange}
        options={socialMediaOptions}
        style={{ minWidth: "150px" }}
      />
      <SearchInput
        placeholder="Search Influencers..."
        value={searchQuery}
        onChange={onSearchChange}
        style={{ flex: 1 }}
      />
      <Button variant="contained" color="primary" onClick={onSearch}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
