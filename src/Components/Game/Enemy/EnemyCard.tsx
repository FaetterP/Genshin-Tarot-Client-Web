import { useSelector } from "react-redux";
import { State } from "../../../redux";
import styles from "./Enemy.module.scss"
import { enemies } from "../../../storage/enemies/enemies";
import { EnemyPrimitive } from "../../../../types/general";


export default function EnemyCard(props:EnemyPrimitive){
    const name =
    useSelector((state: State) => state.lang.enemies.names[props.name]) ||
    `${props.name}.name`;
  const description =
    useSelector(
      (state: State) => state.lang.enemies.descriptions[props.name]
    ) || `${props.name}.description`;
  const { mora, attack } = enemies[props.name];

  return(
    <div className={styles.enemyBlock}>
    <div className={styles.name}>{name}</div>
      <div className={styles.hp}>{props.hp}♥</div>
      <div className={styles.mora}>{mora}💰</div>
      <div className={styles.attack}>{attack}⚔</div>
      <div className={styles.shield}>{props.shield}🛡</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.status}>
        <div className={styles[props.elements[0]]}>{props.elements[0]}</div>
      </div>
    </div>
  )
}