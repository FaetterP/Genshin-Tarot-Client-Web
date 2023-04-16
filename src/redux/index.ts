import { combineReducers, configureStore } from "@reduxjs/toolkit";
import players from "./players";
import service from "./service";

const rootReducer = combineReducers({ players, service });
export type State = ReturnType<typeof rootReducer>;

export const store = configureStore({ reducer: rootReducer });
