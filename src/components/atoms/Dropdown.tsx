// src/components/atoms/Dropdown.tsx
import React from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";

interface DropdownProps {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  options: { label: string; value: string }[];
  style?: React.CSSProperties;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
  style,
}) => {
  return (
    <FormControl variant="outlined" style={style}>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        value={value}
        onChange={onChange}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
