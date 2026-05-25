import { useSelector, useDispatch } from "react-redux";
import { State } from "../../../redux";
import styles from "./Boss.module.scss";
import {
  getElementStyleClass,
  getReactionDecorClass,
  getReactionStyle,
  toElementKey,
} from "../../../utils/elementColors";
import ChangeableStat from "../../ChangeableStat/ChangeableStat";
import { selectEnemy } from "../../../redux/card";
import { toggleBurstEnemy } from "../../../redux/burst";
import { addEulaEndTurnTarget } from "../../../redux/eulaEndTurn";
import { burstsRequire } from "../../../storage/characters/burstsRequire";

export default function Boss() {
  const dispatch = useDispatch();
  const boss = useSelector((state: State) => state.boss.boss);
  const t = useSelector((state: State) => state.lang.service);
  const enemyNames = useSelector((state: State) => state.lang.enemies.names);
  const elementNames = useSelector((state: State) => state.lang.elements);
  const animatingEnemyAttack = useSelector(
    (state: State) => state.stepAnimation.animatingEnemyAttack,
  );
  const animatingBossAppearance = useSelector(
    (state: State) => state.stepAnimation.animatingBossAppearance,
  );
  const animatingBossReset = useSelector(
    (state: State) => state.stepAnimation.animatingBossReset,
  );
  const animatingBossAnemoImmunity = useSelector(
    (state: State) => state.stepAnimation.animatingBossAnemoImmunity,
  );
  const piercingEnemyIds = useSelector((state: State) => state.stepAnimation.piercingEnemyIds);
  const blockingEnemyIds = useSelector((state: State) => state.stepAnimation.blockingEnemyIds);
  const elementOnEnemies = useSelector((state: State) => state.stepAnimation.elementOnEnemies);
  const reactionsOnEnemies = useSelector((state: State) => state.stepAnimation.reactionsOnEnemies);

  const burstCharacter = useSelector((state: State) => state.burst.character);
  const burstRequire = burstCharacter ? burstsRequire[burstCharacter] : null;
  const isBurstEnemyMode = !!burstCharacter && (burstRequire?.needEnemies ?? 0) > 0;
  const burstEnemies = useSelector((state: State) => state.burst.enemies);

  const eulaEndTurnActive = useSelector((state: State) => state.eulaEndTurn.active);
  const eulaTargets = useSelector((state: State) => state.eulaEndTurn.targets);
  const eulaSnowflakes = useSelector((state: State) => state.players.me.eulaSnowflakes ?? 0);
  const isEulaEndTurnMode = eulaEndTurnActive && eulaTargets.length < eulaSnowflakes;

  const cardNeedEnemies = useSelector((state: State) => state.card.needEnemies);
  const cardNeedEnemiesMax = useSelector((state: State) => state.card.needEnemiesMax);
  const cardEnemies = useSelector((state: State) => state.card.enemies);
  const needEnemies = isBurstEnemyMode ? (burstRequire?.needEnemies ?? 0) : cardNeedEnemies;
  const needEnemiesMax = isBurstEnemyMode ? 0 : cardNeedEnemiesMax;
  const selectedEnemies = isBurstEnemyMode ? burstEnemies.length : cardEnemies.length;
  const selectedList = isBurstEnemyMode ? burstEnemies : cardEnemies;
  const maxToSelect = needEnemiesMax || needEnemies;

  const isCanSelected = isEulaEndTurnMode || (needEnemies > 0 && selectedEnemies < maxToSelect);
  const isSelected = isEulaEndTurnMode ? false : boss ? selectedList.includes(boss.id) : false;

  if (!boss) return null;

  const isPiercingHit = piercingEnemyIds.includes(boss.id);
  const isBlockingHit = blockingEnemyIds.includes(boss.id);
  const isEnemyAttackShown = animatingEnemyAttack?.enemyId === boss.id;
  const isElementEffect = elementOnEnemies.find((e) => e.enemyId === boss.id)?.element ?? null;
  const isReactionEffect = reactionsOnEnemies.find((e) => e.enemyId === boss.id) ?? null;

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

  const lives = Array.from({ length: boss.lives });

  function handleClick() {
    if (!isCanSelected || !boss) return;
    if (isEulaEndTurnMode) {
      dispatch(addEulaEndTurnTarget({ enemyId: boss.id }));
    } else if (isBurstEnemyMode) {
      dispatch(toggleBurstEnemy({ enemyId: boss.id }));
    } else {
      dispatch(selectEnemy({ enemyId: boss.id }));
    }
  }

  return (
    <>
      {animatingBossAppearance && <div className={styles.appearanceOverlay} />}
      {animatingBossReset && <div className={styles.resetOverlay} />}

      <div
        className={`
          ${styles.bossWrapper}
          ${isCanSelected ? styles.canSelected : ""}
          ${isSelected ? styles.selected : ""}
          ${animatingBossAppearance ? styles.appearing : ""}
          ${animatingBossReset ? styles.resetting : ""}
          ${animatingBossAnemoImmunity ? styles.anemoImmune : ""}
          ${isPiercingHit ? styles.piercingHit : ""}
          ${isBlockingHit ? styles.blockHit : ""}
          ${isEnemyAttackShown ? styles.attackEffect : ""}
          ${elementGlowClass}
        `}
        onClick={handleClick}
      >
        <div className={styles.bossCard}>
          <div className={styles.titleRow}>
            <span className={styles.subtitle}>{t.bossSubtitle}</span>
            <span className={styles.anemoTag}>{t.bossAnemoImmune}</span>
          </div>
          <div className={styles.nameRow}>
            <span className={styles.name}>{(enemyNames[boss.name] ?? boss.name).toUpperCase()}</span>
            {boss.isStunned && <span className={styles.stunnedBadge}>💫 {t.bossStunned}</span>}
          </div>

          <div className={styles.statsRow}>
            <div className={styles.hpSection}>
              <div className={styles.hpLabel}>HP</div>
              <div className={styles.hpBar}>
                <div
                  className={styles.hpFill}
                  style={{ width: `${Math.max(0, (boss.hp / (boss.hp + 5)) * 100)}%` }}
                />
                <span className={styles.hpText}>
                  <ChangeableStat value={boss.hp}>{boss.hp}</ChangeableStat>
                </span>
              </div>
            </div>

            <div className={styles.shieldSection}>
              {Array.from({ length: boss.shield }).map((_, i) => (
                <span key={i} className={styles.shieldOrb}>🛡</span>
              ))}
              {boss.shield === 0 && <span className={styles.noShield}>—</span>}
            </div>
          </div>

          <div className={styles.livesRow}>
            <span className={styles.livesLabel}>{t.bossLivesLabel}</span>
            {lives.map((_, i) => (
              <span key={i} className={styles.lifeOrb}>♦</span>
            ))}
          </div>

          {boss.elements.length > 0 && (
            <div className={styles.elementsRow}>
              {boss.elements.map((el) => (
                <span key={el} className={`${styles.elementBadge} ${styles[toElementKey(el)]}`}>
                  {elementNames[toElementKey(el)] ?? el}
                </span>
              ))}
            </div>
          )}

          <div className={styles.passivesRow}>
            <span className={styles.passive}>{t.bossPassiveName}</span>
          </div>

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
          {isPiercingHit && <div className={styles.piercingOverlay} />}
          {isBlockingHit && <div className={styles.blockOverlay} />}
          {animatingBossAnemoImmunity && <div className={styles.anemoImmunityEffect} />}
        </div>

        <div className={styles.dragonSilhouette} aria-hidden="true" />
      </div>
    </>
  );
}
