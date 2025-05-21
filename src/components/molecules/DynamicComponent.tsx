import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { componentMap } from "../../constants";
import { RootState } from "../../redux/store";
import { Tab } from "../../redux/tabsSlice";
import { fetchState } from "../../services/tabsService";

type PreviewContentProps = {
  currentTabNumber: number;
  header?: string;
};

const DynamicComponent = (props: PreviewContentProps) => {
  const isDataSent = useSelector((s: RootState) => s.toggle);
  const { currentTabNumber, header } = props;
  const [tabs, setTabs] = useState<Tab[]>([]);
  useEffect(() => {
    fetchState().then((data) => {
      setTabs([...data.tabs]);
    });
  }, [isDataSent.value]);
  const tabKey = `tab${currentTabNumber}`;
  const currentTab = tabs.find((t) => t.key === tabKey);

  if (!currentTab) {
    return <div>No tab found for "{tabKey}"</div>;
  }

  return (
    <div>
      <h3>{header}</h3>
      {currentTab.components.map((component) => {
        if (!component.data) return null;
        const Component = componentMap[component.type];
        if (!Component) return null;
        return <Component key={component.id} data={component.data} />;
      })}
    </div>
  );
};

export default DynamicComponent;
