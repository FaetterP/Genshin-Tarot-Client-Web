import { useSelector } from "react-redux";
import { State } from "../../redux";
import PlayerStats from "./PlayerStats/PlayerStats";
import styles from "./Game.module.scss";
import Selections from "./Selections/Selections";
import OtherPlayer from "./OtherPlayer/OtherPlayer";
import Cycles from "./Cycles/Cycles";
import Hand from "./Card/Hand";
import LeylineEffect from "./LeylineEffect";
import Enemies from "./Enemy/Enemies";

export default function Game() {
  const me = useSelector((state: State) => state.players.me);
  const other = useSelector((state: State) => state.players.other);

  return (
    <div className={styles.game}>
      <div className={styles.bg} />
      <LeylineEffect />
      <Enemies />
      <div className={styles.stats}>
        <PlayerStats {...me} />
      </div>
      <Hand />
      <div className={styles.selections}>
        <Selections />
      </div>
      <div className={styles.otherPlayers}>
        {other.map((player) => (
          <OtherPlayer {...player} key={player.playerId} />
        ))}
      </div>
      <div className={styles.cycles}>
        <Cycles />
      </div>
      <div className={styles.discard}>
        {me.discard.map((card) => (
          <div>{card.name}</div>
        ))}
      </div>
      <div className={styles.deck}>
        {me.deck.map((card) => (
          <div>{card.name}</div>
        ))}
      </div>
    </div>
  );
}
