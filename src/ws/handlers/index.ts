import game from "./game";

interface Handlers {
  [key: string]: (payload: any) => void;
}

export function buildHandlers() {
  const handlers: Handlers = {};
  Object.entries(game.handlers).forEach(([key, fun]) => (handlers[`game.${key}`] = fun));
  return handlers;
}
