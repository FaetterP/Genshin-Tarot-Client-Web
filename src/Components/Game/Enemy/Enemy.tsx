import { useDispatch, useSelector } from "react-redux";
import { EnemyPrimitive } from "../../../../types/general";
import { enemies } from "../../../storage/enemies/enemies";
import styles from "./Enemy.module.scss";
import { State } from "../../../redux";
import { selectEnemy } from "../../../redux/card";

export default function Enemy(props: EnemyPrimitive) {
  const name =
    useSelector((state: State) => state.lang.enemies.names[props.name]) ||
    `${props.name}.name`;
  const description =
    useSelector(
      (state: State) => state.lang.enemies.descriptions[props.name]
    ) || `${props.name}.description`;
  const { mora, attack } = enemies[props.name];

  const dispatch = useDispatch();

  const needEnemies = useSelector((state: State) => state.card.needEnemies);
  const selectedEnemies = useSelector(
    (state: State) => state.card.enemies
  ).length;

  const isCanSelected = needEnemies && selectedEnemies < needEnemies;
  const isSelected = useSelector((state: State) => state.card.enemies).includes(
    props.id
  );

  function click() {
    if (!isCanSelected) return;

    dispatch(selectEnemy({ enemyId: props.id }));
  }

  return (
    <div
      className={`${styles.enemyBlock} ${
        isCanSelected ? styles.canSelected : ""
      }  ${isSelected ? styles.selected : ""}`}
      onClick={click}
    >
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
  );
}
