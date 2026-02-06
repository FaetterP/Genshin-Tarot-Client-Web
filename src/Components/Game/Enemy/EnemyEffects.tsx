import { useSelector } from "react-redux";
import styles from "../PlayerStats/PlayerEffects.module.scss";
import { State } from "../../../redux";

type PropsType = {
  effects: string[];
};

const effectsMap: Record<string, { display: string }> = {
  Nightrider: { display: "🌑🦅" },
  NightriderPlus: { display: "🌑🦅+" },
};

export default function EnemyEffects({ effects }: PropsType) {
  const enemyEffectsLang = useSelector(
    (state: State) => state.lang.enemyEffects
  );

  if (!effects.length) return null;

  return (
    <div style={{ display: "flex" }}>
      {effects.map((effect) => (
        <div key={effect} className={styles.effect}>
          {effectsMap[effect]?.display ?? effect}
          <span className={styles.tooltip}>
            {enemyEffectsLang[effect + "Effect"] ||
              enemyEffectsLang[effect] ||
              effect}
          </span>
        </div>
      ))}
    </div>
  );
}
