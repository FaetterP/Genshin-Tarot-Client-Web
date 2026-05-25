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
import { setBoss, setDragonBreathTask, setBossPassiveTask } from "../../redux/boss";
import { DetailedStep } from "../../types/detailedStep";
import { TaskCompleteTaskRequest } from "../../types/request";
import type { ELeyline } from "../../types/enums";
import type { BossPrimitive, CardPrimitive } from "../../types/general";
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
  leylines: ELeyline[];
  steps: DetailedStep[];
  boss: BossPrimitive | null;
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
          boss: payload.boss,
        },
      }),
    );
    return;
  }
  store.dispatch(setCycle({ cycle: payload.cycle }));
  store.dispatch(setLeyline({ leylines: payload.leylines }));
  store.dispatch(setPlayers({ you: payload.you, otherPlayers: payload.otherPlayers }));
  store.dispatch(setBoss(payload.boss));
}

async function useCardHandler(payload: {
  player: PlayerPrimitive;
  card: string;
  steps: DetailedStep[];
  boss: BossPrimitive | null;
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
    store.dispatch(setBoss(payload.boss));
    store.dispatch(clearUsedCard(undefined));
    return;
  }

  store.dispatch(
    startStepAnimation({
      steps: payload.steps,
      player: payload.player,
      card: payload.card,
      isMe,
      boss: payload.boss,
    }),
  );
}

async function upgradeCardHandler(payload: {
  cardId: string;
  player: PlayerPrimitive;
  steps?: DetailedStep[];
  boss: BossPrimitive | null;
}) {
  const { cardId, player, steps, boss } = payload;

  if (!steps || steps.length === 0) {
    store.dispatch(applyPlayerUpdate({ player }));
    store.dispatch(setBoss(boss));
    store.dispatch(clearUsedCard(undefined));
    return;
  }

  store.dispatch(
    startStepAnimation({
      steps,
      afterUpgrade: { player, boss },
    }),
  );
}

async function useBurstHandler(payload: {
  character: string;
  player: PlayerPrimitive;
  steps: DetailedStep[];
  boss: BossPrimitive | null;
}) {
  const state = store.getState();
  const isMe = payload.player.playerId === state.service.myPlayerId;

  if (payload.steps.length === 0) {
    store.dispatch(applyPlayerUpdate({ player: payload.player }));
    store.dispatch(setBoss(payload.boss));
    store.dispatch(clearUsedCard(undefined));
    return;
  }

  store.dispatch(
    startStepAnimation({
      steps: payload.steps,
      player: payload.player,
      card: payload.character,
      isMe,
      boss: payload.boss,
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

async function dragonBreathHandler(payload: { taskId: string; bossId: string }) {
  store.dispatch(setDragonBreathTask({ taskId: payload.taskId, bossId: payload.bossId }));
}

async function bossPassiveHandler(payload: { taskId: string; hand: CardPrimitive[] }) {
  store.dispatch(setBossPassiveTask({ taskId: payload.taskId, hand: payload.hand }));
}

export default {
  handlers: {
    startGame,
    startCycle,
    useCard: useCardHandler,
    upgradeCard: upgradeCardHandler,
    useBurst: useBurstHandler,
    endTurn: endTurnHandler,
    endCycle: endCycleHandler,
    dragonBreath: dragonBreathHandler,
    bossPassive: bossPassiveHandler,
  },
};
