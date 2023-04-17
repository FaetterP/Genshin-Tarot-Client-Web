import { EnemyPrimitive } from "../../../../types/general";
import styles from "./Enemy.module.scss"

export default function Enemy(props: EnemyPrimitive) {
  return (
    <div className={styles.enemyBlock}>
      <div>{props.name}</div>
      <div>{props.hp}♥</div>
      <div>{props.shield}🛡</div>
    </div>
  );
}
