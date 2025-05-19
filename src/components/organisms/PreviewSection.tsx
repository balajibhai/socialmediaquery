// src/components/organisms/MainLayout.tsx
import { Box } from "@mui/material";
import DynamicComponent from "../molecules/DynamicComponent";
import PreviewPane from "../molecules/PreviewPane";

const PreviewSection = () => {
  return (
    <Box>
      {/* Right-side Preview drawer */}
      <PreviewPane open={true}>
        {/* put any preview content here */}
        <DynamicComponent currentTabNumber={1} header="Preview" />
      </PreviewPane>
    </Box>
  );
};

export default PreviewSection;
