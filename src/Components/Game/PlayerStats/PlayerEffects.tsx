import { useSelector } from "react-redux";
import styles from "./PlayerEffects.module.scss";
import { State } from "../../../redux";

type PropsType = {
  effects: string[];
};

const effectsMap: Record<string, { display: string }> = {
  Breastplate: { display: "🛡🍽" },
  DominusLapidis: { display: "🗿" },
  ExplosivePuppet: { display: "🔥🐇" },
  GuideOfAfterlife: { display: "🔥🦋" },
  GuobaFire: { display: "🐻🔥" },
  LayeredFrost: { display: "☃" },
  LetTheShowBeginPlus: { display: "💦🎶+" },
  MirrorReflections: { display: "👉👈" },
  NiwabiFireDance: { display: "🔥🎶" },
  Overheat: { display: "⚡🔥" },
  Pyronado: { display: "🔥💨" },
  Raincutter: { display: "🌧" },
  SkywardSonnet: { display: "🌬🎶" },
  SkywardSonnetPlus: { display: "🌬🎶+" },
  SolarIsotoma: { display: "☀💮" },
  Stormbreaker: { display: "☁" },
  TrailOfTheQilin: { display: "❄💮" },
};

export default function PlayerEffects({ effects }: PropsType) {
  const animatingEffectTrigger = useSelector(
    (state: State) => state.stepAnimation.animatingEffectTrigger,
  );
  const playerEffectsLang = useSelector((state: State) => state.lang.playerEffects);

  return (
    <div style={{ display: "flex" }}>
      {effects.map((effect) => (
        <div key={effect} className={styles.effect}>
          {effectsMap[effect].display}
          <span className={styles.tooltip}>
            {playerEffectsLang[effect + "Effect"] || playerEffectsLang[effect] || effect}
          </span>
        </div>
      ))}
      {animatingEffectTrigger && (
        <div className={styles.effectTriggerOverlay} aria-hidden="true">
          {animatingEffectTrigger.isRemove ? "−" : "+"}{" "}
          {playerEffectsLang[animatingEffectTrigger.effect + "Effect"] ||
            playerEffectsLang[animatingEffectTrigger.effect] ||
            animatingEffectTrigger.effect}
        </div>
      )}
    </div>
  );
}
