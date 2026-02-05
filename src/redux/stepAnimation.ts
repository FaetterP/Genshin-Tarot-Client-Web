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

export type StepAnimationAfterUpgrade = {
  player: PlayerPrimitive;
};

export type AddCardDestination = "hand" | "deck" | "discard";

export type ElementOnEnemy = { enemyId: string; element: string };
export type ReactionOnEnemy = {
  enemyId: string;
  element1: string;
  element2: string;
};

export type AnimatingUpgradeCard = {
  playerId: string;
  oldCard: CardPrimitive;
  newCard: CardPrimitive;
};

const initialState: {
  steps: DetailedStep[];
  finalPayload: StepAnimationFinalPayload | null;
  afterCyclePayload: StepAnimationAfterCycle | null;
  afterEndTurnPayload: StepAnimationAfterEndTurn | null;
  afterUpgradePayload: StepAnimationAfterUpgrade | null;
  dyingEnemyIds: string[];
  appearingEnemyIds: string[];
  animatingDiscardCards: CardPrimitive[] | null;
  animatingDrawCards: CardPrimitive[] | null;
  cardsLeavingDeckForDraw: CardPrimitive[] | null;
  animatingAddCard: { card: CardPrimitive; to: AddCardDestination } | null;
  animatingUpgradeCard: AnimatingUpgradeCard | null;
  piercingEnemyIds: string[];
  blockingEnemyIds: string[];
  elementOnEnemy: ElementOnEnemy | null;
  reactionOnEnemy: ReactionOnEnemy | null;
  energyFreezedPlayerId: string | null;
} = {
  steps: [],
  finalPayload: null,
  afterCyclePayload: null,
  afterEndTurnPayload: null,
  afterUpgradePayload: null,
  dyingEnemyIds: [],
  appearingEnemyIds: [],
  animatingDiscardCards: null,
  animatingDrawCards: null,
  cardsLeavingDeckForDraw: null,
  animatingAddCard: null,
  animatingUpgradeCard: null,
  piercingEnemyIds: [],
  blockingEnemyIds: [],
  elementOnEnemy: null,
  reactionOnEnemy: null,
  energyFreezedPlayerId: null,
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
        | {
            steps: DetailedStep[];
            afterUpgrade: StepAnimationAfterUpgrade;
          }
      >
    ) {
      const { steps } = action.payload;
      state.steps = steps;
      state.dyingEnemyIds = [];
      state.appearingEnemyIds = [];
      state.piercingEnemyIds = [];
      state.blockingEnemyIds = [];
      state.elementOnEnemy = null;
      state.reactionOnEnemy = null;
      state.energyFreezedPlayerId = null;
      if ("player" in action.payload && "card" in action.payload) {
        state.finalPayload = {
          player: action.payload.player,
          card: action.payload.card,
          isMe: action.payload.isMe,
        };
        state.afterCyclePayload = null;
        state.afterEndTurnPayload = null;
        state.afterUpgradePayload = null;
      } else if ("afterCycle" in action.payload) {
        state.finalPayload = null;
        state.afterCyclePayload = action.payload.afterCycle;
        state.afterEndTurnPayload = null;
        state.afterUpgradePayload = null;
      } else if ("afterUpgrade" in action.payload) {
        state.finalPayload = null;
        state.afterCyclePayload = null;
        state.afterEndTurnPayload = null;
        state.afterUpgradePayload = action.payload.afterUpgrade;
      } else {
        state.finalPayload = null;
        state.afterCyclePayload = null;
        state.afterEndTurnPayload = action.payload.afterEndTurn;
        state.afterUpgradePayload = null;
      }
    },

    setAnimatingUpgradeCard(
      state,
      action: PayloadAction<AnimatingUpgradeCard | null>
    ) {
      state.animatingUpgradeCard = action.payload;
    },

    setDyingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.dyingEnemyIds.push(action.payload.enemyId);
    },

    removeDyingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.dyingEnemyIds = state.dyingEnemyIds.filter(
        (id) => id !== action.payload.enemyId
      );
    },

    setAppearingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.appearingEnemyIds.push(action.payload.enemyId);
    },

    removeAppearingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.appearingEnemyIds = state.appearingEnemyIds.filter(
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

    setCardsLeavingDeckForDraw(
      state,
      action: PayloadAction<CardPrimitive[] | null>
    ) {
      state.cardsLeavingDeckForDraw = action.payload;
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

    setEnergyFreezed(
      state,
      action: PayloadAction<{ playerId: string } | null>
    ) {
      state.energyFreezedPlayerId =
        action.payload === null ? null : action.payload.playerId;
    },

    clearStepAnimation(state) {
      state.steps = [];
      state.finalPayload = null;
      state.afterCyclePayload = null;
      state.afterEndTurnPayload = null;
      state.afterUpgradePayload = null;
      state.dyingEnemyIds = [];
      state.appearingEnemyIds = [];
      state.animatingDiscardCards = null;
      state.animatingDrawCards = null;
      state.cardsLeavingDeckForDraw = null;
      state.animatingAddCard = null;
      state.animatingUpgradeCard = null;
      state.piercingEnemyIds = [];
      state.blockingEnemyIds = [];
      state.elementOnEnemy = null;
      state.reactionOnEnemy = null;
      state.energyFreezedPlayerId = null;
    },
  },
});

export default stepAnimationSlice.reducer;
export const {
  startStepAnimation,
  setDyingEnemy,
  removeDyingEnemy,
  setAppearingEnemy,
  removeAppearingEnemy,
  setAnimatingDiscardCards,
  setAnimatingDrawCards,
  setCardsLeavingDeckForDraw,
  setAnimatingAddCard,
  setAnimatingUpgradeCard,
  setPiercingEnemy,
  clearPiercingEnemy,
  setBlockingEnemy,
  clearBlockingEnemy,
  setElementOnEnemy,
  setReactionOnEnemy,
  setEnergyFreezed,
  clearStepAnimation,
} = stepAnimationSlice.actions;
