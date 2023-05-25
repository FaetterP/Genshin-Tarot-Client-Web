import { useDispatch, useSelector } from "react-redux";
import { EnemyPrimitive } from "../../../../types/general";
import { State } from "../../../redux";
import styles from "./OtherEnemy.module.scss";
import { selectEnemy } from "../../../redux/card";

export default function OtherEnemy(props: EnemyPrimitive) {
  const name =
    useSelector((state: State) => state.lang.enemies.names[props.name]) ||
    `${props.name}.name`;

  const needEnemies = useSelector((state: State) => state.card.needEnemies);
  const isRange = !!useSelector((state: State) => state.card.isRange);
  const selectedCount = useSelector(
    (state: State) => state.card.enemies
  ).length;

  const isCanSelected = needEnemies && isRange && selectedCount < needEnemies;
  const isSelected = useSelector((state: State) => state.card.enemies).includes(
    props.id
  );

  const dispatch = useDispatch();

  function click() {
    if (!isCanSelected) return;

    dispatch(selectEnemy({ enemyId: props.id }));
  }

  return (
    <div
      className={`${styles.enemy} ${isCanSelected ? styles.canSelected : ""}  ${
        isSelected ? styles.selected : ""
      }`}
      onClick={click}
    >
      {name}
      {` ${props.hp}♥`}
    </div>
  );
}
