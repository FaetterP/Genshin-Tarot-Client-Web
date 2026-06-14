import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RagingTideTask = {
  taskId: string;
};

const initialState: {
  task: RagingTideTask | null;
} = {
  task: null,
};

const ragingTideSlice = createSlice({
  name: "ragingTide",
  initialState,
  reducers: {
    setRagingTideTask(state, action: PayloadAction<RagingTideTask | null>) {
      state.task = action.payload;
    },
  },
});

export default ragingTideSlice.reducer;
export const { setRagingTideTask } = ragingTideSlice.actions;
