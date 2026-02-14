import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ECharacter } from "../types/enums";

export type BurstDivideItem = { playerId: string; count: number };

const initialState: {
  character: ECharacter | null;
  enemies: string[];
  selectedPlayer: string;
  selectedEnemy: string;
  divide: BurstDivideItem[];
  selectedCharacter: ECharacter | "";
} = {
  character: null,
  enemies: [],
  selectedPlayer: "",
  selectedEnemy: "",
  divide: [],
  selectedCharacter: "",
};

const burstSlice = createSlice({
  name: "burst",
  initialState,
  reducers: {
    selectBurstCharacter(state, action: PayloadAction<{ character: ECharacter }>) {
      state.character = action.payload.character;
      state.enemies = [];
      state.selectedPlayer = "";
      state.selectedEnemy = "";
      state.divide = [];
      state.selectedCharacter = "";
    },
    toggleBurstEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      const id = action.payload.enemyId;
      const idx = state.enemies.indexOf(id);
      if (idx >= 0) state.enemies.splice(idx, 1);
      else state.enemies.push(id);
    },
    setBurstSelectedEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.selectedEnemy = action.payload.enemyId;
    },
    setBurstSelectedPlayer(state, action: PayloadAction<{ playerId: string }>) {
      state.selectedPlayer = action.payload.playerId;
    },
    setBurstDivide(state, action: PayloadAction<{ divide: BurstDivideItem[] }>) {
      state.divide = action.payload.divide;
    },
    setBurstSelectedCharacter(state, action: PayloadAction<{ character: ECharacter | "" }>) {
      state.selectedCharacter = action.payload.character;
    },
    clearBurstSelection(state) {
      state.character = null;
      state.enemies = [];
      state.selectedPlayer = "";
      state.selectedEnemy = "";
      state.divide = [];
      state.selectedCharacter = "";
    },
  },
});

export default burstSlice.reducer;
export const {
  selectBurstCharacter,
  toggleBurstEnemy,
  setBurstSelectedEnemy,
  setBurstSelectedPlayer,
  setBurstDivide,
  setBurstSelectedCharacter,
  clearBurstSelection,
} = burstSlice.actions;
