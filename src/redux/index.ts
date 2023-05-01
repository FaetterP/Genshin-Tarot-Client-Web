import { combineReducers, configureStore } from "@reduxjs/toolkit";
import players from "./players";
import service from "./service";
import card from "./card";

const rootReducer = combineReducers({ players, service, card });
export type State = ReturnType<typeof rootReducer>;

export const store = configureStore({ reducer: rootReducer });
