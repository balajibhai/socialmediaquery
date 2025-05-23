import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { componentMap } from "../../constants";
import { AppDispatch, RootState } from "../../redux/store";
import { loadTabs } from "../../redux/tabsSlice";

type PreviewContentProps = {
  currentTabNumber: number;
  header?: string;
};

const DynamicComponent = (props: PreviewContentProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentTabNumber, header } = props;
  const { tabs } = useSelector((s: RootState) => s.tabs);
  const tabKey = `tab${currentTabNumber}`;
  const currentTab = tabs.find((t) => t.key === tabKey);

  useEffect(() => {
    dispatch(loadTabs());
  }, [dispatch]);

  if (!currentTab) {
    return <div>No tab found for "{tabKey}"</div>;
  }

  return (
    <div>
      <h3>{header}</h3>
      {currentTab.components.map((component) => {
        if (!component.data) return null;
        const componentType =
          component.type.toUpperCase() as keyof typeof componentMap;
        const Component = componentMap[componentType];
        if (!Component) return null;
        return <Component key={component.id} data={component.data} />;
      })}
    </div>
  );
};

export default DynamicComponent;
