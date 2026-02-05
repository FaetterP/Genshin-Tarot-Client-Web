import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EnemyPrimitive } from "../../../../types/general";
import styles from "./Enemy.module.scss";
import { State, store } from "../../../redux";
import { selectEnemy } from "../../../redux/card";
import { toggleBurstEnemy } from "../../../redux/burst";
import { burstsRequire } from "../../../storage/characters/burstsRequire";
import EnemyCard from "./EnemyCard";
import { sleep } from "../../../utils/sleep";
import { finishEffect } from "../../../redux/effects";
import {
  getElementStyleClass,
  getReactionDecorClass,
  getReactionStyle,
  toElementKey,
} from "../../../utils/elementColors";

export default function Enemy(props: EnemyPrimitive) {
  const myId = useSelector((state: State) => state.players.me.playerId);
  const enemyAttack = useSelector((state: State) => state.effects.enemyAttack);
  const counter = useSelector((state: State) => state.effects.counter);

  useEffect(() => {
    (async () => {
      if (!enemyAttack.isShown) return;
      if (enemyAttack.player === myId && enemyAttack.enemy === props.id) {
        await sleep(2000);
      }

      store.dispatch(finishEffect());
    })();
  }, [...Object.values(enemyAttack), counter]);

  const dispatch = useDispatch();

  const dyingEnemyIds = useSelector(
    (state: State) => state.stepAnimation.dyingEnemyIds
  );
  const appearingEnemyIds = useSelector(
    (state: State) => state.stepAnimation.appearingEnemyIds
  );
  const piercingEnemyIds = useSelector(
    (state: State) => state.stepAnimation.piercingEnemyIds
  );
  const blockingEnemyIds = useSelector(
    (state: State) => state.stepAnimation.blockingEnemyIds
  );
  const elementOnEnemy = useSelector(
    (state: State) => state.stepAnimation.elementOnEnemy
  );
  const reactionOnEnemy = useSelector(
    (state: State) => state.stepAnimation.reactionOnEnemy
  );
  const burstCharacter = useSelector((state: State) => state.burst.character);
  const burstRequire = burstCharacter ? burstsRequire[burstCharacter] : null;
  const isBurstEnemyMode =
    !!burstCharacter && (burstRequire?.needEnemies ?? 0) > 0;

  const cardNeedEnemies = useSelector((state: State) => state.card.needEnemies);
  const cardEnemies = useSelector((state: State) => state.card.enemies);
  const burstEnemies = useSelector((state: State) => state.burst.enemies);
  const needEnemies = isBurstEnemyMode
    ? (burstRequire?.needEnemies ?? 0)
    : cardNeedEnemies;
  const selectedEnemies = isBurstEnemyMode
    ? burstEnemies.length
    : cardEnemies.length;
  const selectedList = isBurstEnemyMode ? burstEnemies : cardEnemies;

  const isCanSelected = needEnemies && selectedEnemies < needEnemies;
  const isSelected = selectedList.includes(props.id);
  const isDying = dyingEnemyIds.includes(props.id);
  const isAppearing = appearingEnemyIds.includes(props.id);
  const isPiercingHit = piercingEnemyIds.includes(props.id);
  const isBlockingHit = blockingEnemyIds.includes(props.id);
  const isElementEffect =
    elementOnEnemy?.enemyId === props.id ? elementOnEnemy.element : null;
  const isReactionEffect =
    reactionOnEnemy?.enemyId === props.id ? reactionOnEnemy : null;

  const elementEffectClass = isElementEffect
    ? getElementStyleClass(isElementEffect, "element_", styles)
    : "";
  const elementGlowClass = isElementEffect
    ? getElementStyleClass(isElementEffect, "elementGlow_", styles)
    : "";

  const reactionStyle =
    isReactionEffect?.element1 && isReactionEffect?.element2
      ? getReactionStyle(isReactionEffect.element1, isReactionEffect.element2)
      : undefined;

  const reactionDecorClass =
    isReactionEffect?.element1 && isReactionEffect?.element2
      ? getReactionDecorClass(
          isReactionEffect.element1,
          isReactionEffect.element2,
          styles
        )
      : "";

  const handleClick = () => {
    if (!isCanSelected) return;
    if (isBurstEnemyMode) {
      dispatch(toggleBurstEnemy({ enemyId: props.id }));
    } else {
      dispatch(selectEnemy({ enemyId: props.id }));
    }
  };

  const attackClass =
    enemyAttack.isShown && enemyAttack.enemy === props.id
      ? styles.attackEffect
      : "";
  const canSelectClass = isCanSelected ? styles.canSelected : "";
  const selectedClass = isSelected ? styles.selected : "";

  return (
    <div
      className={`${styles.enemyWrapper} ${isAppearing ? styles.appearing : ""}`}
      onClick={handleClick}
    >
      <div
        className={`${canSelectClass} ${selectedClass} ${attackClass} ${isDying ? styles.death : ""} ${isPiercingHit ? styles.piercingHit : ""} ${isBlockingHit ? styles.blockHit : ""} ${elementGlowClass}`}
      >
        <EnemyCard {...props} />
      </div>
      {isPiercingHit && (
        <div className={styles.piercingOverlay} aria-hidden="true" />
      )}
      {isBlockingHit && (
        <div className={styles.blockOverlay} aria-hidden="true" />
      )}
      {isElementEffect && (
        <div
          className={`${styles.elementEffect} ${elementEffectClass}`}
          aria-hidden="true"
        />
      )}
      {isReactionEffect && (
        <div
          className={`${styles.reactionEffect} ${reactionDecorClass}`}
          style={reactionStyle}
          data-element1={toElementKey(isReactionEffect.element1)}
          data-element2={toElementKey(isReactionEffect.element2)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
