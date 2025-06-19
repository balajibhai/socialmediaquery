// src/components/molecules/FooterTabs.tsx
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { changeActiveTab } from "../../redux/tabsSlice";
import { TabConfig } from "../../types";

type FooterTabsProps = {
  tabs: TabConfig[];
  /** currently active tab */
  value: string;
  /** notify parent when user clicks a tab */
};

const FooterTabs: React.FC<FooterTabsProps> = (props: FooterTabsProps) => {
  const { tabs, value } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    dispatch(changeActiveTab(newValue)); // persist to backend
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
