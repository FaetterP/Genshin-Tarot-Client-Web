import { send } from "..";
import { PlayerPrimitive } from "../../../types/general";
import { store } from "../../redux";
import { setPlayers } from "../../redux/players";
import { setPage } from "../../redux/service";

async function startGame(payload: { taskId: string }) {
  const { taskId } = payload;
  const data = {
    action: "task.completeTask",
    taskId,
  };
  store.dispatch(setPage({ page: "game" }));
  send(data);
}

async function startCycle(payload: {
  cycle: number;
  taskId: string;
  players: PlayerPrimitive[];
}) {
  store.dispatch(setPlayers({ players: payload.players }));
}

export default { handlers: { startGame, startCycle } };
