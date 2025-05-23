// src/components/atoms/IconButtonAtom.tsx
import { IconButton, IconButtonProps } from "@mui/material";
import React from "react";

export type IconButtonAtomProps = IconButtonProps & {
  onClick: () => void;
};

const IconButtonAtom: React.FC<IconButtonAtomProps> = ({
  onClick,
  children,
  ...rest
}) => (
  <IconButton onClick={onClick} {...rest}>
    {children}
  </IconButton>
);

export default IconButtonAtom;
