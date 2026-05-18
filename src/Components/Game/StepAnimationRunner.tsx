import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State, store } from "../../redux";
import {
  useCard as applyCardAction,
  applyPlayerUpdate,
  applyPlayerHpShieldDelta,
  applyEnemyHpDelta,
  setCycle,
  setHand,
  setLeyline,
  setPlayers,
  removeEnemy,
  addEnemy,
  addElementToEnemy,
} from "../../redux/players";
import { clearUsedCard } from "../../redux/card";
import {
  clearBlockingEnemy,
  clearElementOnEnemy,
  clearPiercingEnemy,
  clearReactionOnEnemy,
  clearStepAnimation,
  removeDyingEnemy,
  setAnimatingAddCard,
  setAnimatingDiscardCards,
  setAnimatingDrawCards,
  setAnimatingUpgradeCard,
  setBlockingEnemy,
  setCardsLeavingDeckForDraw,
  setDyingEnemy,
  setAppearingEnemy,
  removeAppearingEnemy,
  setElementOnEnemy,
  setPiercingEnemy,
  setReactionOnEnemy,
  setEnergyFreezed,
  setAnimatingLeyline,
  setAnimatingEffectTrigger,
  setAnimatingEnemyAttack,
  setAnimatingEnemiesSwap,
  addAnimatingEnemyEffect,
  removeAnimatingEnemyEffect,
  addAnimatingPlayerEffect,
  removeAnimatingPlayerEffect,
} from "../../redux/stepAnimation";
import { send } from "../../ws";
import { TaskCompleteTaskRequest } from "../../types/request";
import { sleep } from "../../utils/sleep";
import { CardPrimitive } from "../../types/general";
import { DetailedStep } from "../../types/detailedStep";
import { EDetailedStep } from "../../types/enums";

const DEATH_ANIMATION_MS = 1500;
const ENEMY_APPEAR_MS = 500;
const CARD_ANIMATION_MS = 2000;
const DECK_EXIT_MS = 350;
const PIERCING_EFFECT_MS = 800;
const BLOCK_EFFECT_MS = 900;
const ELEMENT_EFFECT_MS = 1000;
const REACTION_EFFECT_MS = 1400;
const UPGRADE_CARD_MS = 2200;
const ENERGY_FREEZED_MS = 1200;
const LEYLINE_EFFECT_MS = 2000;
const EFFECT_TRIGGER_MS = 1000;
const EFFECT_CHANGE_MS = 800;
const ENEMY_ATTACK_MS = 2000;
const ENEMY_ATTACK_HIT_MS = 800;
const ENEMIES_SWAP_MS = 1200;
const DEFAULT_STEP_MS = 200;

const PARALLEL_STEP_TYPES = new Set<EDetailedStep>([
  EDetailedStep.EnemyTakeDamage,
  EDetailedStep.EnemyBlockDamage,
  EDetailedStep.EnemyGetElement,
  EDetailedStep.EnemyReaction,
  EDetailedStep.EnemyDeath,
  EDetailedStep.EnemyAppearance,
  EDetailedStep.EnemyEffectTrigger,
  EDetailedStep.EnemyGetEffect,
  EDetailedStep.EnemyLoseEffect,
  EDetailedStep.EnemyHeal,
  EDetailedStep.EnemyChangeShield,
  EDetailedStep.PlayerEffectTrigger,
  EDetailedStep.PlayerGetEffect,
  EDetailedStep.PlayerLoseEffect,
  EDetailedStep.PlayerTakeDamage,
  EDetailedStep.PlayerHeal,
]);

function getStepTarget(step: DetailedStep): string {
  switch (step.type) {
    case EDetailedStep.EnemyTakeDamage:
    case EDetailedStep.EnemyBlockDamage:
    case EDetailedStep.EnemyGetElement:
    case EDetailedStep.EnemyReaction:
    case EDetailedStep.EnemyDeath:
    case EDetailedStep.EnemyEffectTrigger:
    case EDetailedStep.EnemyGetEffect:
    case EDetailedStep.EnemyLoseEffect:
    case EDetailedStep.EnemyHeal:
    case EDetailedStep.EnemyChangeShield:
      return step.enemyId;
    case EDetailedStep.EnemyAppearance:
      return step.enemy.id;
    case EDetailedStep.PlayerEffectTrigger:
    case EDetailedStep.PlayerGetEffect:
    case EDetailedStep.PlayerLoseEffect:
    case EDetailedStep.PlayerTakeDamage:
    case EDetailedStep.PlayerHeal:
      return step.playerId;
    default:
      return "";
  }
}

