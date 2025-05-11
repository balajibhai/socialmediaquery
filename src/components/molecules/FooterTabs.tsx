// src/components/FooterTabs.tsx
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";

interface FooterTabsProps {
  /** Number of tabs to display */
  numberOfTabs: number;
  /** Which tab is active by default */
  defaultTab?: string;
  /** Called whenever the user clicks a tab */
  onChange?: (tab: string) => void;
}

const FooterTabs: React.FC<FooterTabsProps> = ({
  numberOfTabs,
  defaultTab = "tab1",
  onChange,
}) => {
  const [value, setValue] = useState<string>(defaultTab);
  const [totalTabs, setTotalTabs] = useState<number>(0);

  useEffect(() => {
    if (numberOfTabs > 0) {
      setTotalTabs((prev) => prev + numberOfTabs);
    }
  }, [numberOfTabs]);

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        {Array.from({ length: totalTabs }, (_, i) => (
          <BottomNavigationAction
            key={`tab${i + 1}`}
            label={`Tab${i + 1}`}
            value={`tab${i + 1}`}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default FooterTabs;
