import React from "react";
import { TextField } from "@mui/material";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  onChange,
  style,
}) => {
  return (
    <TextField
      variant="outlined"
      placeholder={placeholder || "Search..."}
      value={value}
      onChange={onChange}
      style={style}
    />
  );
};

export default SearchInput;
