import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EnemyPrimitive } from "../../../../types/general";
import styles from "./Enemy.module.scss";
import { State, store } from "../../../redux";
import { selectEnemy } from "../../../redux/card";
import EnemyCard from "./EnemyCard";
import { sleep } from "../../../utils/sleep";
import { finishEffect } from "../../../redux/effects";

export default function Enemy(props: EnemyPrimitive) {
  const myId = useSelector((state: State) => state.players.me.playerId);
  const enemyAttack = useSelector((state: State) => state.effects.enemyAttack);
  const counter = useSelector((state: State) => state.effects.counter);

  useEffect(() => {
    (async () => {
      if (!enemyAttack.isShown) return;
      if (enemyAttack.player === myId && enemyAttack.enemy === props.id) {
        await sleep(2000);
      }

      store.dispatch(finishEffect());
    })();
  }, [...Object.values(enemyAttack), counter]);

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

  function getEnemyAttack(): string {
    if (enemyAttack.isShown && enemyAttack.enemy === props.id)
      return styles.attackEffect;

    return "";
  }

  function getIsCanSelected(): string {
    return isCanSelected ? styles.canSelected : "";
  }

  function getIsSelected(): string {
    return isSelected ? styles.selected : "";
  }

  return (
    <div
      className={`${getIsCanSelected()} ${getIsSelected()} ${getEnemyAttack()}`}
      onClick={click}
    >
      <EnemyCard {...props} />
    </div>
  );
}
