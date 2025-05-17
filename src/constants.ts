import TextComponent from "./components/atoms/TextComponent";
import GraphComponent from "./components/molecules/GraphComponent";
import TableComponent from "./components/molecules/TableComponent";

export const componentMap = {
  table: TableComponent,
  graph: GraphComponent,
  text: TextComponent,
};

export const MessageComponent = {
  TABLE: "table",
  TEXT: "text",
  GRAPH: "graph",
  TAB: "tab",
  SET: "set",
};
