import { combineReducers, configureStore } from "@reduxjs/toolkit";
import players from "./players";
import ws from "./ws";

const rootReducer = combineReducers({ players, ws });
export type State = ReturnType<typeof rootReducer>;

export const store = configureStore({ reducer: rootReducer });
