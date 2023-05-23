import { PlayerPrimitive } from "../../../../types/general";
import styles from "./PlayerStats.module.scss";

export default function PlayerStats(props: PlayerPrimitive) {
  let actionPoints = "";
  for (let i = 0; i < props.actionPoints.normal; i++) {
    actionPoints += "⬜";
  }

  let extraActionPoints = "";
  for (let i = 0; i < props.actionPoints.extra; i++) {
    extraActionPoints += "🟧";
  }

  return (
    <div className={styles.myStats}>
      <div className={styles.hp}>{props.hp}♥</div>
      <div className={styles.shields}>{props.shields}🛡</div>
      <div className={styles.energy}>{props.energy}⚛</div>
      <div className={styles.mora}>{10}💰</div>
      <div className={styles.actionPoints}>
        {actionPoints}
        {extraActionPoints}
      </div>
    </div>
  );
}
