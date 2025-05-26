import React from "react";
import { TabConfig } from "../../types";
import DynamicComponent from "./DynamicComponent";

interface TabRouteProps {
  tab: TabConfig;
}

const TabRoute: React.FC<TabRouteProps> = ({ tab }) => {
  if (tab.currentTab) {
    return <DynamicComponent currentTab={tab.currentTab} />;
  }

  return <div>No Component Assigned</div>;
};

export default TabRoute;
