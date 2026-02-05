import { useDispatch, useSelector } from "react-redux";
import { EnemyPrimitive } from "../../../../types/general";
import { State } from "../../../redux";
import enemyEffectStyles from "../Enemy/Enemy.module.scss";
import styles from "./OtherEnemy.module.scss";
import { selectEnemy } from "../../../redux/card";
import {
  getElementStyleClass,
  getReactionDecorClass,
  getReactionStyle,
  toElementKey,
} from "../../../utils/elementColors";

export default function OtherEnemy(props: EnemyPrimitive) {
  const name =
    useSelector((state: State) => state.lang.enemies.names[props.name]) ||
    `${props.name}.name`;

  const dyingEnemyIds = useSelector(
    (state: State) => state.stepAnimation.dyingEnemyIds
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
  const needEnemies = useSelector((state: State) => state.card.needEnemies);
  const isRange = !!useSelector((state: State) => state.card.isRange);
  const selectedCount = useSelector(
    (state: State) => state.card.enemies
  ).length;

  const isCanSelected = needEnemies && isRange && selectedCount < needEnemies;
  const isSelected = useSelector((state: State) => state.card.enemies).includes(
    props.id
  );
  const isDying = dyingEnemyIds.includes(props.id);
  const isPiercingHit = piercingEnemyIds.includes(props.id);
  const isBlockingHit = blockingEnemyIds.includes(props.id);
  const isElementEffect =
    elementOnEnemy?.enemyId === props.id ? elementOnEnemy.element : null;
  const isReactionEffect =
    reactionOnEnemy?.enemyId === props.id ? reactionOnEnemy : null;

  const elementEffectClass = isElementEffect
    ? getElementStyleClass(isElementEffect, "element_", enemyEffectStyles)
    : "";
  const elementGlowClass = isElementEffect
    ? getElementStyleClass(isElementEffect, "elementGlow_", enemyEffectStyles)
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
          enemyEffectStyles
        )
      : "";

  const dispatch = useDispatch();

  const handleClick = () => {
    if (!isCanSelected) return;
    dispatch(selectEnemy({ enemyId: props.id }));
  };

  return (
    <div
      className={`${styles.enemyWrapper} ${styles.enemy} ${isCanSelected ? styles.canSelected : ""} ${isSelected ? styles.selected : ""} ${isDying ? styles.death : ""} ${isPiercingHit ? enemyEffectStyles.piercingHit : ""} ${isBlockingHit ? enemyEffectStyles.blockHit : ""} ${elementGlowClass}`}
      onClick={handleClick}
    >
      {name}
      {` ${props.hp}♥`}
      {isPiercingHit && (
        <div
          className={enemyEffectStyles.piercingOverlay}
          aria-hidden="true"
        />
      )}
      {isBlockingHit && (
        <div
          className={enemyEffectStyles.blockOverlay}
          aria-hidden="true"
        />
      )}
      {isElementEffect && (
        <div
          className={`${enemyEffectStyles.elementEffect} ${elementEffectClass}`}
          aria-hidden="true"
        />
      )}
      {isReactionEffect && (
        <div
          className={`${enemyEffectStyles.reactionEffect} ${reactionDecorClass}`}
          style={reactionStyle}
          data-element1={toElementKey(isReactionEffect.element1)}
          data-element2={toElementKey(isReactionEffect.element2)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
