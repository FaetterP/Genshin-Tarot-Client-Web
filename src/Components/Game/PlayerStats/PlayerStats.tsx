import { useSelector } from "react-redux";
import { PlayerPrimitive } from "../../../../types/general";
import PlayerEffects from "./PlayerEffects";
import styles from "./PlayerStats.module.scss";
import { State, store } from "../../../redux";
import { useEffect } from "react";
import { sleep } from "../../../utils/sleep";
import { finishEffect } from "../../../redux/effects";

export default function PlayerStats(props: PlayerPrimitive) {
  const myId = useSelector((state: State) => state.players.me.playerId);
  const resetStats = useSelector((state: State) => state.effects.resetStats);
  const counter = useSelector((state: State) => state.effects.counter);

  useEffect(() => {
    (async () => {
      if (!resetStats.isShown) return;
      if (resetStats.player !== myId) {
        store.dispatch(finishEffect());
        return;
      }

      console.log("show reset stats");
      await sleep(1000);

      store.dispatch(finishEffect());
    })();
  }, [resetStats.isShown, counter]);

  let actionPoints = "";
  for (let i = 0; i < props.actionPoints.normal; i++) {
    actionPoints += "⬜";
  }

  let extraActionPoints = "";
  for (let i = 0; i < props.actionPoints.extra; i++) {
    extraActionPoints += "🟧";
  }

  return (
    <>
      <PlayerEffects effects={props.effects} />
      <div className={styles.myStats}>
        <div className={styles.hp}>{props.hp}♥</div>
        <div className={styles.shields}>{props.shields}🛡</div>
        <div className={styles.energy}>{props.energy}⚛</div>
        <div className={styles.mora}>{props.mora}💰</div>
        <div className={styles.actionPoints}>
          {actionPoints}
          {extraActionPoints}
        </div>
      </div>
    </>
  );
}
