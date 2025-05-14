// src/components/organisms/MainLayout.tsx
import { Box } from "@mui/material";
import React from "react";
import PreviewContent from "../molecules/PreviewContent";
import PreviewPane from "../molecules/PreviewPane";

interface MainLayoutProps {
  children: React.ReactNode;
}

const PreviewSection = () => {
  return (
    <Box>
      {/* Right-side Preview drawer */}
      <PreviewPane open={true}>
        {/* put any preview content here */}
        <PreviewContent />
      </PreviewPane>
    </Box>
  );
};

export default PreviewSection;
