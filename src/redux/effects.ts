import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CardPrimitive,
  EnemyPrimitive,
  ReportEffect,
} from "../../types/general";
import { send } from "../ws";

const initialState: {
  createWave: { isShown: boolean; enemies: EnemyPrimitive[]; player: string };
  clearHand: { isShown: boolean; player: string };
  drawCards: { isShown: boolean; cards: CardPrimitive[]; player: string };
  resetStats: { isShown: boolean; player: string };
  useEffect: { isShown: boolean; name: string; player: string };
  useLeyline: { isShown: boolean; name: string };
  enemyAttack: {
    isShown: boolean;
    damage: number;
    player: string;
    enemy: string;
  };
  reports: ReportEffect[];
  counter: number;
  taskId: string | undefined;
} = {
  createWave: { isShown: false, enemies: [], player: "" },
  drawCards: { isShown: false, cards: [], player: "" },
  clearHand: { isShown: false, player: "" },
  resetStats: { isShown: false, player: "" },
  useEffect: { isShown: false, name: "", player: "" },
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
    state.createWave.player = action.player;
  },
  drawCards: (state, action: any) => {
    state.drawCards.isShown = true;
    state.drawCards.cards = action.cards;
    state.drawCards.player = action.player;
  },
  resetStats: (state, action: any) => {
    state.resetStats.isShown = true;
    state.resetStats.player = action.player;
  },
  useEffect: (state, action: any) => {
    state.useEffect.isShown = true;
    state.useEffect.name = action.name;
    state.useEffect.player = action.player;
  },
  useLeyline: (state, action: any) => {
    state.useLeyline.isShown = true;
    state.useLeyline.name = action.name;
  },
  clearHand: (state, action: any) => {
    state.clearHand.isShown = true;
    state.clearHand.player = action.player;
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
    state.createWave.player = "";
  },
  drawCards: (state, action: any) => {
    state.drawCards.isShown = false;
    state.drawCards.cards = [];
    state.drawCards.player = "";
  },
  resetStats: (state, action: any) => {
    state.resetStats.isShown = false;
    state.resetStats.player = "";
  },
  useEffect: (state, action: any) => {
    state.useEffect.isShown = false;
    state.useEffect.name = "";
    state.useEffect.player = "";
  },
  useLeyline: (state, action: any) => {
    state.useLeyline.isShown = false;
    state.useLeyline.name = "";
  },
  clearHand: (state, action: any) => {
    state.clearHand.isShown = false;
    state.clearHand.player = "";
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
      state.reports = action.payload.reports;

      const effect = state.reports[0];
      startMapper[effect.type](state, effect);
      state.taskId = action.payload.taskId;
    },

    finishEffect(state, action: PayloadAction) {
      state.counter += 1;

      console.log(
        `finish ${state.reports[0].type} ${(state.reports[0] as any).player}`
      );

      const effect = state.reports[0];
      finishMapper[effect.type](state, effect);
      state.reports.shift();

      if (state.reports.length > 0) {
        const effect = state.reports[0];
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
