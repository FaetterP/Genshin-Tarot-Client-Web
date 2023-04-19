import { useSelector } from "react-redux";
import { State } from "../../redux";
import Enemy from "./Enemy/Enemy";
import PlayerStats from "./PlayerStats/PlayerStats";
import Card from "./Card/Card";

export default function Game() {
  const me = useSelector((state: State) => state.players.me);

  return (
    <div>
      {me.enemies.map((enemy) => (
        <Enemy {...enemy} key={enemy.id}/>
      ))}
      <PlayerStats {...me} />
      {me.hand.map((card) => (
        <Card card={card}/>
      ))}
    </div>
  );
}
