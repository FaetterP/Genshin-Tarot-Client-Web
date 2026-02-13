import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { active: boolean; targets: string[] } = {
  active: false,
  targets: [],
};

const eulaEndTurnSlice = createSlice({
  name: "eulaEndTurn",
  initialState,
  reducers: {
    openEulaEndTurn(state) {
      state.active = true;
      state.targets = [];
    },
    addEulaEndTurnTarget(state, action: PayloadAction<{ enemyId: string }>) {
      state.targets.push(action.payload.enemyId);
    },
    removeLastEulaEndTurnTarget(state) {
      if (state.targets.length > 0) state.targets.pop();
    },
    clearEulaEndTurn(state) {
      state.active = false;
      state.targets = [];
    },
  },
});

export default eulaEndTurnSlice.reducer;
export const {
  openEulaEndTurn,
  addEulaEndTurnTarget,
  removeLastEulaEndTurnTarget,
  clearEulaEndTurn,
} = eulaEndTurnSlice.actions;
