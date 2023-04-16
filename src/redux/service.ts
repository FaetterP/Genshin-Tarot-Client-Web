import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  myPlayerId: string;
  page: "menu" | "characters" | "game";
} = {
  myPlayerId: "",
  page: "menu",
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
  },
});

export default wsSlice.reducer;
export const { setMyPlayerId, setPage } = wsSlice.actions;
