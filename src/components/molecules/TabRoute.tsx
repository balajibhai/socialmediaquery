import React from "react";
import { Message, TabConfig } from "../../types";

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
  if (tab.component) {
    return (
      <tab.component
        question={question}
        setQuestion={setQuestion}
        messages={messages}
        onSend={onSend}
      />
    );
  }

  return <div>No Component Assigned</div>;
};

export default TabRoute;
