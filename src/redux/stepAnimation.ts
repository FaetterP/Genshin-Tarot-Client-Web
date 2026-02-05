import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CardPrimitive,
  DetailedStep,
  PlayerPrimitive,
  ReportEffect,
} from "../../types/general";

export type StepAnimationFinalPayload = {
  player: PlayerPrimitive;
  card: string;
  isMe: boolean;
};

export type StepAnimationAfterCycle = {
  cycle: number;
  you: PlayerPrimitive;
  otherPlayers: PlayerPrimitive[];
  leylines: string[];
  report: ReportEffect[];
};

export type StepAnimationAfterEndTurn = {
  taskId: string;
  report: ReportEffect[];
};

export type AddCardDestination = "hand" | "deck" | "discard";

export type ElementOnEnemy = { enemyId: string; element: string };
export type ReactionOnEnemy = {
  enemyId: string;
  element1: string;
  element2: string;
};

const initialState: {
  steps: DetailedStep[];
  finalPayload: StepAnimationFinalPayload | null;
  afterCyclePayload: StepAnimationAfterCycle | null;
  afterEndTurnPayload: StepAnimationAfterEndTurn | null;
  dyingEnemyIds: string[];
  animatingDiscardCards: CardPrimitive[] | null;
  animatingDrawCards: CardPrimitive[] | null;
  animatingAddCard: { card: CardPrimitive; to: AddCardDestination } | null;
  piercingEnemyIds: string[];
  blockingEnemyIds: string[];
  elementOnEnemy: ElementOnEnemy | null;
  reactionOnEnemy: ReactionOnEnemy | null;
} = {
  steps: [],
  finalPayload: null,
  afterCyclePayload: null,
  afterEndTurnPayload: null,
  dyingEnemyIds: [],
  animatingDiscardCards: null,
  animatingDrawCards: null,
  animatingAddCard: null,
  piercingEnemyIds: [],
  blockingEnemyIds: [],
  elementOnEnemy: null,
  reactionOnEnemy: null,
};

const stepAnimationSlice = createSlice({
  name: "stepAnimation",
  initialState,
  reducers: {
    startStepAnimation(
      state,
      action: PayloadAction<
        | {
            steps: DetailedStep[];
            player: PlayerPrimitive;
            card: string;
            isMe: boolean;
          }
        | {
            steps: DetailedStep[];
            afterCycle: StepAnimationAfterCycle;
          }
        | {
            steps: DetailedStep[];
            afterEndTurn: StepAnimationAfterEndTurn;
          }
      >
    ) {
      const { steps } = action.payload;
      state.steps = steps;
      state.dyingEnemyIds = [];
      state.piercingEnemyIds = [];
      state.blockingEnemyIds = [];
      state.elementOnEnemy = null;
      state.reactionOnEnemy = null;
      if ("player" in action.payload) {
        state.finalPayload = {
          player: action.payload.player,
          card: action.payload.card,
          isMe: action.payload.isMe,
        };
        state.afterCyclePayload = null;
        state.afterEndTurnPayload = null;
      } else if ("afterCycle" in action.payload) {
        state.finalPayload = null;
        state.afterCyclePayload = action.payload.afterCycle;
        state.afterEndTurnPayload = null;
      } else {
        state.finalPayload = null;
        state.afterCyclePayload = null;
        state.afterEndTurnPayload = action.payload.afterEndTurn;
      }
    },

    setDyingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.dyingEnemyIds.push(action.payload.enemyId);
    },

    removeDyingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.dyingEnemyIds = state.dyingEnemyIds.filter(
        (id) => id !== action.payload.enemyId
      );
    },

    setAnimatingDiscardCards(
      state,
      action: PayloadAction<CardPrimitive[] | null>
    ) {
      state.animatingDiscardCards = action.payload;
    },

    setAnimatingDrawCards(state, action: PayloadAction<CardPrimitive[] | null>) {
      state.animatingDrawCards = action.payload;
    },

    setAnimatingAddCard(
      state,
      action: PayloadAction<{
        card: CardPrimitive;
        to: AddCardDestination;
      } | null>
    ) {
      state.animatingAddCard = action.payload;
    },

    setPiercingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.piercingEnemyIds.push(action.payload.enemyId);
    },

    clearPiercingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.piercingEnemyIds = state.piercingEnemyIds.filter(
        (id) => id !== action.payload.enemyId
      );
    },

    setBlockingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.blockingEnemyIds.push(action.payload.enemyId);
    },

    clearBlockingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.blockingEnemyIds = state.blockingEnemyIds.filter(
        (id) => id !== action.payload.enemyId
      );
    },

    setElementOnEnemy(state, action: PayloadAction<ElementOnEnemy | null>) {
      state.elementOnEnemy = action.payload;
    },

    setReactionOnEnemy(state, action: PayloadAction<ReactionOnEnemy | null>) {
      state.reactionOnEnemy = action.payload;
    },

    clearStepAnimation(state) {
      state.steps = [];
      state.finalPayload = null;
      state.afterCyclePayload = null;
      state.afterEndTurnPayload = null;
      state.dyingEnemyIds = [];
      state.animatingDiscardCards = null;
      state.animatingDrawCards = null;
      state.animatingAddCard = null;
      state.piercingEnemyIds = [];
      state.blockingEnemyIds = [];
      state.elementOnEnemy = null;
      state.reactionOnEnemy = null;
    },
  },
});

export default stepAnimationSlice.reducer;
export const {
  startStepAnimation,
  setDyingEnemy,
  removeDyingEnemy,
  setAnimatingDiscardCards,
  setAnimatingDrawCards,
  setAnimatingAddCard,
  setPiercingEnemy,
  clearPiercingEnemy,
  setBlockingEnemy,
  clearBlockingEnemy,
  setElementOnEnemy,
  setReactionOnEnemy,
  clearStepAnimation,
} = stepAnimationSlice.actions;
