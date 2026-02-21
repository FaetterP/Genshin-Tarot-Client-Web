import { useDispatch, useSelector } from "react-redux";
import { EnemyPrimitive } from "../../../types/general";
import styles from "./Enemy.module.scss";
import { State } from "../../../redux";
import { selectEnemy } from "../../../redux/card";
import { toggleBurstEnemy } from "../../../redux/burst";
import { addEulaEndTurnTarget } from "../../../redux/eulaEndTurn";
import { burstsRequire } from "../../../storage/characters/burstsRequire";
import EnemyCard from "./EnemyCard";
import {
  getElementStyleClass,
  getReactionDecorClass,
  getReactionStyle,
  toElementKey,
} from "../../../utils/elementColors";

export default function Enemy(props: EnemyPrimitive) {
  const dispatch = useDispatch();
  const animatingEnemyAttack = useSelector(
    (state: State) => state.stepAnimation.animatingEnemyAttack,
  );
  const animatingEnemiesSwap = useSelector(
    (state: State) => state.stepAnimation.animatingEnemiesSwap,
  );
  const isEnemyAttackShown = animatingEnemyAttack?.enemyId === props.id;
  const isEnemySwapShown =
    animatingEnemiesSwap?.enemyId1 === props.id || animatingEnemiesSwap?.enemyId2 === props.id;

  const dyingEnemyIds = useSelector((state: State) => state.stepAnimation.dyingEnemyIds);
  const appearingEnemyIds = useSelector((state: State) => state.stepAnimation.appearingEnemyIds);
  const piercingEnemyIds = useSelector((state: State) => state.stepAnimation.piercingEnemyIds);
  const blockingEnemyIds = useSelector((state: State) => state.stepAnimation.blockingEnemyIds);
  const elementOnEnemy = useSelector((state: State) => state.stepAnimation.elementOnEnemy);
  const reactionOnEnemy = useSelector((state: State) => state.stepAnimation.reactionOnEnemy);
  const burstCharacter = useSelector((state: State) => state.burst.character);
  const burstRequire = burstCharacter ? burstsRequire[burstCharacter] : null;
  const isBurstEnemyMode = !!burstCharacter && (burstRequire?.needEnemies ?? 0) > 0;

  const eulaEndTurnActive = useSelector((state: State) => state.eulaEndTurn.active);
  const eulaTargets = useSelector((state: State) => state.eulaEndTurn.targets);
  const eulaSnowflakes = useSelector((state: State) => state.players.me.eulaSnowflakes ?? 0);
  const isEulaEndTurnMode = eulaEndTurnActive && eulaTargets.length < eulaSnowflakes;

  const cardNeedEnemies = useSelector((state: State) => state.card.needEnemies);
  const cardNeedEnemiesMax = useSelector((state: State) => state.card.needEnemiesMax);
  const cardEnemies = useSelector((state: State) => state.card.enemies);
  const burstEnemies = useSelector((state: State) => state.burst.enemies);
  const needEnemies = isBurstEnemyMode ? (burstRequire?.needEnemies ?? 0) : cardNeedEnemies;
  const needEnemiesMax = isBurstEnemyMode ? 0 : cardNeedEnemiesMax;
  const selectedEnemies = isBurstEnemyMode ? burstEnemies.length : cardEnemies.length;
  const selectedList = isBurstEnemyMode ? burstEnemies : cardEnemies;
  const maxToSelect = needEnemiesMax || needEnemies;

  const isCanSelected =
    isEulaEndTurnMode || (needEnemies && selectedEnemies < maxToSelect);
  const isSelected = isEulaEndTurnMode ? false : selectedList.includes(props.id);
  const isDying = dyingEnemyIds.includes(props.id);
  const isAppearing = appearingEnemyIds.includes(props.id);
  const isPiercingHit = piercingEnemyIds.includes(props.id);
  const isBlockingHit = blockingEnemyIds.includes(props.id);
  const isElementEffect = elementOnEnemy?.enemyId === props.id ? elementOnEnemy.element : null;
  const isReactionEffect = reactionOnEnemy?.enemyId === props.id ? reactionOnEnemy : null;

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
      ? getReactionDecorClass(isReactionEffect.element1, isReactionEffect.element2, styles)
      : "";

  const handleClick = () => {
    if (!isCanSelected) return;
    if (isEulaEndTurnMode) {
      dispatch(addEulaEndTurnTarget({ enemyId: props.id }));
    } else if (isBurstEnemyMode) {
      dispatch(toggleBurstEnemy({ enemyId: props.id }));
    } else {
      dispatch(selectEnemy({ enemyId: props.id }));
    }
  };

  const attackClass = isEnemyAttackShown ? styles.attackEffect : "";
  const swapClass = isEnemySwapShown ? styles.swapEffect : "";
  const canSelectClass = isCanSelected ? styles.canSelected : "";
  const selectedClass = isSelected ? styles.selected : "";

  return (
    <div
      className={`${styles.enemyWrapper} ${isAppearing ? styles.appearing : ""}`}
      onClick={handleClick}
    >
      <div
        className={`${canSelectClass} ${selectedClass} ${attackClass} ${swapClass} ${isDying ? styles.death : ""} ${isPiercingHit ? styles.piercingHit : ""} ${isBlockingHit ? styles.blockHit : ""} ${elementGlowClass}`}
      >
        <EnemyCard {...props} />
      </div>
      {isPiercingHit && <div className={styles.piercingOverlay} aria-hidden="true" />}
      {isBlockingHit && <div className={styles.blockOverlay} aria-hidden="true" />}
      {isElementEffect && (
        <div className={`${styles.elementEffect} ${elementEffectClass}`} aria-hidden="true" />
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
