import { useSelector } from "react-redux";
import { State } from "../../redux";
import Enemy from "./Enemy/Enemy";
import PlayerStats from "./PlayerStats/PlayerStats";
import Card from "./Card/Card";
import styles from "./Game.module.scss";
import Selections from "./Selections/Selections";
import OtherPlayer from "./OtherPlayer/OtherPlayer";
import Cycles from "./Cycles/Cycles";

export default function Game() {
  const me = useSelector((state: State) => state.players.me);
  const other = useSelector((state: State) => state.players.other);

  return (
    <div className={styles.game}>
      <div className={styles.enemies}>
        {me.enemies.map((enemy) => (
          <Enemy {...enemy} key={enemy.id} />
        ))}
      </div>
      <div className={styles.stats}>
        <PlayerStats {...me} />
      </div>
      <div className={styles.cards}>
        {me.hand.map((card) => (
          <Card {...card} key={card.cardId} />
        ))}
      </div>
      <div>
        <Selections />
      </div>
      <div className={styles.otherPlayers}>
        {other.map((player) => (
          <OtherPlayer {...player} key={player.playerId} />
        ))}
      </div>
      <div className={styles.cycles}>
        <Cycles currentCycle={1} />
      </div>
    </div>
  );
}
