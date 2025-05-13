// src/store/tabsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define your entry type
interface Entry {
  graph: { date: string; distance: number };
  table: { date: string; distance: number };
  text: { date: string; distance: number };
}

// Each tab has a key and an array of entries
interface Tab {
  key: string;
  entries: Entry[];
}

interface TabsState {
  tabs: Tab[];
  activeTabKey: string | null;
}

const initialState: TabsState = {
  tabs: [
    {
      key: "tab1",
      entries: [
        {
          graph: { date: "12/03/2021", distance: 3 },
          table: { date: "12/03/2021", distance: 3 },
          text: { date: "12/03/2021", distance: 3 },
        },
      ],
    },
  ],
  activeTabKey: "tab1",
};

const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    addTab(state, action: PayloadAction<{ key: string }>) {
      state.tabs.push({ key: action.payload.key, entries: [] });
    },
    removeTab(state, action: PayloadAction<{ key: string }>) {
      state.tabs = state.tabs.filter((t) => t.key !== action.payload.key);
      if (state.activeTabKey === action.payload.key) {
        state.activeTabKey = state.tabs[0]?.key || null;
      }
    },
    selectTab(state, action: PayloadAction<{ key: string }>) {
      state.activeTabKey = action.payload.key;
    },
    addEntry(state, action: PayloadAction<{ key: string; entry: Entry }>) {
      const tab = state.tabs.find((t) => t.key === action.payload.key);
      tab?.entries.push(action.payload.entry);
    },
    updateEntry(
      state,
      action: PayloadAction<{
        key: string;
        index: number;
        entry: Partial<Entry>;
      }>
    ) {
      const tab = state.tabs.find((t) => t.key === action.payload.key);
      if (tab && tab.entries[action.payload.index]) {
        tab.entries[action.payload.index] = {
          ...tab.entries[action.payload.index],
          ...action.payload.entry,
        };
      }
    },
  },
});

export const { addTab, removeTab, selectTab, addEntry, updateEntry } =
  tabsSlice.actions;
export default tabsSlice.reducer;
