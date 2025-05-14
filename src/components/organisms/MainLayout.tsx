// src/components/organisms/MainLayout.tsx
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import React, { useState } from "react";
import IconButtonAtom from "../atoms/IconButtonAtom";
import PreviewContent from "../molecules/PreviewContent";
import PreviewPane from "../molecules/PreviewPane";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const togglePreview = () => setPreviewOpen((prev) => !prev);

  return (
    <Box>
      {/* Hamburger fixed in top-left */}
      <IconButtonAtom
        onClick={togglePreview}
        sx={{ position: "fixed", top: 16, left: 16, zIndex: 1300 }}
      >
        <MenuIcon />
      </IconButtonAtom>

      {/* Your main app content */}
      <Box mt={8} p={2}>
        {children}
      </Box>

      {/* Right-side Preview drawer */}
      <PreviewPane open={isPreviewOpen} onClose={() => setPreviewOpen(false)}>
        {/* put any preview content here */}
        <PreviewContent />
      </PreviewPane>
    </Box>
  );
};

export default MainLayout;
