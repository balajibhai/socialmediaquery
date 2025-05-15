// src/store/tabsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

// Each component type
export type ComponentType = "graph" | "table" | "text";

// Payload for a single data point
export interface DataPoint {
  date: string;
  distance: number;
}

// A component holds an array of data points
export interface Component {
  id: string;
  type: ComponentType;
  data: DataPoint[];
}

export interface Tab {
  key: string;
  components: Component[];
}

export interface TabsState {
  tabs: Tab[];
  activeTabKey: string | null;
}

const initialState: TabsState = {
  tabs: [
    {
      key: "tab1",
      components: [],
    },
  ],
  activeTabKey: "tab1",
};

const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    selectTab(state, action: PayloadAction<{ key: string }>) {
      state.activeTabKey = action.payload.key;
    },

    addComponent(
      state,
      action: PayloadAction<{
        key: string;
        type: ComponentType;
        data: DataPoint[];
      }>
    ) {
      const tab = state.tabs.find((t) => t.key === action.payload.key);
      if (!tab) return;
      tab.components.push({
        id: nanoid(),
        type: action.payload.type,
        data: action.payload.data,
      });
    },

    updateComponent(
      state,
      action: PayloadAction<{
        key: string;
        id: string;
        data: DataPoint[];
      }>
    ) {
      const tab = state.tabs.find((t) => t.key === action.payload.key);
      const comp = tab?.components.find((c) => c.id === action.payload.id);
      if (comp) {
        comp.data = action.payload.data;
      }
    },

    removeComponent(state, action: PayloadAction<{ key: string }>) {
      const tab = state.tabs.find((t) => t.key === action.payload.key);
      if (!tab) return;
      tab.components = [];
    },
  },
});

export const { selectTab, addComponent, updateComponent, removeComponent } =
  tabsSlice.actions;

export default tabsSlice.reducer;
