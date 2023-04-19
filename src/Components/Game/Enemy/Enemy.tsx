import { EnemyPrimitive } from "../../../../types/general";
import { engDescriptions } from "../../../storage/enemies/descriptions";
import { enemies } from "../../../storage/enemies/enemies";
import { engNames } from "../../../storage/enemies/names";
import styles from "./Enemy.module.scss";

export default function Enemy(props: EnemyPrimitive) {
  console.log(props)
  const name = engNames[props.name];
  const description = engDescriptions[props.name];
  const { mora, attack } = enemies[props.name];
  return (
    <div className={styles.enemyBlock}>
      <div className={styles.name}>{name}</div>
      <div className={styles.hp}>{props.hp}♥</div>
      <div className={styles.mora}>{mora}💰</div>
      <div className={styles.attack}>{attack}⚔</div>
      <div className={styles.shield}>{props.shield}🛡</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.status}>
        <div className={props.elements[0]}>{props.elements[0]}</div>
      </div>
    </div>
  );
}
