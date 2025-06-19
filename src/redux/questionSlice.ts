import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as questionService from "../services/questionService";

export interface QuestionState {
  question: string;
  loading: boolean;
  error: string | null;
}

const initialState: QuestionState = {
  question: "",
  loading: false,
  error: null,
};

export const sendQuestion = createAsyncThunk(
  "question/sendQuestion",
  async (question: string, thunkAPI) => {
    try {
      return await questionService.sendQuestion(question);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestion(state, action: PayloadAction<string>) {
      state.question = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendQuestion.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQuestion } = questionSlice.actions;
export default questionSlice.reducer;
