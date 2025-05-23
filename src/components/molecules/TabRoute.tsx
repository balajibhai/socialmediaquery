import React from "react";
import { Message, TabConfig } from "../../types";
import DynamicComponent from "./DynamicComponent";

interface TabRouteProps {
  tab: TabConfig;
  question: string;
  setQuestion: (question: string) => void;
  messages: Message[];
  onSend: () => void;
}

const TabRoute: React.FC<TabRouteProps> = ({
  tab,
  question,
  setQuestion,
  messages,
  onSend,
}) => {
  // TODO: if tab.component or tab.component is going to decide what to render here
  // why do we need this component? tab.currentTab exists, then tab.component=DynamicComponent
  // will the above logic work?
  if (tab.component) {
    return (
      <tab.component
        question={question}
        setQuestion={setQuestion}
        messages={messages}
        onSend={onSend}
      />
    );
  } else if (tab.currentTab) {
    return <DynamicComponent currentTabNumber={tab.currentTab} />;
  }

  return <div>No Component Assigned</div>;
};

export default TabRoute;
