// src/App.tsx
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FooterTabs from "./components/molecules/FooterTabs";
import TabRoute from "./components/molecules/TabRoute";
import MainLayout from "./components/organisms/MainLayout"; // ← make sure this path is correct
import { AppContext } from "./context/AppContext";
import { RootState } from "./redux/store";

const App: React.FC = () => {
  const ctx = useContext(AppContext)!; // non-null because we wrap in provider
  const tabs = useSelector((s: RootState) => s.tabs.tabs);

  return (
    <BrowserRouter>
      <MainLayout>
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
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
