// src/components/atoms/TypographyAtom.tsx
import { Typography, TypographyProps } from "@mui/material";
import React from "react";

const TypographyAtom: React.FC<TypographyProps> = (props) => (
  <Typography {...props} />
);

export default TypographyAtom;
