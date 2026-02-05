import { useDispatch, useSelector } from "react-redux";
import { PlayerPrimitive } from "../../../../types/general";
import OtherEnemy from "./OtherEnemy";
import styles from "./OtherPlayer.module.scss";
import { State } from "../../../redux";
import { setBurstSelectedPlayer } from "../../../redux/burst";
import { burstsRequire } from "../../../storage/characters/burstsRequire";

export default function OtherPlayer(props: PlayerPrimitive) {
  const dispatch = useDispatch();
  const burstCharacter = useSelector((state: State) => state.burst.character);
  const burstRequire = burstCharacter ? burstsRequire[burstCharacter] : null;
  const needPlayer = !!burstRequire?.needPlayer;
  const selectedPlayer = useSelector((state: State) => state.burst.selectedPlayer);
  const isSelected = selectedPlayer === props.playerId;

  const handleClick = () => {
    if (needPlayer) {
      dispatch(setBurstSelectedPlayer({ playerId: props.playerId }));
    }
  };

  return (
    <div
      className={`${styles.otherPlayer} ${needPlayer ? styles.canSelectPlayer : ""} ${isSelected ? styles.selectedPlayer : ""}`}
      onClick={needPlayer ? handleClick : undefined}
      role={needPlayer ? "button" : undefined}
    >
      {props.playerId}
      <div>
        {props.enemies.map((enemy) => (
          <OtherEnemy key={enemy.id} {...enemy} />
        ))}
      </div>
    </div>
  );
}
