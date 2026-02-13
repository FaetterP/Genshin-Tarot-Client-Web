import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../redux";
import { send } from "../../../ws";
import { openEulaEndTurn } from "../../../redux/eulaEndTurn";
import Leyline from "./Leyline";
import styles from "./Cycles.module.scss";
import { GameEndTurnRequest } from "../../../types/request";

export default function Cycles() {
  const dispatch = useDispatch();
  const currentCycle = useSelector((state: State) => state.players.cycle);
  const leylines = useSelector((state: State) => state.players.leylines);
  const eulaSnowflakes = useSelector((state: State) => state.players.me.eulaSnowflakes ?? 0);

  const endTurnText = useSelector((state: State) => state.lang.service.endTurn);

  const displayCycle = currentCycle < 0 ? 0 : Math.min(12, currentCycle);
  const percent = (displayCycle / 12) * 100;

  function click() {
    if (eulaSnowflakes > 0) {
      dispatch(openEulaEndTurn());
    } else {
      send<GameEndTurnRequest>({ action: "game.endTurn" });
    }
  }

  return (
    <>
      <div className={styles.cycleBlock}>
        <div
          className={styles.cycleProgressbar}
          style={{ ["--percent" as string]: percent }}
          aria-hidden
        >
          <svg width="56" height="56" viewBox="0 0 56 56" className={styles.cycleSvg}>
            <circle className={styles.cycleInner} cx="28" cy="28" r="22" fill="currentColor" />
            <circle className={styles.cycleProgressbarTrack} cx="28" cy="28" r="25" />
            <circle className={styles.cycleProgressbarThumb} cx="28" cy="28" r="25" />
          </svg>
          <div className={styles.cycleNumber}>{currentCycle < 0 ? "—" : currentCycle}</div>
        </div>
        <button onClick={click} className={styles.endTurnButton}>
          {endTurnText}
        </button>
      </div>
      <div className={styles.leylines}>
        {leylines.map((line) => (
          <Leyline name={line} key={line} />
        ))}
      </div>
    </>
  );
}
