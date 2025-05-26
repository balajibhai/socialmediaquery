// src/store/tabsSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import * as tabsService from "../services/tabsService";

export type ComponentType = tabsService.ComponentType;

export interface Component {
  id: string;
  type: ComponentType;
  data: tabsService.DataPoint[];
}

export interface Tab {
  key: string;
  components: Component[];
}

export interface TabsState {
  tabs: Tab[];
  activeTabKey: string;
  loading: boolean;
  error: string | null;
}

const initialState: TabsState = {
  tabs: [{ key: "preview", components: [] }],
  activeTabKey: "preview",
  loading: false,
  error: null,
};

// ----- THUNKS -----

export const loadTabs = createAsyncThunk(
  "tabs/loadAll",
  async (_, thunkAPI) => {
    try {
      return await tabsService.fetchState();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const createComponent = createAsyncThunk(
  "tabs/addComponent",
  async (
    payload: {
      key: string;
      type: ComponentType;
      data: tabsService.DataPoint[];
    },
    thunkAPI
  ) => {
    try {
      return await tabsService.addComponent(
        payload.key,
        payload.type,
        payload.data
      );
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const modifyComponent = createAsyncThunk(
  "tabs/updateComponent",
  async (
    payload: { id: string; key: string; data: tabsService.DataPoint[] },
    thunkAPI
  ) => {
    try {
      return await tabsService.updateComponent(
        payload.id,
        payload.key,
        payload.data
      );
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const clearTabComponents = createAsyncThunk(
  "tabs/clearComponents",
  async (key: string, thunkAPI) => {
    try {
      await tabsService.clearComponents(key);
      return key;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const mergeHomeComponents = createAsyncThunk(
  "tabs/mergeHome",
  async (key: string, thunkAPI) => {
    try {
      return await tabsService.mergeHome(key);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const changeActiveTab = createAsyncThunk(
  "tabs/setActive",
  async (key: string, thunkAPI) => {
    try {
      await tabsService.setActiveTab(key);
      return key;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ----- SLICE -----

const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    selectTabLocal(state, action: PayloadAction<{ key: string }>) {
      state.activeTabKey = action.payload.key;
    },
    homeTabComponentLocal(
      state,
      action: PayloadAction<{
        key: string;
        type: ComponentType;
        data: tabsService.DataPoint[];
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
  },
  extraReducers: (builder) => {
    builder
      // LOAD ALL
      .addCase(loadTabs.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loadTabs.fulfilled, (s, { payload }) => {
        s.loading = false;
        s.tabs = payload.tabs;
        s.activeTabKey = payload.activeTabKey;
      })
      .addCase(loadTabs.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload as string;
      })

      // CREATE COMPONENT
      .addCase(createComponent.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(createComponent.fulfilled, (s, { payload }) => {
        s.loading = false;
        // replace that tab in state
        const idx = s.tabs.findIndex((t) => t.key === payload.key);
        if (idx >= 0) s.tabs[idx] = payload;
        else s.tabs.push(payload);
      })
      .addCase(createComponent.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload as string;
      })

      // UPDATE COMPONENT
      .addCase(modifyComponent.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(modifyComponent.fulfilled, (s, { payload }) => {
        s.loading = false;
        const idx = s.tabs.findIndex((t) => t.key === payload.key);
        if (idx >= 0) s.tabs[idx] = payload;
      })
      .addCase(modifyComponent.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload as string;
      })

      // CLEAR COMPONENTS
      .addCase(clearTabComponents.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(clearTabComponents.fulfilled, (s, { payload: key }) => {
        s.loading = false;
        const tab = s.tabs.find((t) => t.key === key);
        if (tab) tab.components = [];
      })
      .addCase(clearTabComponents.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload as string;
      })

      // MERGE HOME
      .addCase(mergeHomeComponents.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(mergeHomeComponents.fulfilled, (s, { payload }) => {
        s.loading = false;
        const idx = s.tabs.findIndex((t) => t.key === payload.key);
        if (idx >= 0) s.tabs[idx] = payload;
        else s.tabs.push(payload);
        // clear home
        const home = s.tabs[0];
        if (home) home.components = [];
      })
      .addCase(mergeHomeComponents.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload as string;
      })

      // SET ACTIVE TAB
      .addCase(changeActiveTab.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(changeActiveTab.fulfilled, (s, { payload: key }) => {
        s.loading = false;
        s.activeTabKey = key;
      })
      .addCase(changeActiveTab.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload as string;
      });
  },
});

export const { selectTabLocal, homeTabComponentLocal } = tabsSlice.actions;
export default tabsSlice.reducer;
