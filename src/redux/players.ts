import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardPrimitive, EnemyPrimitive, PlayerPrimitive, PyramidSlot } from "../types/general";
import { ECharacter, EElement, ELeyline } from "../types/enums";

const initialState: {
  me: PlayerPrimitive;
  other: PlayerPrimitive[];
  players: PlayerPrimitive[];
  cycle: number;
  leylines: ELeyline[];
} = {
  players: [],
  me: {
    playerId: "",
    hp: 0,
    enemies: [],
    effects: [],
    characters: [],
    shields: 0,
    energy: 0,
    mora: 0,
    actionPoints: { normal: 0, extra: 0, total: 0 },
    hand: [],
    discard: [],
    deck: [],
    eulaSnowflakes: 0,
    raidenPoints: 0,
  },
  other: [],
  cycle: -1,
  leylines: [],
};

const charactersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayerAction(state, action: PayloadAction<{ playerId: string }>) {
      const { playerId } = action.payload;
      state.players.push({
        playerId,
        hp: 0,
        enemies: [],
        effects: [],
        characters: [],
        shields: 0,
        energy: 0,
        mora: 0,
        actionPoints: { normal: 0, extra: 0, total: 0 },
        hand: [],
        discard: [],
        deck: [],
        eulaSnowflakes: 0,
        raidenPoints: 0,
      });
    },

    addCharacterAction(state, action: PayloadAction<{ character: ECharacter; playerId: string }>) {
      const { character, playerId } = action.payload;
      const player = state.players.find((player) => player.playerId === playerId)!;
      player.characters.push(character);
    },

    removeCharacterAction(state, action: PayloadAction<{ character: ECharacter; playerId: string }>) {
      const { character, playerId } = action.payload;
      const player = state.players.find((player) => player.playerId === playerId)!;
      player.characters = player.characters.filter((char) => char !== character);
    },

    setPlayers(
      state,
      action: PayloadAction<{
        you: PlayerPrimitive;
        otherPlayers: PlayerPrimitive[];
      }>,
    ) {
      const { you, otherPlayers } = action.payload;
      state.me = you;
      state.other = otherPlayers;
    },

    setCycle(state, action: PayloadAction<{ cycle: number }>) {
      state.cycle = action.payload.cycle;
    },

    setLeyline(state, action: PayloadAction<{ leylines: ELeyline[] }>) {
      state.leylines = action.payload.leylines;
    },

    setHand(state, action: PayloadAction<{ cards: CardPrimitive[] }>) {
      state.me.hand = action.payload.cards;
    },

    useCard(
      state,
      action: PayloadAction<{
        player: PlayerPrimitive;
        card: string;
        isMe: boolean;
      }>,
    ) {
      const { isMe, player } = action.payload;
      if (isMe) {
        state.me = player;
      } else {
        const index = state.other.findIndex((pl) => pl.playerId === player.playerId);
        state.other[index] = player;
      }
    },

    applyPlayerUpdate(state, action: PayloadAction<{ player: PlayerPrimitive }>) {
      const { player } = action.payload;
      if (state.me.playerId === player.playerId) {
        state.me = player;
      } else {
        const index = state.other.findIndex((pl) => pl.playerId === player.playerId);
        if (index >= 0) state.other[index] = player;
      }
    },

    removeEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      const { enemyId } = action.payload;
      const removeFrom = (enemies: PyramidSlot[]) => {
        const idx = enemies.findIndex((e) => e.id === enemyId);
        if (idx !== -1) {
          enemies.splice(idx, 1);
          for (const e of enemies) {
            e.covers = e.covers.filter((id) => id !== enemyId);
          }
          return true;
        }
        return false;
      };
      if (!removeFrom(state.me.enemies)) {
        for (const player of state.other) removeFrom(player.enemies);
      }
    },

    addElementToEnemy(state, action: PayloadAction<{ enemyId: string; element: EElement }>) {
      const { enemyId, element } = action.payload;
      const addTo = (enemies: PyramidSlot[]) => {
        const slot = enemies.find((e) => e.id === enemyId);
        if (slot && !slot.faceDown && !slot.elements.includes(element)) {
          slot.elements.push(element);
        }
      };
      addTo(state.me.enemies);
      state.other.forEach((p) => addTo(p.enemies));
    },

    applyPlayerHpShieldDelta(
      state,
      action: PayloadAction<{ playerId: string; hpDelta?: number; shieldDelta?: number }>,
    ) {
      const { playerId, hpDelta, shieldDelta } = action.payload;
      const player =
        state.me.playerId === playerId
          ? state.me
          : state.other.find((p) => p.playerId === playerId);
      if (!player) return;
      if (shieldDelta !== undefined) player.shields = Math.max(0, player.shields + shieldDelta);
      if (hpDelta !== undefined) player.hp = Math.max(0, player.hp + hpDelta);
    },

    applyEnemyHpDelta(state, action: PayloadAction<{ enemyId: string; delta: number }>) {
      const { enemyId, delta } = action.payload;
      const update = (enemies: PyramidSlot[]) => {
        const slot = enemies.find((e) => e.id === enemyId);
        if (slot && !slot.faceDown) {
          slot.hp = Math.max(0, slot.hp + delta);
        }
      };
      update(state.me.enemies);
      state.other.forEach((p) => update(p.enemies));
    },

    revealEnemyAction(
      state,
      action: PayloadAction<{ enemy: Extract<PyramidSlot, { faceDown: false }> }>,
    ) {
      const { enemy } = action.payload;
      const update = (enemies: PyramidSlot[]) => {
        const idx = enemies.findIndex((slot) => slot.id === enemy.id);
        if (idx !== -1) {
          enemies[idx] = enemy;
          return true;
        }
        return false;
      };
      if (!update(state.me.enemies)) {
        for (const player of state.other) update(player.enemies);
      }
    },

    flipEnemyFaceDownAction(
      state,
      action: PayloadAction<{
        enemy: Extract<PyramidSlot, { faceDown: true }>;
        coveredByEnemyId: string;
      }>,
    ) {
      const { enemy, coveredByEnemyId } = action.payload;
      const update = (enemies: PyramidSlot[]) => {
        const idx = enemies.findIndex((e) => e.id === enemy.id);
        if (idx !== -1) {
          enemies[idx] = enemy;
          const coveringSlot = enemies.find((e) => e.id === coveredByEnemyId);
          if (coveringSlot) coveringSlot.covers = [enemy.id];
          return true;
        }
        return false;
      };
      if (!update(state.me.enemies)) {
        for (const player of state.other) update(player.enemies);
      }
    },
  },
});

export default charactersSlice.reducer;
export const {
  addPlayerAction,
  addCharacterAction,
  removeCharacterAction,
  setPlayers,
  setCycle,
  setLeyline,
  useCard,
  applyPlayerUpdate,
  applyPlayerHpShieldDelta,
  setHand,
  removeEnemy,
  addElementToEnemy,
  applyEnemyHpDelta,
  revealEnemyAction,
  flipEnemyFaceDownAction,
} = charactersSlice.actions;
