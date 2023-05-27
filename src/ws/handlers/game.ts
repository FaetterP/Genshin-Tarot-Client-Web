import { send } from "..";
import { EnemyPrimitive, PlayerPrimitive } from "../../../types/general";
import { store } from "../../redux";
import { clearUsedCard } from "../../redux/card";
import { setPlayers, useCard } from "../../redux/players";
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
  you: PlayerPrimitive;
  otherPlayers: PlayerPrimitive[];
}) {
  store.dispatch(
    setPlayers({
      you: payload.you,
      otherPlayers: payload.otherPlayers,
      cycle: payload.cycle,
    })
  );
}

async function useCardHandler(payload: {
  player: PlayerPrimitive;
  card: string;
}) {
  const state = store.getState();

  store.dispatch(
    useCard({
      player: payload.player,
      card: payload.card,
      isMe: payload.player.playerId === state.service.myPlayerId,
    })
  );
  store.dispatch(clearUsedCard(undefined));
}

export default { handlers: { startGame, startCycle, useCard: useCardHandler } };
