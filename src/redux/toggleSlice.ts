// src/features/toggle/toggleSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ToggleState {
  value: boolean;
}

const initialState: ToggleState = {
  value: false,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    // flips the boolean
    toggle(state) {
      state.value = !state.value;
    },
    // optional: set it explicitly
    setToggle(state, action: PayloadAction<boolean>) {
      state.value = action.payload;
    },
  },
});

export const { toggle, setToggle } = toggleSlice.actions;
export const selectToggle = (state: RootState) => state.toggle.value;
export default toggleSlice.reducer;
