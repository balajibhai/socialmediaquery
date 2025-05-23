// src/components/organisms/MainLayout.tsx
import { Box } from "@mui/material";
import DynamicComponent from "../molecules/DynamicComponent";

const PreviewSection = () => {
  return (
    <Box>
      {/* Right-side Preview drawer */}
      <Box
        sx={{
          position: "fixed",
          right: 0,
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
        <Box p={2}>
          <DynamicComponent currentTabNumber={1} header="Preview" />
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewSection;
