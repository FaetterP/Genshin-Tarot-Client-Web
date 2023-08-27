import { combineReducers, configureStore } from "@reduxjs/toolkit";
import players from "./players";
import service from "./service";
import card from "./card";
import lang from "./lang";
import effects from "./effects";

const rootReducer = combineReducers({
  players,
  service,
  card,
  lang,
  effects,
});

export type State = ReturnType<typeof rootReducer>;

export const store = configureStore({ reducer: rootReducer });
