import { useSelector } from "react-redux";
import { PlayerPrimitive } from "../../../types/general";
import ChangeableStat from "../../ChangeableStat/ChangeableStat";
import PlayerEffects from "./PlayerEffects";
import styles from "./PlayerStats.module.scss";

export default function PlayerStats(props: PlayerPrimitive) {
  const normalMax = 3;
  const spentActionPoints = "◻".repeat(normalMax - props.actionPoints.normal);
  const actionPoints = "⬜".repeat(props.actionPoints.normal);
  const extraActionPoints = "🟧".repeat(props.actionPoints.extra);
  const hasFreezeInHand = props.hand?.some((c) => c.name === "Freeze") ?? false;

  return (
    <>
      <PlayerEffects effects={props.effects} />
      <div className={styles.myStats}>
        <div className={styles.hp}>
          <ChangeableStat value={props.hp}>{props.hp}♥</ChangeableStat>
        </div>
        <div className={styles.shields}>
          <ChangeableStat value={props.shields}>{props.shields}🛡</ChangeableStat>
        </div>
        <div className={styles.energy}>
          <ChangeableStat value={props.energy}>{props.energy}⚛</ChangeableStat>
          {hasFreezeInHand && <div className={styles.energyIceShard} />}
        </div>
        <div className={styles.mora}>
          <ChangeableStat value={props.mora}>{props.mora}💰</ChangeableStat>
        </div>
        <div className={styles.actionPoints}>
          {spentActionPoints}
          {actionPoints}
          {extraActionPoints}
        </div>
      </div>
    </>
  );
}
