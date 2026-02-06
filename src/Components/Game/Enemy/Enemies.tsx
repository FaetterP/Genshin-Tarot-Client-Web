import { useSelector } from "react-redux";
import { State } from "../../../redux";
import Enemy from "./Enemy";
import stylesGame from "./../Game.module.scss";

export default function Enemies() {
  const enemies = useSelector((state: State) => state.players.me.enemies);

  return (
    <div className={stylesGame.enemies}>
      {enemies.map((enemy) => (
        <Enemy {...enemy} key={enemy.id} />
      ))}
    </div>
  );
}
