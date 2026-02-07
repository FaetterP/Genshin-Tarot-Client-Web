import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cards } from "../storage/cards/cards";

export type CardSource = "hand" | "discard" | "deck";

const initialState: {
  enemies: string[];
  selectedPlayer: string;
  selectedCard: string;
  selectedCardForEffect: string;
  isNeedCardFrom: CardSource[];

  needEnemies: number;
  isRange: boolean;
  isCanAlternative: boolean;
  isNeedPlayer: boolean;
} = {
  enemies: [],
  selectedPlayer: "",
  selectedCard: "",
  selectedCardForEffect: "",
  isNeedCardFrom: [],

  needEnemies: 0,
  isRange: false,
  isCanAlternative: false,
  isNeedPlayer: false,
};

const charactersSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    selectCard(
      state,
      action: PayloadAction<{ cardId: string; cardKey: string }>
    ) {
      const { cardId, cardKey } = action.payload;
      state.selectedCard = cardId;
      const { enemiesCount, isRange, isCanAlternative, isNeedPlayer, isNeedCardFrom } =
        cards[cardKey].require || {};

      if (enemiesCount) {
        state.needEnemies = enemiesCount;
        state.isRange = isRange || false;
      } else {
        state.needEnemies = 0;
        state.isRange = false;
      }

      state.isCanAlternative = isCanAlternative || false;
      state.isNeedPlayer = isNeedPlayer || false;
      state.isNeedCardFrom = isNeedCardFrom ?? [];
      state.selectedCardForEffect = "";

      state.enemies = [];
      state.selectedPlayer = "";
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
    }
  },
});

export default charactersSlice.reducer;
export const { selectCard, selectEnemy, setCardSelectedPlayer, setSelectedCardForEffect, clearUsedCard } =
  charactersSlice.actions;
