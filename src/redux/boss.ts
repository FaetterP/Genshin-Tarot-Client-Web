import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BossPrimitive, CardPrimitive } from "../types/general";
import { EElement } from "../types/enums";

const initialState: {
  boss: BossPrimitive | null;
  dragonBreathTask: { taskId: string; bossId: string } | null;
  bossPassiveTask: { taskId: string; hand: CardPrimitive[] } | null;
} = {
  boss: null,
  dragonBreathTask: null,
  bossPassiveTask: null,
};

const bossSlice = createSlice({
  name: "boss",
  initialState,
  reducers: {
    setBoss(state, action: PayloadAction<BossPrimitive | null>) {
      state.boss = action.payload;
    },

    applyBossHpDelta(state, action: PayloadAction<{ delta: number }>) {
      if (state.boss) {
        state.boss.hp = Math.max(0, state.boss.hp + action.payload.delta);
      }
    },

    applyBossShieldDelta(state, action: PayloadAction<{ delta: number }>) {
      if (state.boss) {
        state.boss.shield = Math.max(0, state.boss.shield + action.payload.delta);
      }
    },

    resetBossStats(
      state,
      action: PayloadAction<{ hp: number; shield: number; livesRemaining: number }>,
    ) {
      if (state.boss) {
        state.boss.hp = action.payload.hp;
        state.boss.shield = action.payload.shield;
        state.boss.lives = action.payload.livesRemaining;
      }
    },

    addElementToBoss(state, action: PayloadAction<{ element: EElement }>) {
      if (state.boss && !state.boss.elements.includes(action.payload.element)) {
        state.boss.elements.push(action.payload.element);
      }
    },

    clearBossElements(state) {
      if (state.boss) {
        state.boss.elements = [];
      }
    },

    setDragonBreathTask(
      state,
      action: PayloadAction<{ taskId: string; bossId: string } | null>,
    ) {
      state.dragonBreathTask = action.payload;
    },

    setBossPassiveTask(
      state,
      action: PayloadAction<{ taskId: string; hand: CardPrimitive[] } | null>,
    ) {
      state.bossPassiveTask = action.payload;
    },
  },
});

export default bossSlice.reducer;
export const {
  setBoss,
  applyBossHpDelta,
  applyBossShieldDelta,
  resetBossStats,
  addElementToBoss,
  clearBossElements,
  setDragonBreathTask,
  setBossPassiveTask,
} = bossSlice.actions;