function groupSteps(steps: DetailedStep[]): DetailedStep[][] {
  const groups: DetailedStep[][] = [];
  let i = 0;
  while (i < steps.length) {
    const step = steps[i];
    if (!PARALLEL_STEP_TYPES.has(step.type)) {
      groups.push([step]);
      i++;
    } else {
      const group: DetailedStep[] = [step];
      const usedTargets = new Set([getStepTarget(step)]);
      i++;
      while (
        i < steps.length &&
        PARALLEL_STEP_TYPES.has(steps[i].type) &&
        !usedTargets.has(getStepTarget(steps[i]))
      ) {
        group.push(steps[i]);
        usedTargets.add(getStepTarget(steps[i]));
        i++;
      }
      groups.push(group);
    }
  }
  return groups;
}

async function processStep(
  step: DetailedStep,
  dispatch: ReturnType<typeof useDispatch>,
  myPlayerId: string,
  discardCards: CardPrimitive[],
  drawCards: CardPrimitive[],
  hasUpgradeForMe: boolean,
): Promise<void> {
  switch (step.type) {
    case EDetailedStep.EnemyDeath: {
      dispatch(setDyingEnemy({ enemyId: step.enemyId }));
      await sleep(DEATH_ANIMATION_MS);
      dispatch(removeDyingEnemy({ enemyId: step.enemyId }));
      dispatch(removeEnemy({ enemyId: step.enemyId }));
      break;
    }
    case EDetailedStep.MoveCard: {
      if (step.playerId === myPlayerId) {
        if (step.to === "discard") {
          discardCards.push(step.card);
        } else if (step.to === "trash") {
          await sleep(DEFAULT_STEP_MS);
        } else if (step.to === "hand" || step.to === "deck") {
          if (!(hasUpgradeForMe && step.to === "hand")) {
            dispatch(setAnimatingAddCard({ card: step.card, to: step.to }));
            await sleep(CARD_ANIMATION_MS);
            dispatch(setAnimatingAddCard(null));
          } else {
            await sleep(DEFAULT_STEP_MS);
          }
        }
      } else {
        await sleep(DEFAULT_STEP_MS);
      }
      break;
    }
    case EDetailedStep.DrawCards: {
      if (step.playerId === myPlayerId && step.cards.length > 0) {
        drawCards.push(...step.cards);
      }
      break;
    }
    case EDetailedStep.EnemyTakeDamage: {
      if (step.damage > 0) {
        dispatch(applyEnemyHpDelta({ enemyId: step.enemyId, delta: -step.damage }));
      }
      if (step.isPiercing && step.damage > 0) {
        dispatch(setPiercingEnemy({ enemyId: step.enemyId }));
        await sleep(PIERCING_EFFECT_MS);
        dispatch(clearPiercingEnemy({ enemyId: step.enemyId }));
      }
      if (step.element) {
        dispatch(setElementOnEnemy({ enemyId: step.enemyId, element: step.element }));
        await sleep(ELEMENT_EFFECT_MS);
        dispatch(clearElementOnEnemy({ enemyId: step.enemyId }));
        dispatch(addElementToEnemy({ enemyId: step.enemyId, element: step.element }));
      }
      if (!step.isPiercing && step.damage <= 0 && !step.element) {
        await sleep(DEFAULT_STEP_MS);
      }
      break;
    }
    case EDetailedStep.EnemyGetElement: {
      dispatch(setElementOnEnemy({ enemyId: step.enemyId, element: step.element }));
      await sleep(ELEMENT_EFFECT_MS);
      dispatch(clearElementOnEnemy({ enemyId: step.enemyId }));
      dispatch(addElementToEnemy({ enemyId: step.enemyId, element: step.element }));
      break;
    }
    case EDetailedStep.EnemyReaction: {
      dispatch(addElementToEnemy({ enemyId: step.enemyId, element: step.element1 }));
      dispatch(addElementToEnemy({ enemyId: step.enemyId, element: step.element2 }));
      dispatch(
        setReactionOnEnemy({
          enemyId: step.enemyId,
          element1: step.element1,
          element2: step.element2,
        }),
      );
      await sleep(REACTION_EFFECT_MS);
      dispatch(clearReactionOnEnemy({ enemyId: step.enemyId }));
      break;
    }
    case EDetailedStep.EnemyBlockDamage: {
      dispatch(setBlockingEnemy({ enemyId: step.enemyId }));
      await sleep(BLOCK_EFFECT_MS);
      dispatch(clearBlockingEnemy({ enemyId: step.enemyId }));
      break;
    }
    case EDetailedStep.EnemyAppearance: {
      dispatch(addEnemy({ playerId: step.playerId, enemy: step.enemy }));
      dispatch(setAppearingEnemy({ enemyId: step.enemy.id }));
      await sleep(ENEMY_APPEAR_MS);
      dispatch(removeAppearingEnemy({ enemyId: step.enemy.id }));
      break;
    }
    case EDetailedStep.UpgradeCard: {
      if (step.playerId === myPlayerId) {
        dispatch(
          setAnimatingUpgradeCard({
            playerId: step.playerId,
            oldCard: step.oldCard,
            newCard: step.newCard,
          }),
        );
        await sleep(UPGRADE_CARD_MS);
        dispatch(setAnimatingUpgradeCard(null));
      } else {
        await sleep(DEFAULT_STEP_MS);
      }
      break;
    }
    case EDetailedStep.EnergyFreezed: {
      if (step.playerId === myPlayerId) {
        dispatch(setEnergyFreezed({ playerId: step.playerId }));
        await sleep(ENERGY_FREEZED_MS);
        dispatch(setEnergyFreezed(null));
      } else {
        await sleep(DEFAULT_STEP_MS);
      }
      break;
    }
    case EDetailedStep.UseLeyline: {
      dispatch(setAnimatingLeyline(step.name));
      await sleep(LEYLINE_EFFECT_MS);
      dispatch(setAnimatingLeyline(null));
      break;
    }
    case EDetailedStep.PlayerEffectTrigger: {
      dispatch(
        setAnimatingEffectTrigger({
          effect: step.effect,
          isRemove: step.isRemove,
          playerId: step.playerId,
        }),
      );
      await sleep(EFFECT_TRIGGER_MS);
      dispatch(setAnimatingEffectTrigger(null));
      break;
    }
    case EDetailedStep.PlayerGetEffect:
    case EDetailedStep.PlayerLoseEffect: {
      const isAdd = step.type === EDetailedStep.PlayerGetEffect;
      dispatch(addAnimatingPlayerEffect({ playerId: step.playerId, effect: step.effect, isAdd }));
      await sleep(EFFECT_CHANGE_MS);
      dispatch(removeAnimatingPlayerEffect({ playerId: step.playerId }));
      break;
    }
    case EDetailedStep.EnemyGetEffect:
    case EDetailedStep.EnemyLoseEffect: {
      const isAdd = step.type === EDetailedStep.EnemyGetEffect;
      dispatch(addAnimatingEnemyEffect({ enemyId: step.enemyId, effect: step.effect, isAdd }));
      await sleep(EFFECT_CHANGE_MS);
      dispatch(removeAnimatingEnemyEffect({ enemyId: step.enemyId }));
      break;
    }
    case EDetailedStep.EnemyAttack: {
      dispatch(
        setAnimatingEnemyAttack({
          enemyId: step.enemyId,
          playerId: step.playerId,
          damage: step.damage,
        }),
      );
      await sleep(ENEMY_ATTACK_HIT_MS);

      if (step.damage > 0) {
        const currentState = store.getState();
        const target =
          currentState.players.me.playerId === step.playerId
            ? currentState.players.me
            : currentState.players.other.find((p) => p.playerId === step.playerId);
        if (target) {
          const shieldAbsorb = Math.min(target.shields, step.damage);
          const hpDamage = step.damage - shieldAbsorb;
          dispatch(
            applyPlayerHpShieldDelta({
              playerId: step.playerId,
              ...(shieldAbsorb > 0 && { shieldDelta: -shieldAbsorb }),
              ...(hpDamage > 0 && { hpDelta: -hpDamage }),
            }),
          );
        }
      }

      await sleep(ENEMY_ATTACK_MS - ENEMY_ATTACK_HIT_MS);
      dispatch(setAnimatingEnemyAttack(null));
      break;
    }
    case EDetailedStep.EnemiesSwap: {
      dispatch(
        setAnimatingEnemiesSwap({
          enemyId1: step.enemyId1,
          enemyId2: step.enemyId2,
        }),
      );
      await sleep(ENEMIES_SWAP_MS);
      dispatch(setAnimatingEnemiesSwap(null));
      break;
    }
    default:
      await sleep(DEFAULT_STEP_MS);
      break;
  }
}

