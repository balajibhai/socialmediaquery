// src/App.tsx
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import FooterTabs from "./components/molecules/FooterTabs";
import TabRoute from "./components/molecules/TabRoute";
import PreviewSection from "./components/organisms/PreviewSection";
import { AppContext } from "./context/AppContext";
import { fetchState } from "./services/tabsService";

const AppContent: React.FC = () => {
  const ctx = useContext(AppContext)!;
  const [activeTabKey, setActiveTabKey] = useState<string>("tab1");
  const navigate = useNavigate();

  // on mount, pull initial tab from backend
  useEffect(() => {
    fetchState().then((state) => {
      setActiveTabKey(state.activeTabKey);
      navigate(`/${state.activeTabKey}`, { replace: true });
    });
  }, [navigate]);

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
          element={<div>Please select a tab from the footer.</div>}
        />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>

      {activeTabKey === "tab1" && <PreviewSection />}

      <div style={{ paddingBottom: 56 }}>
        <FooterTabs
          tabs={ctx.allTabs}
          value={activeTabKey} // pass current tab here
          onChange={(newKey) => setActiveTabKey(newKey)}
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
