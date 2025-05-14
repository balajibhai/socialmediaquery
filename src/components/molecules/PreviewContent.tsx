import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const PreviewContent = () => {
  const tabs = useSelector((s: RootState) => s.tabs);
  return <div>Here’s the preview content!</div>;
};

export default PreviewContent;
