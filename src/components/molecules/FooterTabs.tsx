import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useState } from "react";

interface TabDefinition {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface FooterTabsProps {
  /** Array of tab definitions to display */
  tabs: TabDefinition[];
  /** Which tab is active by default */
  defaultTab?: string;
  /** Called whenever the user clicks a tab */
  onChange?: (tab: string) => void;
}

const FooterTabs: React.FC<FooterTabsProps> = ({
  tabs,
  defaultTab = tabs[0]?.value ?? "",
  onChange,
}) => {
  const [value, setValue] = useState<string>(defaultTab);

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
        {tabs.map((tab) => (
          <BottomNavigationAction
            key={tab.value}
            label={tab.label}
            value={tab.value}
            icon={tab.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default FooterTabs;