async function runStepAnimations(
  steps: DetailedStep[],
  dispatch: ReturnType<typeof useDispatch>,
  myPlayerId: string,
): Promise<void> {
  const discardCards: CardPrimitive[] = [];
  const drawCards: CardPrimitive[] = [];
  const hasUpgradeForMe = steps.some((s) => s.type === EDetailedStep.UpgradeCard && s.playerId === myPlayerId);

  const groups = groupSteps(steps);
  for (const group of groups) {
    await Promise.all(
      group.map((step) => processStep(step, dispatch, myPlayerId, discardCards, drawCards, hasUpgradeForMe)),
    );
  }

  if (discardCards.length > 0) {
    const state = store.getState();
    const me = state.players.me;
    const discardIds = new Set(discardCards.map((c) => c.cardId));
    dispatch(setHand({ cards: me.hand.filter((c) => !discardIds.has(c.cardId)) }));
    dispatch(setAnimatingDiscardCards(discardCards));
    await sleep(CARD_ANIMATION_MS);
    dispatch(setAnimatingDiscardCards(null));
  }
  if (drawCards.length > 0) {
    dispatch(setCardsLeavingDeckForDraw(drawCards));
    await sleep(DECK_EXIT_MS);
    dispatch(setAnimatingDrawCards(drawCards));
    await sleep(CARD_ANIMATION_MS);
    dispatch(setAnimatingDrawCards(null));
  }
}

