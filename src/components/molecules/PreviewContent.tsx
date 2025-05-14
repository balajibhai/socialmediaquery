import { useSelector } from "react-redux";
import { componentMap } from "../../constants";
import { RootState } from "../../redux/store";
import { Tab } from "../../redux/tabsSlice";

const PreviewContent = () => {
  const tabsRedux = useSelector((s: RootState) => s.tabs);

  return (
    <div>
      {tabsRedux.tabs.map((tab: Tab) => (
        <div key={tab.key}>
          {tab.components.map((component) => {
            if (!component.data) return null;

            const Component = componentMap[component.type];
            if (!Component) return null;

            return <Component key={component.id} data={component.data} />;
          })}
        </div>
      ))}
    </div>
  );
};

export default PreviewContent;
