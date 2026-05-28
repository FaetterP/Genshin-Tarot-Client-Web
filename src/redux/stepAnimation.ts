import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BossPrimitive, CardPrimitive, PlayerPrimitive } from "../types/general";
import { DetailedStep } from "../types/detailedStep";
import type { EDvalinAttack, ELeyline, EPlayerEffect, EEnemyEffect } from "../types/enums";

export type StepAnimationPayload =
  | {
      steps: DetailedStep[];
      player: PlayerPrimitive;
      card: string;
      isMe: boolean;
      boss?: BossPrimitive | null;
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
      afterEndCycle: StepAnimationAfterEndCycle;
    }
  | {
      steps: DetailedStep[];
      afterUpgrade: StepAnimationAfterUpgrade;
    };

export type StepAnimationFinalPayload = {
  player: PlayerPrimitive;
  card: string;
  isMe: boolean;
  boss?: BossPrimitive | null;
};

export type StepAnimationAfterCycle = {
  cycle: number;
  you: PlayerPrimitive;
  otherPlayers: PlayerPrimitive[];
  leylines: ELeyline[];
  boss?: BossPrimitive | null;
};

export type StepAnimationAfterEndTurn = {
  taskId?: string;
};

export type StepAnimationAfterEndCycle = {
  taskId: string;
};

