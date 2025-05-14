// src/components/molecules/PreviewPane.tsx
import { Box, Drawer } from "@mui/material";
import React from "react";
import PaneHeader from "./PaneHeader";

interface PreviewPaneProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const PreviewPane: React.FC<PreviewPaneProps> = ({
  open,
  onClose,
  children,
}) => (
  <Drawer anchor="right" open={open} onClose={onClose}>
    <Box width={500} role="presentation">
      <PaneHeader title="Preview" onClose={onClose} />
      <Box p={2}>{children}</Box>
    </Box>
  </Drawer>
);

export default PreviewPane;
