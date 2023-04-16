import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { myPlayerId: string } = {
  myPlayerId: "",
};

const wsSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {
    setMyPlayerId(state, action: PayloadAction<{ playerId: string }>) {
      state.myPlayerId = action.payload.playerId;
    },
  },
});

export default wsSlice.reducer;
export const { setMyPlayerId } = wsSlice.actions;
