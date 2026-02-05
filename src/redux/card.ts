import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cards } from "../storage/cards/cards";

const initialState: {
  enemies: string[];
  selectedPlayer: string;
  selectedCard: string;

  needEnemies: number;
  isRange: boolean;
  isCanAlternative: boolean;
  isNeedPlayer: boolean;
} = {
  enemies: [],
  selectedPlayer: "",
  selectedCard: "",

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
      const { enemiesCount, isRange, isCanAlternative, isNeedPlayer } =
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
    clearUsedCard(state, _action: PayloadAction<void>) {
      return initialState;
    }
  },
});

export default charactersSlice.reducer;
export const { selectCard, selectEnemy, clearUsedCard } =
  charactersSlice.actions;
