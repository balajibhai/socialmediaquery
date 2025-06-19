import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { loadTabs } from "../../redux/tabsSlice";
import DynamicComponent from "./DynamicComponent";

type TabComponentProps = {
  currentTab?: number | string;
  header?: string;
};

const TabComponent = (props: TabComponentProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentTab, header } = props;
  const { tabs } = useSelector((s: RootState) => s.tabs);
  let tabKey = "";
  if (currentTab === "preview") {
    tabKey = currentTab;
  } else {
    tabKey = `tab${currentTab}`;
  }
  const resTab = tabs.find((t) => t.key === tabKey);

  useEffect(() => {
    dispatch(loadTabs());
  }, [dispatch]);

  if (!currentTab) {
    return <div>No Component Assigned</div>;
  } else if (!resTab) {
    return <div>No tab found for "{tabKey}"</div>;
  }

  return (
    <div>
      <h3>{header}</h3>
      <DynamicComponent resTab={resTab} />
    </div>
  );
};

export default TabComponent;
