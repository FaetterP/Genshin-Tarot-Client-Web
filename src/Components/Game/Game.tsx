import { useSelector } from "react-redux";
import { State } from "../../redux";
import PlayerStats from "./PlayerStats/PlayerStats";
import styles from "./Game.module.scss";
import Selections from "./Selections/Selections";
import BurstButtons from "./BurstButtons/BurstButtons";
import BurstSelections from "./BurstSelections/BurstSelections";
import EulaEndTurnSelections from "./EulaEndTurnSelections/EulaEndTurnSelections";
import OtherPlayer, { type OtherPlayerProps } from "./OtherPlayer/OtherPlayer";
import Cycles from "./Cycles/Cycles";
import Hand from "./Card/Hand";
import LeylineEffect from "./LeylineEffect";
import CardAnimationOverlay from "./CardAnimationOverlay/CardAnimationOverlay";
import EnergyFreezedOverlay from "./EnergyFreezedOverlay/EnergyFreezedOverlay";
import StepAnimationRunner from "./StepAnimationRunner";
import Enemies from "./Enemy/Enemies";
import DiscardDeck from "./DiscardDeck/DiscardDeck";
import DrawDeck from "./DrawDeck/DrawDeck";

export default function Game() {
  const me = useSelector((state: State) => state.players.me);
  const other = useSelector((state: State) => state.players.other);
  const playersLabel = useSelector((state: State) => state.lang.service?.players ?? "Players");
  const allPlayers = me?.playerId ? [me, ...other] : other;

  return (
    <div className={styles.game}>
      <div className={styles.bg} />
      <StepAnimationRunner />
      <EnergyFreezedOverlay />
      <CardAnimationOverlay />
      <LeylineEffect />
      <Enemies />
      <div className={styles.stats}>
        <PlayerStats {...me} />
      </div>
      <div className={styles.burstRow}>
        <BurstButtons />
      </div>
      <Hand />
      <div className={styles.selections}>
        <Selections />
        <BurstSelections />
        <EulaEndTurnSelections />
      </div>
      <div className={styles.otherPlayers}>
        <div className={styles.playersHeader}>
          {playersLabel} {allPlayers.length}
        </div>
        <div className={styles.playersList}>
          {allPlayers.map((player) => {
            const props: OtherPlayerProps = {
              ...player,
              isMe: player.playerId === me?.playerId,
            };
            return <OtherPlayer {...props} key={player.playerId} />;
          })}
        </div>
      </div>
      <div className={styles.cycles}>
        <Cycles />
      </div>
      <DiscardDeck cards={me.discard} />
      <DrawDeck cards={me.deck} />
    </div>
  );
}
