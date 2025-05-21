import { configureStore } from "@reduxjs/toolkit";
import tabsReducer from "./tabsSlice";
import toggleReducer from "./toggleSlice";

export const store = configureStore({
  reducer: {
    tabs: tabsReducer,
    toggle: toggleReducer,
  },
});

// Optional: export RootState & AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
