import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AnemoReactionTask = {
  taskId: string;
  enemyId: string;
};

const initialState: {
  task: AnemoReactionTask | null;
} = {
  task: null,
};

const anemoReactionSlice = createSlice({
  name: "anemoReaction",
  initialState,
  reducers: {
    setAnemoReactionTask(state, action: PayloadAction<AnemoReactionTask | null>) {
      state.task = action.payload;
    },
  },
});

export default anemoReactionSlice.reducer;
export const { setAnemoReactionTask } = anemoReactionSlice.actions;
