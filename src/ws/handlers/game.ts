import { send } from "..";
import {
  DetailedStep,
  PlayerPrimitive,
  ReportEffect,
} from "../../../types/general";
import { store } from "../../redux";
import { clearUsedCard } from "../../redux/card";
import { showEffects } from "../../redux/effects";
import {
  setCycle,
  setLeyline,
  setPlayers,
  useCard as applyCardAction,
} from "../../redux/players";
import { startStepAnimation } from "../../redux/stepAnimation";
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
  steps?: DetailedStep[];
}) {
  if (payload.steps && payload.steps.length > 0) {
    store.dispatch(
      startStepAnimation({
        steps: payload.steps,
        afterCycle: {
          cycle: payload.cycle,
          you: payload.you,
          otherPlayers: payload.otherPlayers,
          leylines: payload.leylines,
          report: payload.report,
        },
      })
    );
    return;
  }
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
  steps: DetailedStep[];
}) {
  const state = store.getState();
  const isMe = payload.player.playerId === state.service.myPlayerId;

  if (payload.steps.length === 0) {
    store.dispatch(
      applyCardAction({
        player: payload.player,
        card: payload.card,
        isMe,
      })
    );
    store.dispatch(clearUsedCard(undefined));
    return;
  }

  store.dispatch(
    startStepAnimation({
      steps: payload.steps,
      player: payload.player,
      card: payload.card,
      isMe,
    })
  );
}

async function endTurnReport(payload: {
  taskId: string;
  report: ReportEffect[];
  steps?: DetailedStep[];
}) {
  if (payload.steps && payload.steps.length > 0) {
    store.dispatch(
      startStepAnimation({
        steps: payload.steps,
        afterEndTurn: {
          taskId: payload.taskId,
          report: payload.report,
        },
      })
    );
    return;
  }
  store.dispatch(
    showEffects({ reports: payload.report, taskId: payload.taskId })
  );
}

export default {
  handlers: { startGame, startCycle, useCard: useCardHandler, endTurnReport },
};
