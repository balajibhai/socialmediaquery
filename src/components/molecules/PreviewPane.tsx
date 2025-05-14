// src/components/molecules/PreviewPane.tsx
import { Box } from "@mui/material";
import React from "react";

interface PreviewPaneProps {
  open: boolean;
  children?: React.ReactNode;
}

const PreviewPane: React.FC<PreviewPaneProps> = ({ open, children }) => (
  <Box
    sx={{
      position: "fixed",
      right: open ? 0 : "-500px",
      top: 0,
      height: "93%",
      width: 400,
      bgcolor: "background.paper",
      boxShadow: "-2px 0 8px rgba(0,0,0,0.15)",
      transition: "right 0.3s ease-in-out",
      zIndex: 1200,
      overflow: "auto",
    }}
    role="presentation"
  >
    <Box p={2}>{children}</Box>
  </Box>
);

export default PreviewPane;
