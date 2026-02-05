import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  myPlayerId: string;
  page: "menu" | "characters" | "game";
  wsError: string | null;
} = {
  myPlayerId: "",
  page: "menu",
  wsError: null,
};

const wsSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setMyPlayerId(state, action: PayloadAction<{ playerId: string }>) {
      state.myPlayerId = action.payload.playerId;
    },

    setPage(
      state,
      action: PayloadAction<{ page: "menu" | "characters" | "game" }>
    ) {
      state.page = action.payload.page;
    },

    setWsError(state, action: PayloadAction<string | null>) {
      state.wsError = action.payload;
    },
  },
});

export default wsSlice.reducer;
export const { setMyPlayerId, setPage, setWsError } = wsSlice.actions;
