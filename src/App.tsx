// src/App.tsx
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FooterTabs from "./components/molecules/FooterTabs";
import TabComponent from "./components/molecules/TabComponent";
import PreviewSection from "./components/organisms/PreviewSection";
import HomePage from "./components/pages/HomePage";
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
        <Route path="/preview" element={<HomePage />} />
        {ctx.allTabs.map((tab) => (
          <Route
            key={tab.value}
            path={`/${tab.value}`}
            element={<TabComponent currentTab={tab.currentTab} />}
          />
        ))}
        <Route
          path="/"
          element={<div>Please select preview tab from the footer.</div>}
        />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
      {activeTabKey === "preview" && <PreviewSection />}
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
