import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State, store } from "../../redux";
import { showEffects } from "../../redux/effects";
import {
  useCard as applyCardAction,
  setCycle,
  setLeyline,
  setPlayers,
} from "../../redux/players";
import { clearUsedCard } from "../../redux/card";
import {
  clearBlockingEnemy,
  clearPiercingEnemy,
  clearStepAnimation,
  removeDyingEnemy,
  setAnimatingAddCard,
  setAnimatingDiscardCards,
  setAnimatingDrawCards,
  setBlockingEnemy,
  setDyingEnemy,
  setElementOnEnemy,
  setPiercingEnemy,
  setReactionOnEnemy,
} from "../../redux/stepAnimation";
import { sleep } from "../../utils/sleep";
import { CardPrimitive, DetailedStep } from "../../../types/general";

const DEATH_ANIMATION_MS = 1500;
const CARD_ANIMATION_MS = 2000;
const PIERCING_EFFECT_MS = 800;
const BLOCK_EFFECT_MS = 900;
const ELEMENT_EFFECT_MS = 1000;
const REACTION_EFFECT_MS = 1400;
const DEFAULT_STEP_MS = 200;

async function runStepAnimations(
  steps: DetailedStep[],
  dispatch: ReturnType<typeof useDispatch>,
  myPlayerId: string
): Promise<void> {
  const discardCards: CardPrimitive[] = [];
  const drawCards: CardPrimitive[] = [];

  for (const step of steps) {
    switch (step.type) {
      case "enemy_death": {
        dispatch(setDyingEnemy({ enemyId: step.enemyId }));
        await sleep(DEATH_ANIMATION_MS);
        dispatch(removeDyingEnemy({ enemyId: step.enemyId }));
        break;
      }
      case "discard_card": {
        if (step.playerId === myPlayerId) {
          discardCards.push(step.card);
        }
        break;
      }
      case "draw_cards": {
        if (step.playerId === myPlayerId && step.cards.length > 0) {
          drawCards.push(...step.cards);
        }
        break;
      }
      case "add_card": {
        if (step.playerId === myPlayerId) {
          dispatch(setAnimatingAddCard({ card: step.card, to: step.to }));
          await sleep(CARD_ANIMATION_MS);
          dispatch(setAnimatingAddCard(null));
        } else {
          await sleep(DEFAULT_STEP_MS);
        }
        break;
      }
      case "enemy_take_damage": {
        if (step.isPiercing && step.damage > 0) {
          dispatch(setPiercingEnemy({ enemyId: step.enemyId }));
          await sleep(PIERCING_EFFECT_MS);
          dispatch(clearPiercingEnemy({ enemyId: step.enemyId }));
        }
        if (step.element) {
          dispatch(
            setElementOnEnemy({ enemyId: step.enemyId, element: step.element })
          );
          await sleep(ELEMENT_EFFECT_MS);
          dispatch(setElementOnEnemy(null));
        }
        if (
          !step.isPiercing &&
          step.damage <= 0 &&
          !step.element
        ) {
          await sleep(DEFAULT_STEP_MS);
        }
        break;
      }
      case "enemy_get_element": {
        dispatch(
          setElementOnEnemy({ enemyId: step.enemyId, element: step.element })
        );
        await sleep(ELEMENT_EFFECT_MS);
        dispatch(setElementOnEnemy(null));
        break;
      }
      case "enemy_reaction": {
        dispatch(
          setReactionOnEnemy({
            enemyId: step.enemyId,
            element1: step.element1,
            element2: step.element2,
          })
        );
        await sleep(REACTION_EFFECT_MS);
        dispatch(setReactionOnEnemy(null));
        break;
      }
      case "enemy_block_damage": {
        dispatch(setBlockingEnemy({ enemyId: step.enemyId }));
        await sleep(BLOCK_EFFECT_MS);
        dispatch(clearBlockingEnemy({ enemyId: step.enemyId }));
        break;
      }
      default:
        await sleep(DEFAULT_STEP_MS);
        break;
    }
  }

  if (discardCards.length > 0) {
    dispatch(setAnimatingDiscardCards(discardCards));
    await sleep(CARD_ANIMATION_MS);
    dispatch(setAnimatingDiscardCards(null));
  }
  if (drawCards.length > 0) {
    dispatch(setAnimatingDrawCards(drawCards));
    await sleep(CARD_ANIMATION_MS);
    dispatch(setAnimatingDrawCards(null));
  }
}

export default function StepAnimationRunner() {
  const dispatch = useDispatch();
  const steps = useSelector((state: State) => state.stepAnimation.steps);
  const finalPayload = useSelector(
    (state: State) => state.stepAnimation.finalPayload
  );
  const afterCyclePayload = useSelector(
    (state: State) => state.stepAnimation.afterCyclePayload
  );
  const afterEndTurnPayload = useSelector(
    (state: State) => state.stepAnimation.afterEndTurnPayload
  );
  const runningRef = useRef(false);

  const hasCompletion =
    finalPayload || afterCyclePayload || afterEndTurnPayload;

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
          })
        );
        store.dispatch(clearUsedCard(undefined));
      } else if (afterCyclePayload) {
        store.dispatch(setCycle({ cycle: afterCyclePayload.cycle }));
        store.dispatch(setLeyline({ leylines: afterCyclePayload.leylines }));
        store.dispatch(showEffects({ reports: afterCyclePayload.report }));
        store.dispatch(
          setPlayers({
            you: afterCyclePayload.you,
            otherPlayers: afterCyclePayload.otherPlayers,
          })
        );
      } else if (afterEndTurnPayload) {
        store.dispatch(
          showEffects({
            reports: afterEndTurnPayload.report,
            taskId: afterEndTurnPayload.taskId,
          })
        );
      }

      store.dispatch(clearStepAnimation());
      runningRef.current = false;
    })();
  }, [
    steps,
    finalPayload,
    afterCyclePayload,
    afterEndTurnPayload,
    hasCompletion,
    dispatch,
  ]);

  return null;
}
