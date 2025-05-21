// src/components/molecules/FooterTabs.tsx
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setActiveTab } from "../../services/tabsService";

interface TabDefinition {
  label: string;
  value: string;
}

interface FooterTabsProps {
  tabs: TabDefinition[];
  /** currently active tab */
  value: string;
  /** notify parent when user clicks a tab */
  onChange: (tab: string) => void;
}

const FooterTabs: React.FC<FooterTabsProps> = ({ tabs, value, onChange }) => {
  const navigate = useNavigate();

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue); // persist to backend
    onChange(newValue); // update App state
    navigate(`/${newValue}`); // change route
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
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default FooterTabs;
