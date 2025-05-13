import { configureStore } from "@reduxjs/toolkit";
import tabsReducer from "./tabsSlice";

export const store = configureStore({
  reducer: {
    tabs: tabsReducer,
    // other feature reducers…
  },
});

// Optional: export RootState & AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
