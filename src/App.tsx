// src/App.tsx
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FooterTabs from "./components/molecules/FooterTabs";
import TabRoute from "./components/molecules/TabRoute";
import PreviewSection from "./components/organisms/PreviewSection";
import { AppContext } from "./context/AppContext";
import { RootState } from "./redux/store";

const App: React.FC = () => {
  const ctx = useContext(AppContext)!; // non-null because we wrap in provider
  const activeKey = useSelector((s: RootState) => s.tabs.activeTabKey);
  const tabsRedux = useSelector((s: RootState) => s.tabs);
  console.log("tabsRedux: ", tabsRedux);

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
      {activeKey === "tab1" && <PreviewSection />}

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
