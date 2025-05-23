// src/App.tsx
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FooterTabs from "./components/molecules/FooterTabs";
import TabRoute from "./components/molecules/TabRoute";
import PreviewSection from "./components/organisms/PreviewSection";
import { AppContext } from "./context/AppContext";
import { RootState } from "./redux/store";

const AppContent: React.FC = () => {
  const ctx = useContext(AppContext)!;
  const activeTabKey = useSelector(
    (state: RootState) => state.tabs.activeTabKey
  );

  return (
    <>
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
          element={<div>Please select preview tab from the footer.</div>}
        />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
      {activeTabKey === "tab1" && <PreviewSection />}
      <div style={{ paddingBottom: 56 }}>
        <FooterTabs
          tabs={ctx.allTabs}
          value={activeTabKey} // pass current tab here
        />
      </div>
    </>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
