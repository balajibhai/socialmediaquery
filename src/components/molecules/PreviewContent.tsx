import { useSelector } from "react-redux";
import { componentMap } from "../../constants";
import { RootState } from "../../redux/store";

const PreviewContent = () => {
  const tabsRedux = useSelector((s: RootState) => s.tabs);

  return (
    <div>
      <h3>Preview</h3>
      {tabsRedux.tabs[0].components.map((component) => {
        if (!component.data) return null;

        const Component = componentMap[component.type];
        if (!Component) return null;

        return <Component key={component.id} data={component.data} />;
      })}
    </div>
  );
};

export default PreviewContent;
