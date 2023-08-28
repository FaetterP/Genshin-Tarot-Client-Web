import { send } from "..";
import {
  PlayerPrimitive,
  ReportEffect,
} from "../../../types/general";
import { store } from "../../redux";
import { clearUsedCard } from "../../redux/card";
import { showEffects } from "../../redux/effects";
import { setCycle, setLeyline, setPlayers, useCard } from "../../redux/players";
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
  you: PlayerPrimitive;
  otherPlayers: PlayerPrimitive[];
  leylines: string[];
  report: ReportEffect[];
}) {
  store.dispatch(setCycle({ cycle: payload.cycle }));
  store.dispatch(setLeyline({ leylines: payload.leylines }));

  store.dispatch(showEffects({ reports: payload.report }));
  store.dispatch(
    setPlayers({ you: payload.you, otherPlayers: payload.otherPlayers })
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

async function endTurnReport(payload: {
  taskId: string;
  report: ReportEffect[];
}) {
  store.dispatch(
    showEffects({ reports: payload.report, taskId: payload.taskId })
  );
}

export default {
  handlers: { startGame, startCycle, useCard: useCardHandler, endTurnReport },
};
