import { useSelector } from "react-redux";
import { State } from "../../../redux";
import styles from "./Enemy.module.scss";
import { enemies } from "../../../storage/enemies/enemies";
import { EnemyPrimitive } from "../../../types/general";
import ChangeableStat from "../../ChangeableStat/ChangeableStat";
import { toElementKey } from "../../../utils/elementColors";
import EnemyEffects from "./EnemyEffects";

export default function EnemyCard(props: EnemyPrimitive) {
  const name =
    useSelector((state: State) => state.lang.enemies.names[props.name]) || `${props.name}.name`;
  const elementNames = useSelector((state: State) => state.lang.elements);
  const description =
    useSelector((state: State) => state.lang.enemies.descriptions[props.name]) ||
    `${props.name}.description`;
  const { mora, attack } = enemies[props.name];

  return (
    <div className={styles.enemyBlock}>
      <div className={styles.name}>{name}</div>
      <div className={styles.hp}>
        <ChangeableStat value={props.hp}>{props.hp}♥</ChangeableStat>
      </div>
      <div className={styles.mora}>{mora}💰</div>
      <div className={styles.attack}>{attack}⚔</div>
      <div className={styles.shield}>
        <ChangeableStat value={props.shield}>{props.shield}🛡</ChangeableStat>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.status}>
        {props.isStunned && (
          <span className={styles.stunned} title="Оглушён">
            💫
          </span>
        )}
        {props.elements[0] && (
          <div className={styles[toElementKey(props.elements[0])]}>
            {elementNames[toElementKey(props.elements[0])] ?? props.elements[0]}
          </div>
        )}
      </div>
      <EnemyEffects effects={props.effects ?? []} enemyId={props.id} />
    </div>
  );
}
