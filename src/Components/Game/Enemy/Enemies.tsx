import { useSelector } from "react-redux";
import { State, store } from "../../../redux";
import { useEffect } from "react";
import { sleep } from "../../../utils/sleep";
import { finishEffect } from "../../../redux/effects";
import Enemy from "./Enemy";
import stylesGame from "./../Game.module.scss";
import stylesEnemy from "./Enemy.module.scss";

export default function Enemies() {
  const createWave = useSelector((state: State) => state.effects.createWave);
  const counter = useSelector((state: State) => state.effects.counter);
  const enemies = useSelector((state: State) => state.players.me.enemies);

  useEffect(() => {
    (async () => {
      if (!createWave.isShown) return;

      await sleep(2000);

      store.dispatch(finishEffect());
    })();
  }, [createWave.isShown, counter]);

  if (createWave.isShown) {
    return (
      <div className={stylesGame.enemies}>
        {createWave.enemies.map((enemy) => (
          <div className={stylesEnemy.spawn}>
            <Enemy {...enemy} key={enemy.id} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={stylesGame.enemies}>
      {enemies.map((enemy) => (
        <Enemy {...enemy} key={enemy.id} />
      ))}
    </div>
  );
}
