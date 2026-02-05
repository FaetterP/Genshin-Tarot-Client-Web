import { useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./PlayerEffects.module.scss";
import { State, store } from "../../../redux";
import { sleep } from "../../../utils/sleep";
import { finishEffect } from "../../../redux/effects";

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
  LetTheShowBegin: { display: "💦🎶" },
  MirrorReflections: { display: "👉👈" },
  Nightrider: { display: "🌑🦅" },
  NightriderPlus: { display: "🌑🦅+" },
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
  const isUseEffect = useSelector(
    (state: State) => state.effects.useEffect.isShown
  );
  const counter = useSelector((state: State) => state.effects.counter);
  const playerEffectsLang = useSelector((state: State) => state.lang.playerEffects);

  useEffect(() => {
    (async () => {
      if (!isUseEffect) return;

      console.log("show use effect");
      await sleep(1000);

      store.dispatch(finishEffect());
    })();
  }, [isUseEffect, counter]);

  return (
    <div style={{ display: "flex" }}>
      {effects.map((effect) => (
        <div key={effect} className={styles.effect}>
          {effectsMap[effect].display}
          <span className={styles.tooltip}>
            {playerEffectsLang[effect + "Effect"] ||
              playerEffectsLang[effect] ||
              effect}
          </span>
        </div>
      ))}
    </div>
  );
}
