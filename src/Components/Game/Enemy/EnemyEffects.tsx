import { useSelector } from "react-redux";
import styles from "../PlayerStats/PlayerEffects.module.scss";
import { State } from "../../../redux";
import { EEnemyEffect } from "../../../types/enums";

type PropsType = {
  effects: EEnemyEffect[];
};

const effectsMap: Record<EEnemyEffect, { display: string }> = {
  [EEnemyEffect.Nightrider]: { display: "🌑🦅" },
  [EEnemyEffect.NightriderPlus]: { display: "🌑🦅+" },
};

export default function EnemyEffects({ effects }: PropsType) {
  const enemyEffectsLang = useSelector((state: State) => state.lang.enemyEffects);

  if (!effects.length) return null;

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
    </div>
  );
}
