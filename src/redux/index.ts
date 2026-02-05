import { combineReducers, configureStore } from "@reduxjs/toolkit";
import players from "./players";
import service from "./service";
import card from "./card";
import burst from "./burst";
import lang from "./lang";
import effects from "./effects";
import stepAnimation from "./stepAnimation";

const rootReducer = combineReducers({
  players,
  service,
  card,
  burst,
  lang,
  effects,
  stepAnimation,
});

export type State = ReturnType<typeof rootReducer>;

export const store = configureStore({ reducer: rootReducer });
