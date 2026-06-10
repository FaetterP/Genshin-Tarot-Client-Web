import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cards } from "../storage/cards/cards";
import { ECard } from "../types/enums";

export type CardSource = "hand" | "discard" | "deck";

const initialState: {
  enemies: string[];
  selectedPlayer: string;
  selectedCard: string;
  selectedCardForEffect: string;
  isNeedCardFrom: CardSource[];

  needEnemies: number;
  needEnemiesMax: number;
  isRange: boolean;
  isCanAlternative: boolean;
  isNeedPlayer: boolean;

  raidenEnemies: string[];
  isRaidenMode: boolean;
} = {
  enemies: [],
  selectedPlayer: "",
  selectedCard: "",
  selectedCardForEffect: "",
  isNeedCardFrom: [],

  needEnemies: 0,
  needEnemiesMax: 0,
  isRange: false,
  isCanAlternative: false,
  isNeedPlayer: false,

  raidenEnemies: [],
  isRaidenMode: false,
};

const charactersSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    selectCard(state, action: PayloadAction<{ cardId: string; card: ECard }>) {
      const { cardId, card } = action.payload;
      state.selectedCard = cardId;
      const { enemiesCount, enemiesCountMax, isRange, isCanAlternative, isNeedPlayer, isNeedCardFrom } =
        cards[card].require || {};

      if (enemiesCount) {
        state.needEnemies = enemiesCount;
        state.needEnemiesMax = enemiesCountMax ?? 0;
        state.isRange = isRange || false;
      } else {
        state.needEnemies = 0;
        state.needEnemiesMax = 0;
        state.isRange = false;
      }

      state.isCanAlternative = isCanAlternative || false;
      state.isNeedPlayer = isNeedPlayer || false;
      state.isNeedCardFrom = isNeedCardFrom ?? [];
      state.selectedCardForEffect = "";

      state.enemies = [];
      state.selectedPlayer = "";
      state.raidenEnemies = [];
      state.isRaidenMode = false;
    },
    selectEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      if (!state.needEnemies) return;

      const enemyId = action.payload.enemyId;
      if (state.enemies.includes(enemyId)) {
        state.enemies = state.enemies.filter((item) => item !== enemyId);
      } else {
        state.enemies.push(enemyId);
      }
    },
    setCardSelectedPlayer(state, action: PayloadAction<{ playerId: string }>) {
      state.selectedPlayer = action.payload.playerId;
    },
    setSelectedCardForEffect(state, action: PayloadAction<{ cardId: string }>) {
      state.selectedCardForEffect = action.payload.cardId;
    },
    clearUsedCard(state, _action: PayloadAction<void>) {
      return initialState;
    },
    filterStaleEnemies(state, action: PayloadAction<{ validIds: string[] }>) {
      state.enemies = state.enemies.filter((id) => action.payload.validIds.includes(id));
      state.raidenEnemies = state.raidenEnemies.filter((id) => action.payload.validIds.includes(id));
    },

    toggleRaidenEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      const enemyId = action.payload.enemyId;
      if (state.raidenEnemies.includes(enemyId)) {
        state.raidenEnemies = state.raidenEnemies.filter((id) => id !== enemyId);
      } else {
        state.raidenEnemies.push(enemyId);
      }
    },

    toggleRaidenMode(state) {
      state.isRaidenMode = !state.isRaidenMode;
    },
  },
});

export default charactersSlice.reducer;
export const {
  selectCard,
  selectEnemy,
  setCardSelectedPlayer,
  setSelectedCardForEffect,
  clearUsedCard,
  filterStaleEnemies,
  toggleRaidenEnemy,
  toggleRaidenMode,
} = charactersSlice.actions;