export default function StepAnimationRunner() {
  const dispatch = useDispatch();
  const steps = useSelector((state: State) => state.stepAnimation.steps);
  const finalPayload = useSelector((state: State) => state.stepAnimation.finalPayload);
  const afterCyclePayload = useSelector((state: State) => state.stepAnimation.afterCyclePayload);
  const afterEndTurnPayload = useSelector(
    (state: State) => state.stepAnimation.afterEndTurnPayload,
  );
  const afterEndCyclePayload = useSelector(
    (state: State) => state.stepAnimation.afterEndCyclePayload,
  );
  const afterUpgradePayload = useSelector(
    (state: State) => state.stepAnimation.afterUpgradePayload,
  );
  const runningRef = useRef(false);

  const hasCompletion =
    finalPayload ||
    afterCyclePayload ||
    afterEndTurnPayload ||
    afterEndCyclePayload ||
    afterUpgradePayload;

  useEffect(() => {
    if (steps.length === 0 || !hasCompletion || runningRef.current) {
      return;
    }

    runningRef.current = true;
    const myPlayerId = store.getState().service.myPlayerId;

    (async () => {
      await runStepAnimations(steps, dispatch, myPlayerId);

      if (finalPayload) {
        store.dispatch(
          applyCardAction({
            player: finalPayload.player,
            card: finalPayload.card,
            isMe: finalPayload.isMe,
          }),
        );
        store.dispatch(clearUsedCard(undefined));
      } else if (afterCyclePayload) {
        store.dispatch(setCycle({ cycle: afterCyclePayload.cycle }));
        store.dispatch(setLeyline({ leylines: afterCyclePayload.leylines }));
        store.dispatch(
          setPlayers({
            you: afterCyclePayload.you,
            otherPlayers: afterCyclePayload.otherPlayers,
          }),
        );
      } else if (afterEndTurnPayload) {
        if (afterEndTurnPayload.taskId) {
          send<TaskCompleteTaskRequest>({
            action: "task.completeTask",
            taskId: afterEndTurnPayload.taskId,
          });
        }
      } else if (afterEndCyclePayload) {
        send<TaskCompleteTaskRequest>({
          action: "task.completeTask",
          taskId: afterEndCyclePayload.taskId,
        });
      } else if (afterUpgradePayload) {
        store.dispatch(applyPlayerUpdate({ player: afterUpgradePayload.player }));
        store.dispatch(clearUsedCard(undefined));
      }

      setTimeout(() => {
        store.dispatch(clearStepAnimation());
        runningRef.current = false;
      }, 0);
    })();
  }, [
    steps,
    finalPayload,
    afterCyclePayload,
    afterEndTurnPayload,
    afterEndCyclePayload,
    afterUpgradePayload,
    hasCompletion,
    dispatch,
  ]);

  return null;
}
