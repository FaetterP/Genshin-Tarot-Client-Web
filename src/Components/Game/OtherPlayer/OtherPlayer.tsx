import { PlayerPrimitive } from "../../../../types/general";
import OtherEnemy from "./OtherEnemy";
import styles from "./OtherPlayer.module.scss"

export default function OtherPlayer(props: PlayerPrimitive) {

  return (
    <div className={styles.otherPlayer}>
      {props.playerId}
      <div>
        {props.enemies.map((enemy) => (
          <OtherEnemy {...enemy}/>
        ))}
      </div>
    </div>
  );
}
