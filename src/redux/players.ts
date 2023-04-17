import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerPrimitive } from "./../../types/general";

const initialState: {
  me: PlayerPrimitive;
  other: PlayerPrimitive[];
  players: PlayerPrimitive[];
} = {
  players: [],
  me: {
    playerId: "",
    hp: 0,
    wave: 0,
    enemies: [],
    effects: [],
    characters: [],
    shields: 0,
    energy: 0,
    actionPoints: { normal: 0, extra: 0, total: 0 },
    hand: [],
  },
  other: [],
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
        wave: 0,
        enemies: [],
        effects: [],
        characters: [],
        shields: 0,
        energy: 0,
        actionPoints: { normal: 0, extra: 0, total: 0 },
        hand: [],
      });
    },

    addCharacterAction(
      state,
      action: PayloadAction<{ character: string; playerId: string }>
    ) {
      const { character, playerId } = action.payload;
      const player = state.players.find(
        (player) => player.playerId === playerId
      )!;
      player.characters.push(character);
    },

    removeCharacterAction(
      state,
      action: PayloadAction<{ character: string; playerId: string }>
    ) {
      const { character, playerId } = action.payload;
      const player = state.players.find(
        (player) => player.playerId === playerId
      )!;
      player.characters = player.characters.filter(
        (char) => char !== character
      );
    },

    setPlayers(state, action: PayloadAction<{ players: PlayerPrimitive[] }>) {
      const { players } = action.payload;
      state.me = players[0];
      state.other = players.filter(
        (player) => player.playerId !== state.me.playerId
      );
    },
  },
});

export default charactersSlice.reducer;
export const {
  addPlayerAction,
  addCharacterAction,
  removeCharacterAction,
  setPlayers,
} = charactersSlice.actions;