export type StepAnimationAfterUpgrade = {
  player: PlayerPrimitive;
  boss?: BossPrimitive | null;
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

export type AnimatingEffectTrigger = {
  effect: EPlayerEffect;
  isRemove: boolean;
  playerId: string;
};

export type AnimatingEnemyAttack = {
  enemyId: string;
  playerId: string;
  damage: number;
};

export type AnimatingEnemiesSwap = {
  enemyId1: string;
  enemyId2: string;
};

export type AnimatingEnemyEffect = { enemyId: string; effect: EEnemyEffect; isAdd: boolean };
export type AnimatingPlayerEffect = { playerId: string; effect: EPlayerEffect; isAdd: boolean };

const initialState: {
  steps: DetailedStep[];
  finalPayload: StepAnimationFinalPayload | null;
  afterCyclePayload: StepAnimationAfterCycle | null;
  afterEndTurnPayload: StepAnimationAfterEndTurn | null;
  afterEndCyclePayload: StepAnimationAfterEndCycle | null;
  afterUpgradePayload: StepAnimationAfterUpgrade | null;
  animationQueue: StepAnimationPayload[];
  dyingEnemyIds: string[];
  flippingFaceDownEnemyIds: string[];
  appearingEnemyIds: string[];
  revealingEnemyIds: string[];
  animatingTrashCards: CardPrimitive[] | null;
  animatingDiscardCards: CardPrimitive[] | null;
  animatingDrawCards: CardPrimitive[] | null;
  cardsLeavingDeckForDraw: CardPrimitive[] | null;
  animatingAddCard: { card: CardPrimitive; to: AddCardDestination } | null;
  animatingUpgradeCard: AnimatingUpgradeCard | null;
  piercingEnemyIds: string[];
  blockingEnemyIds: string[];
  stunningEnemyIds: string[];
  elementOnEnemies: ElementOnEnemy[];
  reactionsOnEnemies: ReactionOnEnemy[];
  animatingEnemyEffects: AnimatingEnemyEffect[];
  animatingPlayerEffects: AnimatingPlayerEffect[];
  energyFreezedPlayerId: string | null;
  animatingLeyline: ELeyline | null;
  animatingEffectTrigger: AnimatingEffectTrigger | null;
  animatingEnemyAttack: AnimatingEnemyAttack | null;
  animatingEnemiesSwap: AnimatingEnemiesSwap | null;
  animatingBossAppearance: boolean;
  animatingBossReset: boolean;
  animatingBossAnemoImmunity: boolean;
  animatingBossAttack: EDvalinAttack | null;
} = {
  steps: [],
  finalPayload: null,
  afterCyclePayload: null,
  afterEndTurnPayload: null,
  afterEndCyclePayload: null,
  afterUpgradePayload: null,
  animationQueue: [],
  dyingEnemyIds: [],
  flippingFaceDownEnemyIds: [],
  appearingEnemyIds: [],
  revealingEnemyIds: [],
  animatingTrashCards: null,
  animatingDiscardCards: null,
  animatingDrawCards: null,
  cardsLeavingDeckForDraw: null,
  animatingAddCard: null,
  animatingUpgradeCard: null,
  piercingEnemyIds: [],
  blockingEnemyIds: [],
  stunningEnemyIds: [],
  elementOnEnemies: [],
  reactionsOnEnemies: [],
  animatingEnemyEffects: [],
  animatingPlayerEffects: [],
  energyFreezedPlayerId: null,
  animatingLeyline: null,
  animatingEffectTrigger: null,
  animatingEnemyAttack: null,
  animatingEnemiesSwap: null,
  animatingBossAppearance: false,
  animatingBossReset: false,
  animatingBossAnemoImmunity: false,
  animatingBossAttack: null,
};

const stepAnimationSlice = createSlice({
  name: "stepAnimation",
  initialState,
  reducers: {
    startStepAnimation(state, action: PayloadAction<StepAnimationPayload>) {
      const payload = action.payload;
      const { steps } = payload;

      // Если уже идёт анимация — ставим в очередь
      if (state.steps.length > 0) {
        state.animationQueue.push(payload);
        return;
      }

      state.steps = steps;
      state.dyingEnemyIds = [];
      state.flippingFaceDownEnemyIds = [];
      state.appearingEnemyIds = [];
      state.revealingEnemyIds = [];
      state.piercingEnemyIds = [];
      state.blockingEnemyIds = [];
      state.stunningEnemyIds = [];
      state.elementOnEnemies = [];
      state.reactionsOnEnemies = [];
      state.animatingEnemyEffects = [];
      state.animatingPlayerEffects = [];
      state.energyFreezedPlayerId = null;
      state.animatingLeyline = null;
      state.animatingEffectTrigger = null;
      state.animatingEnemyAttack = null;
      state.animatingEnemiesSwap = null;
      if ("player" in payload && "card" in payload) {
        state.finalPayload = {
          player: payload.player,
          card: payload.card,
          isMe: payload.isMe,
          boss: payload.boss,
        };
        state.afterCyclePayload = null;
        state.afterEndTurnPayload = null;
        state.afterEndCyclePayload = null;
        state.afterUpgradePayload = null;
      } else if ("afterCycle" in payload) {
        state.finalPayload = null;
        state.afterCyclePayload = payload.afterCycle;
        state.afterEndTurnPayload = null;
        state.afterEndCyclePayload = null;
        state.afterUpgradePayload = null;
      } else if ("afterUpgrade" in payload) {
        state.finalPayload = null;
        state.afterCyclePayload = null;
        state.afterEndTurnPayload = null;
        state.afterEndCyclePayload = null;
        state.afterUpgradePayload = payload.afterUpgrade;
      } else if ("afterEndCycle" in payload) {
        state.finalPayload = null;
        state.afterCyclePayload = null;
        state.afterEndTurnPayload = null;
        state.afterEndCyclePayload = payload.afterEndCycle;
        state.afterUpgradePayload = null;
      } else {
        state.finalPayload = null;
        state.afterCyclePayload = null;
        state.afterEndTurnPayload = payload.afterEndTurn;
        state.afterEndCyclePayload = null;
        state.afterUpgradePayload = null;
      }
    },

    setAnimatingUpgradeCard(state, action: PayloadAction<AnimatingUpgradeCard | null>) {
      state.animatingUpgradeCard = action.payload;
    },

    setDyingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.dyingEnemyIds.push(action.payload.enemyId);
    },

    removeDyingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.dyingEnemyIds = state.dyingEnemyIds.filter((id) => id !== action.payload.enemyId);
    },

    setFlippingFaceDownEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.flippingFaceDownEnemyIds.push(action.payload.enemyId);
    },

    removeFlippingFaceDownEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.flippingFaceDownEnemyIds = state.flippingFaceDownEnemyIds.filter(
        (id) => id !== action.payload.enemyId,
      );
    },

    setAppearingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.appearingEnemyIds.push(action.payload.enemyId);
    },

    removeAppearingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.appearingEnemyIds = state.appearingEnemyIds.filter(
        (id) => id !== action.payload.enemyId,
      );
    },

    setRevealingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.revealingEnemyIds.push(action.payload.enemyId);
    },

    removeRevealingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.revealingEnemyIds = state.revealingEnemyIds.filter(
        (id) => id !== action.payload.enemyId,
      );
    },

    setAnimatingTrashCards(state, action: PayloadAction<CardPrimitive[] | null>) {
      state.animatingTrashCards = action.payload;
    },

    setAnimatingDiscardCards(state, action: PayloadAction<CardPrimitive[] | null>) {
      state.animatingDiscardCards = action.payload;
    },

    setAnimatingDrawCards(state, action: PayloadAction<CardPrimitive[] | null>) {
      state.animatingDrawCards = action.payload;
    },

    setCardsLeavingDeckForDraw(state, action: PayloadAction<CardPrimitive[] | null>) {
      state.cardsLeavingDeckForDraw = action.payload;
    },

    setAnimatingAddCard(
      state,
      action: PayloadAction<{
        card: CardPrimitive;
        to: AddCardDestination;
      } | null>,
    ) {
      state.animatingAddCard = action.payload;
    },

    setPiercingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.piercingEnemyIds.push(action.payload.enemyId);
    },

    clearPiercingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.piercingEnemyIds = state.piercingEnemyIds.filter((id) => id !== action.payload.enemyId);
    },

    setBlockingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.blockingEnemyIds.push(action.payload.enemyId);
    },

    clearBlockingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.blockingEnemyIds = state.blockingEnemyIds.filter((id) => id !== action.payload.enemyId);
    },

    setStunningEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.stunningEnemyIds.push(action.payload.enemyId);
    },

    clearStunningEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.stunningEnemyIds = state.stunningEnemyIds.filter((id) => id !== action.payload.enemyId);
    },

    setElementOnEnemy(state, action: PayloadAction<ElementOnEnemy>) {
      const idx = state.elementOnEnemies.findIndex((e) => e.enemyId === action.payload.enemyId);
      if (idx >= 0) state.elementOnEnemies[idx] = action.payload;
      else state.elementOnEnemies.push(action.payload);
    },

    clearElementOnEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.elementOnEnemies = state.elementOnEnemies.filter((e) => e.enemyId !== action.payload.enemyId);
    },

    setReactionOnEnemy(state, action: PayloadAction<ReactionOnEnemy>) {
      const idx = state.reactionsOnEnemies.findIndex((e) => e.enemyId === action.payload.enemyId);
      if (idx >= 0) state.reactionsOnEnemies[idx] = action.payload;
      else state.reactionsOnEnemies.push(action.payload);
    },

    clearReactionOnEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.reactionsOnEnemies = state.reactionsOnEnemies.filter((e) => e.enemyId !== action.payload.enemyId);
    },

    addAnimatingEnemyEffect(state, action: PayloadAction<AnimatingEnemyEffect>) {
      const idx = state.animatingEnemyEffects.findIndex((e) => e.enemyId === action.payload.enemyId);
      if (idx >= 0) state.animatingEnemyEffects[idx] = action.payload;
      else state.animatingEnemyEffects.push(action.payload);
    },

    removeAnimatingEnemyEffect(state, action: PayloadAction<{ enemyId: string }>) {
      state.animatingEnemyEffects = state.animatingEnemyEffects.filter((e) => e.enemyId !== action.payload.enemyId);
    },

    addAnimatingPlayerEffect(state, action: PayloadAction<AnimatingPlayerEffect>) {
      const idx = state.animatingPlayerEffects.findIndex((e) => e.playerId === action.payload.playerId);
      if (idx >= 0) state.animatingPlayerEffects[idx] = action.payload;
      else state.animatingPlayerEffects.push(action.payload);
    },

    removeAnimatingPlayerEffect(state, action: PayloadAction<{ playerId: string }>) {
      state.animatingPlayerEffects = state.animatingPlayerEffects.filter((e) => e.playerId !== action.payload.playerId);
    },

    setEnergyFreezed(state, action: PayloadAction<{ playerId: string } | null>) {
      state.energyFreezedPlayerId = action.payload === null ? null : action.payload.playerId;
    },

    setAnimatingLeyline(state, action: PayloadAction<ELeyline | null>) {
      state.animatingLeyline = action.payload;
    },

    setAnimatingEffectTrigger(state, action: PayloadAction<AnimatingEffectTrigger | null>) {
      state.animatingEffectTrigger = action.payload;
    },

    setAnimatingEnemyAttack(state, action: PayloadAction<AnimatingEnemyAttack | null>) {
      state.animatingEnemyAttack = action.payload;
    },

    setAnimatingEnemiesSwap(state, action: PayloadAction<AnimatingEnemiesSwap | null>) {
      state.animatingEnemiesSwap = action.payload;
    },

    setAnimatingBossAppearance(state, action: PayloadAction<boolean>) {
      state.animatingBossAppearance = action.payload;
    },

    setAnimatingBossReset(state, action: PayloadAction<boolean>) {
      state.animatingBossReset = action.payload;
    },

    setAnimatingBossAnemoImmunity(state, action: PayloadAction<boolean>) {
      state.animatingBossAnemoImmunity = action.payload;
    },

    setAnimatingBossAttack(state, action: PayloadAction<EDvalinAttack | null>) {
      state.animatingBossAttack = action.payload;
    },

    clearStepAnimation(state) {
      state.steps = [];
      state.finalPayload = null;
      state.afterCyclePayload = null;
      state.afterEndTurnPayload = null;
      state.afterEndCyclePayload = null;
      state.afterUpgradePayload = null;
      state.dyingEnemyIds = [];
      state.flippingFaceDownEnemyIds = [];
      state.appearingEnemyIds = [];
      state.animatingTrashCards = null;
      state.animatingDiscardCards = null;
      state.animatingDrawCards = null;
      state.cardsLeavingDeckForDraw = null;
      state.animatingAddCard = null;
      state.animatingUpgradeCard = null;
      state.piercingEnemyIds = [];
      state.blockingEnemyIds = [];
      state.stunningEnemyIds = [];
      state.elementOnEnemies = [];
      state.reactionsOnEnemies = [];
      state.animatingEnemyEffects = [];
      state.animatingPlayerEffects = [];
      state.energyFreezedPlayerId = null;
      state.animatingLeyline = null;
      state.animatingEffectTrigger = null;
      state.animatingEnemyAttack = null;
      state.animatingEnemiesSwap = null;
      state.animatingBossAppearance = false;
      state.animatingBossReset = false;
      state.animatingBossAnemoImmunity = false;
      state.animatingBossAttack = null;

      // Запускаем следующую анимацию из очереди
      const next = state.animationQueue.shift();
      if (next) {
        state.steps = next.steps;
        state.dyingEnemyIds = [];
        state.flippingFaceDownEnemyIds = [];
        state.appearingEnemyIds = [];
        state.piercingEnemyIds = [];
        state.blockingEnemyIds = [];
        state.elementOnEnemies = [];
        state.reactionsOnEnemies = [];
        state.animatingEnemyEffects = [];
        state.animatingPlayerEffects = [];
        state.energyFreezedPlayerId = null;
        state.animatingLeyline = null;
        state.animatingEffectTrigger = null;
        state.animatingEnemyAttack = null;
        state.animatingEnemiesSwap = null;
        if ("player" in next && "card" in next) {
          state.finalPayload = {
            player: next.player,
            card: next.card,
            isMe: next.isMe,
            boss: next.boss,
          };
          state.afterCyclePayload = null;
          state.afterEndTurnPayload = null;
          state.afterEndCyclePayload = null;
          state.afterUpgradePayload = null;
        } else if ("afterCycle" in next) {
          state.finalPayload = null;
          state.afterCyclePayload = next.afterCycle;
          state.afterEndTurnPayload = null;
          state.afterEndCyclePayload = null;
          state.afterUpgradePayload = null;
        } else if ("afterUpgrade" in next) {
          state.finalPayload = null;
          state.afterCyclePayload = null;
          state.afterEndTurnPayload = null;
          state.afterEndCyclePayload = null;
          state.afterUpgradePayload = next.afterUpgrade;
        } else if ("afterEndCycle" in next) {
          state.finalPayload = null;
          state.afterCyclePayload = null;
          state.afterEndTurnPayload = null;
          state.afterEndCyclePayload = next.afterEndCycle;
          state.afterUpgradePayload = null;
        } else {
          state.finalPayload = null;
          state.afterCyclePayload = null;
          state.afterEndTurnPayload = next.afterEndTurn;
          state.afterEndCyclePayload = null;
          state.afterUpgradePayload = null;
        }
      }
    },
  },
});

