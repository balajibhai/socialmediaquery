import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FooterTabs from "./components/molecules/FooterTabs";
import TabRoute from "./components/molecules/TabRoute";
import { AppContext } from "./context/AppContext";

const App: React.FC = () => {
  const ctx = useContext(AppContext)!; // non-null because we wrap in provider

  return (
    <BrowserRouter>
      <Routes>
        {ctx.allTabs.map((tab) => (
          <Route
            key={tab.value}
            path={`/${tab.value}`}
            element={
              <TabRoute
                tab={tab}
                question={ctx.question}
                setQuestion={ctx.setQuestion}
                messages={ctx.messages}
                onSend={ctx.onSend}
              />
            }
          />
        ))}
        <Route
          path="/"
          element={<div>Please select a tab from the footer.</div>}
        />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>

      <div style={{ paddingBottom: 56 }}>
        <FooterTabs
          defaultTab="tab1"
          onChange={(t) => null}
          tabs={ctx.allTabs}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
