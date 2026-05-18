import { useSelector } from "react-redux";
import styles from "../PlayerStats/PlayerEffects.module.scss";
import { State } from "../../../redux";
import { EEnemyEffect } from "../../../types/enums";

type PropsType = {
  effects: EEnemyEffect[];
  enemyId: string;
};

const effectsMap: Record<EEnemyEffect, { display: string }> = {
  [EEnemyEffect.Nightrider]: { display: "🌑🦅" },
  [EEnemyEffect.NightriderPlus]: { display: "🌑🦅+" },
};

export default function EnemyEffects({ effects, enemyId }: PropsType) {
  const enemyEffectsLang = useSelector((state: State) => state.lang.enemyEffects);
  const animatingEnemyEffects = useSelector(
    (state: State) => state.stepAnimation.animatingEnemyEffects,
  );
  const myEffectChange = animatingEnemyEffects.find((e) => e.enemyId === enemyId);

  if (!effects.length && !myEffectChange) return null;

  return (
    <div style={{ display: "flex" }}>
      {effects.map((effect) => (
        <div key={effect} className={styles.effect}>
          {effectsMap[effect]?.display ?? effect}
          <span className={styles.tooltip}>
            {enemyEffectsLang[effect].description}
          </span>
        </div>
      ))}
      {myEffectChange && (
        <div className={styles.effectTriggerOverlay} aria-hidden="true">
          {myEffectChange.isAdd ? "+" : "−"}{" "}
          {enemyEffectsLang[myEffectChange.effect]?.description ?? myEffectChange.effect}
        </div>
      )}
    </div>
  );
}
