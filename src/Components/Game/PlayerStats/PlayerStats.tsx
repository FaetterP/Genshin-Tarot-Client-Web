import { useEffect } from "react";
import { useSelector } from "react-redux";
import { PlayerPrimitive } from "../../../../types/general";
import ChangeableStat from "../../ChangeableStat/ChangeableStat";
import PlayerEffects from "./PlayerEffects";
import styles from "./PlayerStats.module.scss";
import { State, store } from "../../../redux";
import { finishEffect } from "../../../redux/effects";
import { sleep } from "../../../utils/sleep";

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

      await sleep(1000);

      store.dispatch(finishEffect());
    })();
  }, [resetStats.isShown, counter]);

  const actionPoints = "⬜".repeat(props.actionPoints.normal);
  const extraActionPoints = "🟧".repeat(props.actionPoints.extra);

  return (
    <>
      <PlayerEffects effects={props.effects} />
      <div className={styles.myStats}>
        <div className={styles.hp}>
          <ChangeableStat value={props.hp}>{props.hp}♥</ChangeableStat>
        </div>
        <div className={styles.shields}>
          <ChangeableStat value={props.shields}>
            {props.shields}🛡
          </ChangeableStat>
        </div>
        <div className={styles.energy}>
          <ChangeableStat value={props.energy}>{props.energy}⚛</ChangeableStat>
        </div>
        <div className={styles.mora}>
          <ChangeableStat value={props.mora}>{props.mora}💰</ChangeableStat>
        </div>
        <div className={styles.actionPoints}>
          {actionPoints}
          {extraActionPoints}
        </div>
      </div>
    </>
  );
}
