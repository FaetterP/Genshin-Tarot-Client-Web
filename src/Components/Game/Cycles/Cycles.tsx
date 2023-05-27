import { useSelector } from "react-redux";
import { State } from "../../../redux";
import { send } from "../../../ws";

export default function Cycles(props: { currentCycle: number }) {
  const endTurnText = useSelector((state: State) => state.lang.service.endTurn);

  function click() {
    send({ action: "game.endTurn" });
  }

  return (
    <>
      <div>{props.currentCycle}{"/12"}</div>
      <button onClick={click}>{endTurnText}</button>
    </>
  );
}
