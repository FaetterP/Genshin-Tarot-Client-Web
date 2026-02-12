import { send } from "..";
import { PlayerPrimitive } from "../../types/general";
import { store } from "../../redux";
import { clearUsedCard } from "../../redux/card";
import {
  setCycle,
  setLeyline,
  setPlayers,
  useCard as applyCardAction,
  applyPlayerUpdate,
} from "../../redux/players";
import { startStepAnimation } from "../../redux/stepAnimation";
import { setPage } from "../../redux/service";
import { DetailedStep } from "../../types/detailedStep";
import { TaskCompleteTaskRequest } from "../../types/request";
import type {
  AwaitedResponse,
  GameEndTurnResponse,
  GameEndCycleResponse,
} from "../../types/response";

async function startGame(payload: { taskId: string }) {
  const { taskId } = payload;
  store.dispatch(setPage({ page: "game" }));
  send<TaskCompleteTaskRequest>({
    action: "task.completeTask",
    taskId,
  });
}

async function startCycle(payload: {
  cycle: number;
  you: PlayerPrimitive;
  otherPlayers: PlayerPrimitive[];
  leylines: string[];
  steps: DetailedStep[];
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
        },
      }),
    );
    return;
  }
  store.dispatch(setCycle({ cycle: payload.cycle }));
  store.dispatch(setLeyline({ leylines: payload.leylines }));
  store.dispatch(setPlayers({ you: payload.you, otherPlayers: payload.otherPlayers }));
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
      }),
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
    }),
  );
}

async function upgradeCardHandler(payload: {
  cardId: string;
  player: PlayerPrimitive;
  steps?: DetailedStep[];
}) {
  const { cardId, player, steps } = payload;

  if (!steps || steps.length === 0) {
    store.dispatch(applyPlayerUpdate({ player }));
    store.dispatch(clearUsedCard(undefined));
    return;
  }

  store.dispatch(
    startStepAnimation({
      steps,
      afterUpgrade: { player },
    }),
  );
}

async function endTurnHandler(payload: GameEndTurnResponse & { taskId?: string }) {
  const { playerID, steps, taskId } = payload;
  if (steps && steps.length > 0) {
    store.dispatch(
      startStepAnimation({
        steps,
        afterEndTurn: taskId != null ? { taskId } : {},
      }),
    );
    return;
  }
  if (taskId != null) {
    send<TaskCompleteTaskRequest>({
      action: "task.completeTask",
      taskId,
    });
  }
}

async function endCycleHandler(payload: AwaitedResponse<GameEndCycleResponse>) {
  const { steps, taskId } = payload;
  if (steps && steps.length > 0) {
    store.dispatch(
      startStepAnimation({
        steps,
        afterEndCycle: { taskId },
      }),
    );
    return;
  }
  send<TaskCompleteTaskRequest>({
    action: "task.completeTask",
    taskId,
  });
}

export default {
  handlers: {
    startGame,
    startCycle,
    useCard: useCardHandler,
    upgradeCard: upgradeCardHandler,
    endTurn: endTurnHandler,
    endCycle: endCycleHandler,
  },
};
