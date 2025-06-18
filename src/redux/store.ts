import { configureStore } from "@reduxjs/toolkit";
import tabsReducer from "./tabsSlice";
import questionReducer from "./questionSlice";

export const store = configureStore({
  reducer: {
    tabs: tabsReducer,
    question: questionReducer,
  },
});

// Optional: export RootState & AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
