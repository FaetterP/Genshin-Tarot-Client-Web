import { useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./PlayerEffects.module.scss";
import { State, store } from "../../../redux";
import { sleep } from "../../../utils/sleep";
import { finishEffect } from "../../../redux/effects";

type PropsType = {
  effects: string[];
};

const effectsMap: Record<string, { description: string; display: string }> = {
  Breastplate: { display: "🛡🍽", description: "Breastplate" },
  DominusLapidis: { display: "🗿", description: "DominusLapidis" },
  ExplosivePuppet: { display: "🔥🐇", description: "ExplosivePuppet" },
  GuideOfAfterlife: { display: "🔥🦋", description: "GuideOfAfterlife" },
  GuobaFire: { display: "🐻🔥", description: "GuobaFire" },
  LayeredFrost: { display: "☃", description: "LayeredFrost" },
  LetTheShowBegin: { display: "💦🎶", description: "LetTheShowBegin" },
  MirrorReflections: { display: "👉👈", description: "MirrorReflections" },
  Nightrider: { display: "🌑🦅", description: "Nightrider" },
  NightriderPlus: { display: "🌑🦅+", description: "NightriderPlus" },
  NiwabiFireDance: { display: "🔥🎶", description: "NiwabiFireDance" },
  Pyronado: { display: "🔥💨", description: "Pyronado" },
  Raincutter: { display: "🌧", description: "Raincutter" },
  SkywardSonnet: { display: "🌬🎶", description: "SkywardSonnet" },
  SkywardSonnetPlus: { display: "🌬🎶+", description: "SkywardSonnetPlus" },
  SolarIsotoma: { display: "☀💮", description: "SolarIsotoma" },
  Stormbreaker: { display: "☁", description: "Stormbreaker" },
  TrailOfTheQilin: { display: "❄💮", description: "TrailOfTheQilin" },
};

export default function PlayerEffects({ effects }: PropsType) {
  const isUseEffect = useSelector(
    (state: State) => state.effects.useEffect.isShown
  );
  const counter = useSelector((state: State) => state.effects.counter);

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
        <div className={styles.effect} title={effectsMap[effect].description}>
          {effectsMap[effect].display}
        </div>
      ))}
    </div>
  );
}
