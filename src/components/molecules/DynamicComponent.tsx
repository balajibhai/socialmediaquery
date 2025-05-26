import { componentMap } from "../../constants";
import { Tab } from "../../services/tabsService";

type DynamicComponentProps = {
  resTab: Tab;
};

const DynamicComponent = (props: DynamicComponentProps) => {
  const { resTab } = props;
  return (
    <>
      {resTab.components.map((component) => {
        if (!component.data) return null;
        const componentType =
          component.type.toUpperCase() as keyof typeof componentMap;
        const Component = componentMap[componentType];
        if (!Component) return null;
        return <Component key={component.id} data={component.data} />;
      })}
    </>
  );
};

export default DynamicComponent;
