import { useSelector } from "react-redux";
import styles from "./PlayerEffects.module.scss";
import { State } from "../../../redux";
import { EPlayerEffect } from "../../../types/enums";

type PropsType = {
  effects: EPlayerEffect[];
  playerId: string;
};

const effectsMap: Record<EPlayerEffect, { display: string }> = {
  [EPlayerEffect.Breastplate]: { display: "🛡🍽" },
  [EPlayerEffect.DominusLapidis]: { display: "🗿" },
  [EPlayerEffect.ExplosivePuppet]: { display: "🔥🐇" },
  [EPlayerEffect.GlacialIllumination]: { display: "❄⚔" },
  [EPlayerEffect.GuideOfAfterlife]: { display: "🔥🦋" },
  [EPlayerEffect.GuobaFire]: { display: "🐻🔥" },
  [EPlayerEffect.LayeredFrost]: { display: "☃" },
  [EPlayerEffect.LetTheShowBeginPlus]: { display: "💦🎶+" },
  [EPlayerEffect.MirrorReflections]: { display: "👉👈" },
  [EPlayerEffect.NiwabiFireDance]: { display: "🔥🎶" },
  [EPlayerEffect.Overheat]: { display: "⚡🔥" },
  [EPlayerEffect.Pyronado]: { display: "🔥💨" },
  [EPlayerEffect.Raincutter]: { display: "🌧" },
  [EPlayerEffect.SkywardSonnet]: { display: "🌬🎶" },
  [EPlayerEffect.SkywardSonnetPlus]: { display: "🌬🎶+" },
  [EPlayerEffect.SolarIsotoma]: { display: "☀💮" },
  [EPlayerEffect.Stormbreaker]: { display: "☁" },
  [EPlayerEffect.TrailOfTheQilin]: { display: "❄💮" },
};

export default function PlayerEffects({ effects, playerId }: PropsType) {
  const animatingEffectTrigger = useSelector(
    (state: State) => state.stepAnimation.animatingEffectTrigger,
  );
  const animatingPlayerEffects = useSelector(
    (state: State) => state.stepAnimation.animatingPlayerEffects,
  );
  const playerEffectsLang = useSelector((state: State) => state.lang.playerEffects);

  const myEffectChange = animatingPlayerEffects.find((e) => e.playerId === playerId);

  return (
    <div style={{ display: "flex" }}>
      {effects.map((effect) => (
        <div key={effect} className={styles.effect}>
          {effectsMap[effect].display}
          <span className={styles.tooltip}>
            {playerEffectsLang[effect].description}
          </span>
        </div>
      ))}
      {animatingEffectTrigger && (
        <div className={styles.effectTriggerOverlay} aria-hidden="true">
          {animatingEffectTrigger.isRemove ? "−" : "+"}{" "}
          {playerEffectsLang[animatingEffectTrigger.effect].description}
        </div>
      )}
      {myEffectChange && (
        <div className={styles.effectTriggerOverlay} aria-hidden="true">
          {myEffectChange.isAdd ? "+" : "−"}{" "}
          {playerEffectsLang[myEffectChange.effect].description}
        </div>
      )}
    </div>
  );
}
