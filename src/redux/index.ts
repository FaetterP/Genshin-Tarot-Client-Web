import { combineReducers, configureStore } from "@reduxjs/toolkit";
import players from "./players";
import service from "./service";
import card from "./card";
import burst from "./burst";
import eulaEndTurn from "./eulaEndTurn";
import lang from "./lang";
import stepAnimation from "./stepAnimation";

const rootReducer = combineReducers({
  players,
  service,
  card,
  burst,
  eulaEndTurn,
  lang,
  stepAnimation,
});

export type State = ReturnType<typeof rootReducer>;

export const store = configureStore({ reducer: rootReducer });
