import { useSelector } from "react-redux";
import { State } from "../../../redux";
import { send } from "../../../ws";
import Leyline from "./Leyline";
import styles from "./Cycles.module.scss"

export default function Cycles() {
  const currentCycle = useSelector((state: State) => state.players.cycle);
  const leylines = useSelector((state: State) => state.players.leylines);

  const endTurnText = useSelector((state: State) => state.lang.service.endTurn);

  function click() {
    send({ action: "game.endTurn" });
  }

  return (
    <>
      <div className={styles.cycleNumber}>
        {currentCycle}
      </div>
      <button onClick={click} className="generalButton">{endTurnText}</button>
      <div className={styles.leylines}>
        {leylines.map((line) => (
          <Leyline name={line}/>
        ))}
      </div>
    </>
  );
}
