import TextComponent from "./components/atoms/TextComponent";
import GraphComponent from "./components/molecules/GraphComponent";
import TableComponent from "./components/molecules/TableComponent";

export const componentMap = {
  TABLE: TableComponent,
  GRAPH: GraphComponent,
  TEXT: TextComponent,
};

export const MessageComponent = {
  TAB: "tab",
  SET: "set",
};
