import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CardPrimitive,
  EnemyPrimitive,
  ReportEffect,
} from "../../types/general";
import { send } from "../ws";

const initialState: {
  createWave: { isShown: boolean; enemies: EnemyPrimitive[] };
  clearHand: { isShown: boolean };
  drawCards: { isShown: boolean; cards: CardPrimitive[] };
  resetStats: { isShown: boolean };
  useEffect: { isShown: boolean; name: string };
  useLeyline: { isShown: boolean; name: string };
  enemyAttack: {
    isShown: boolean;
    damage: number;
    player: string;
    enemy: string;
  };
  reports: { effect: ReportEffect; status: number }[];
  counter: number;
  taskId: string | undefined;
} = {
  createWave: { isShown: false, enemies: [] },
  drawCards: { isShown: false, cards: [] },
  clearHand: { isShown: false },
  resetStats: { isShown: false },
  useEffect: { isShown: false, name: "" },
  useLeyline: { isShown: false, name: "" },
  enemyAttack: {
    isShown: false,
    damage: 0,
    player: "",
    enemy: "",
  },
  reports: [],
  counter: 0,
  taskId: undefined,
};

const startMapper: Record<
  string,
  (state: typeof initialState, data: ReportEffect) => void
> = {
  createWave: (state, action: any) => {
    state.createWave.isShown = true;
    state.createWave.enemies = action.enemies;
  },
  drawCards: (state, action: any) => {
    state.drawCards.isShown = true;
    state.drawCards.cards = action.cards;
  },
  resetStats: (state, action: any) => {
    state.resetStats.isShown = true;
  },
  useEffect: (state, action: any) => {
    state.useEffect.isShown = true;
    state.useEffect.name = action.name;
  },
  useLeyline: (state, action: any) => {
    state.useLeyline.isShown = true;
    state.useLeyline.name = action.name;
  },
  clearHand: (state, action: any) => {
    state.clearHand.isShown = true;
  },
  enemyAttack: (state, action: any) => {
    state.enemyAttack.isShown = true;
    state.enemyAttack.damage = action.damage;
    state.enemyAttack.enemy = action.enemy;
    state.enemyAttack.player = action.player;
  },
};

const finishMapper: Record<
  string,
  (state: typeof initialState, data: ReportEffect) => void
> = {
  createWave: (state, action: any) => {
    state.createWave.isShown = false;
    state.createWave.enemies = [];
  },
  drawCards: (state, action: any) => {
    state.drawCards.isShown = false;
    state.drawCards.cards = [];
  },
  resetStats: (state, action: any) => {
    state.resetStats.isShown = false;
  },
  useEffect: (state, action: any) => {
    state.useEffect.isShown = false;
    state.useEffect.name = "";
  },
  useLeyline: (state, action: any) => {
    state.useLeyline.isShown = false;
    state.useLeyline.name = "";
  },
  clearHand: (state, action: any) => {
    state.clearHand.isShown = false;
  },
  enemyAttack: (state, action: any) => {
    state.enemyAttack.isShown = false;
    state.enemyAttack.damage = 0;
    state.enemyAttack.enemy = "";
    state.enemyAttack.player = "";
  },
};

const effectsSlice = createSlice({
  name: "effects",
  initialState,
  reducers: {
    showEffects(
      state,
      action: PayloadAction<{ reports: ReportEffect[]; taskId?: string }>
    ) {
      state.reports = action.payload.reports.map((report) => ({
        effect: report,
        status: 0,
      }));

      const effect = state.reports[0].effect;
      startMapper[effect.type](state, effect);
      state.taskId = action.payload.taskId;
    },

    finishEffect(state, action: PayloadAction) {
      state.counter += 1;

console.log("finish "+state.reports[0].effect.type)

      const effect = state.reports[0].effect;
      finishMapper[effect.type](state, effect);
      state.reports.shift();

      if (state.reports.length > 0) {
        const effect = state.reports[0].effect;
        startMapper[effect.type](state, effect);
      } else if (state.taskId) {
        send({
          action: "task.completeTask",
          taskId: state.taskId,
        });
      }
    },
  },
});

export default effectsSlice.reducer;
export const { showEffects, finishEffect } = effectsSlice.actions;
