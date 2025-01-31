// src/index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Make sure this matches your file name

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