export default stepAnimationSlice.reducer;
export const {
  startStepAnimation,
  setDyingEnemy,
  removeDyingEnemy,
  setFlippingFaceDownEnemy,
  removeFlippingFaceDownEnemy,
  setAppearingEnemy,
  removeAppearingEnemy,
  setRevealingEnemy,
  removeRevealingEnemy,
  setAnimatingTrashCards,
  setAnimatingDiscardCards,
  setAnimatingDrawCards,
  setCardsLeavingDeckForDraw,
  setAnimatingAddCard,
  setAnimatingUpgradeCard,
  setPiercingEnemy,
  clearPiercingEnemy,
  setBlockingEnemy,
  clearBlockingEnemy,
  setStunningEnemy,
  clearStunningEnemy,
  setElementOnEnemy,
  clearElementOnEnemy,
  setReactionOnEnemy,
  clearReactionOnEnemy,
  addAnimatingEnemyEffect,
  removeAnimatingEnemyEffect,
  addAnimatingPlayerEffect,
  removeAnimatingPlayerEffect,
  setEnergyFreezed,
  setAnimatingLeyline,
  setAnimatingEffectTrigger,
  setAnimatingEnemyAttack,
  setAnimatingEnemiesSwap,
  setAnimatingBossAppearance,
  setAnimatingBossReset,
  setAnimatingBossAnemoImmunity,
  setAnimatingBossAttack,
  clearStepAnimation,
} = stepAnimationSlice.actions;
