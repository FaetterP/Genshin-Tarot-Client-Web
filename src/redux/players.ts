import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardPrimitive, PlayerPrimitive } from "./../../types/general";

const initialState: {
  me: PlayerPrimitive;
  other: PlayerPrimitive[];
  players: PlayerPrimitive[];
  cycle: number;
  leylines: string[];
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
    mora: 0,
    actionPoints: { normal: 0, extra: 0, total: 0 },
    hand: [],
    discard: [],
    deck: [],
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
        wave: 0,
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

    setPlayers(
      state,
      action: PayloadAction<{
        you: PlayerPrimitive;
        otherPlayers: PlayerPrimitive[];
      }>
    ) {
      const { you, otherPlayers } = action.payload;
      state.me = you;
      state.me.hand = [];
      state.other = otherPlayers;
    },

    setCycle(state, action: PayloadAction<{ cycle: number }>) {
      state.cycle = action.payload.cycle;
    },

    setLeyline(state, action: PayloadAction<{ leylines: string[] }>) {
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
      }>
    ) {
      const { isMe, player } = action.payload;
      if (isMe) {
        state.me = player;
      } else {
        const index = state.other.findIndex(
          (pl) => pl.playerId === player.playerId
        );
        state.other[index] = player;
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
  setHand,
} = charactersSlice.actions;
