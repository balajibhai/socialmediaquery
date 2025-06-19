// src/components/molecules/PaneHeader.tsx
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import React from "react";
import IconButtonAtom from "../atoms/IconButtonAtom";
import TypographyAtom from "../atoms/TypographyAtom";

interface PaneHeaderProps {
  title: string;
  onClose: () => void;
}

const PaneHeader: React.FC<PaneHeaderProps> = ({ title, onClose }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
    <TypographyAtom variant="h6">{title}</TypographyAtom>
    <IconButtonAtom onClick={onClose}>
      <CloseIcon />
    </IconButtonAtom>
  </Box>
);

export default PaneHeader;
