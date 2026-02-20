import game from "./game";
import ws from "./ws";
import characters from "./characters";
import admin from "./admin";

interface Handlers {
  [key: string]: (payload: any) => void;
}

export function buildHandlers() {
  const handlers: Handlers = {};
  Object.entries(game.handlers).forEach(([key, fun]) => (handlers[`game.${key}`] = fun));
  Object.entries(ws.handlers).forEach(([key, fun]) => (handlers[`ws.${key}`] = fun));
  Object.entries(characters.handlers).forEach(
    ([key, fun]) => (handlers[`characters.${key}`] = fun),
  );
  Object.entries(admin.handlers).forEach(([key, fun]) => (handlers[`admin.${key}`] = fun));
  return handlers;
}
