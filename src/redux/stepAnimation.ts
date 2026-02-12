import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardPrimitive, PlayerPrimitive } from "../types/general";
import { DetailedStep } from "../types/detailedStep";

/** Один элемент очереди анимаций — такой же payload, как у startStepAnimation */
export type StepAnimationPayload =
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
};

export type StepAnimationAfterCycle = {
  cycle: number;
  you: PlayerPrimitive;
  otherPlayers: PlayerPrimitive[];
  leylines: string[];
};

export type StepAnimationAfterEndTurn = {
  taskId?: string;
};

export type StepAnimationAfterEndCycle = {
  taskId: string;
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

export type AnimatingEffectTrigger = {
  effect: string;
  isRemove: boolean;
  playerId: string;
};

export type AnimatingEnemyAttack = {
  enemyId: string;
  playerId: string;
  damage: number;
};

const initialState: {
  steps: DetailedStep[];
  finalPayload: StepAnimationFinalPayload | null;
  afterCyclePayload: StepAnimationAfterCycle | null;
  afterEndTurnPayload: StepAnimationAfterEndTurn | null;
  afterEndCyclePayload: StepAnimationAfterEndCycle | null;
  afterUpgradePayload: StepAnimationAfterUpgrade | null;
  animationQueue: StepAnimationPayload[];
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
  animatingLeyline: string | null;
  animatingEffectTrigger: AnimatingEffectTrigger | null;
  animatingEnemyAttack: AnimatingEnemyAttack | null;
} = {
  steps: [],
  finalPayload: null,
  afterCyclePayload: null,
  afterEndTurnPayload: null,
  afterEndCyclePayload: null,
  afterUpgradePayload: null,
  animationQueue: [],
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
  animatingLeyline: null,
  animatingEffectTrigger: null,
  animatingEnemyAttack: null,
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
      state.appearingEnemyIds = [];
      state.piercingEnemyIds = [];
      state.blockingEnemyIds = [];
      state.elementOnEnemy = null;
      state.reactionOnEnemy = null;
      state.energyFreezedPlayerId = null;
      state.animatingLeyline = null;
      state.animatingEffectTrigger = null;
      state.animatingEnemyAttack = null;
      if ("player" in payload && "card" in payload) {
        state.finalPayload = {
          player: payload.player,
          card: payload.card,
          isMe: payload.isMe,
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

    setAppearingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.appearingEnemyIds.push(action.payload.enemyId);
    },

    removeAppearingEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.appearingEnemyIds = state.appearingEnemyIds.filter(
        (id) => id !== action.payload.enemyId,
      );
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

    setElementOnEnemy(state, action: PayloadAction<ElementOnEnemy | null>) {
      state.elementOnEnemy = action.payload;
    },

    setReactionOnEnemy(state, action: PayloadAction<ReactionOnEnemy | null>) {
      state.reactionOnEnemy = action.payload;
    },

    setEnergyFreezed(state, action: PayloadAction<{ playerId: string } | null>) {
      state.energyFreezedPlayerId = action.payload === null ? null : action.payload.playerId;
    },

    setAnimatingLeyline(state, action: PayloadAction<string | null>) {
      state.animatingLeyline = action.payload;
    },

    setAnimatingEffectTrigger(state, action: PayloadAction<AnimatingEffectTrigger | null>) {
      state.animatingEffectTrigger = action.payload;
    },

    setAnimatingEnemyAttack(state, action: PayloadAction<AnimatingEnemyAttack | null>) {
      state.animatingEnemyAttack = action.payload;
    },

    clearStepAnimation(state) {
      state.steps = [];
      state.finalPayload = null;
      state.afterCyclePayload = null;
      state.afterEndTurnPayload = null;
      state.afterEndCyclePayload = null;
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
      state.animatingLeyline = null;
      state.animatingEffectTrigger = null;
      state.animatingEnemyAttack = null;

      // Запускаем следующую анимацию из очереди
      const next = state.animationQueue.shift();
      if (next) {
        state.steps = next.steps;
        state.dyingEnemyIds = [];
        state.appearingEnemyIds = [];
        state.piercingEnemyIds = [];
        state.blockingEnemyIds = [];
        state.elementOnEnemy = null;
        state.reactionOnEnemy = null;
        state.energyFreezedPlayerId = null;
        state.animatingLeyline = null;
        state.animatingEffectTrigger = null;
        state.animatingEnemyAttack = null;
        if ("player" in next && "card" in next) {
          state.finalPayload = {
            player: next.player,
            card: next.card,
            isMe: next.isMe,
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
  setAnimatingLeyline,
  setAnimatingEffectTrigger,
  setAnimatingEnemyAttack,
  clearStepAnimation,
} = stepAnimationSlice.actions;
