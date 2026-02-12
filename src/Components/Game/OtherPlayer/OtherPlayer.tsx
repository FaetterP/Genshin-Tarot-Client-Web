import { useDispatch, useSelector } from "react-redux";
import { PlayerPrimitive } from "../../../types/general";
import OtherEnemy from "./OtherEnemy";
import styles from "./OtherPlayer.module.scss";
import { State } from "../../../redux";
import { setBurstSelectedPlayer } from "../../../redux/burst";
import { setCardSelectedPlayer } from "../../../redux/card";
import { burstsRequire } from "../../../storage/characters/burstsRequire";
import { shortPlayerId } from "../../../utils/formatPlayerId";

export type OtherPlayerProps = PlayerPrimitive & { isMe?: boolean };

export default function OtherPlayer(props: OtherPlayerProps) {
  const dispatch = useDispatch();
  const burstCharacter = useSelector((state: State) => state.burst.character);
  const burstRequire = burstCharacter ? burstsRequire[burstCharacter] : null;
  const cardNeedPlayer = useSelector((state: State) => state.card.isNeedPlayer);
  const burstNeedPlayer = !!burstRequire?.needPlayer;
  const needPlayer = burstNeedPlayer || cardNeedPlayer;
  const burstSelectedPlayer = useSelector((state: State) => state.burst.selectedPlayer);
  const cardSelectedPlayer = useSelector((state: State) => state.card.selectedPlayer);
  const selectedPlayer = burstNeedPlayer ? burstSelectedPlayer : cardSelectedPlayer;
  const isSelected = selectedPlayer === props.playerId;
  const meLabel = useSelector((state: State) => state.lang.service?.meLabel ?? "Me");

  const handleClick = () => {
    if (!needPlayer) return;
    if (burstNeedPlayer) {
      dispatch(setBurstSelectedPlayer({ playerId: props.playerId }));
    } else {
      dispatch(setCardSelectedPlayer({ playerId: props.playerId }));
    }
  };

  return (
    <div
      className={`${styles.otherPlayer} ${needPlayer ? styles.canSelectPlayer : ""} ${isSelected ? styles.selectedPlayer : ""}`}
      onClick={needPlayer ? handleClick : undefined}
      role={needPlayer ? "button" : undefined}
    >
      {props.isMe ? (
        <>
          {meLabel} {shortPlayerId(props.playerId)}
        </>
      ) : (
        <>
          {shortPlayerId(props.playerId)}
          <div>
            {props.enemies.map((enemy) => (
              <OtherEnemy key={enemy.id} {...enemy} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
