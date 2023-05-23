import { PlayerPrimitive } from "../../../../types/general";
import OtherEnemy from "./OtherEnemy";

export default function OtherPlayer(props: PlayerPrimitive) {

  return (
    <div>
      {props.playerId}
      <div>
        {props.enemies.map((enemy) => (
          <OtherEnemy {...enemy}/>
        ))}
      </div>
    </div>
  );
}
