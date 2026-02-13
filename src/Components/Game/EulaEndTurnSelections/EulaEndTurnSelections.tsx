import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../redux";
import { send } from "../../../ws";
import { clearEulaEndTurn, removeLastEulaEndTurnTarget } from "../../../redux/eulaEndTurn";
import styles from "./EulaEndTurnSelections.module.scss";
import { GameEndTurnRequest } from "../../../types/request";

function getAllEnemies(state: State): { id: string; name: string }[] {
  const me = state.players.me;
  const other = state.players.other;
  const names = state.lang.enemies.names;
  const result: { id: string; name: string }[] = [];
  const add = (e: { id: string; name: string }) =>
    result.push({ id: e.id, name: names[e.name] ?? e.name });
  me.enemies.forEach(add);
  other.forEach((p) => p.enemies.forEach(add));
  return result;
}

export default function EulaEndTurnSelections() {
  const dispatch = useDispatch();
  const active = useSelector((state: State) => state.eulaEndTurn.active);
  const targets = useSelector((state: State) => state.eulaEndTurn.targets);
  const eulaSnowflakes = useSelector((state: State) => state.players.me.eulaSnowflakes ?? 0);
  const hintText = useSelector(
    (state: State) => state.lang.service?.eulaBurstTargetsHint ?? "Select targets:",
  );
  const endTurnText = useSelector((state: State) => state.lang.service?.endTurn ?? "End Turn");
  const cancelText = useSelector((state: State) => state.lang.service?.cancel ?? "Cancel");
  const targetsLabel = useSelector(
    (state: State) => state.lang.service?.eulaTargetsLabel ?? "Targets:",
  );
  const removeLastText = useSelector(
    (state: State) => state.lang.service?.eulaRemoveLast ?? "← remove last",
  );
  const allEnemies = useSelector(getAllEnemies);
  const idToName = Object.fromEntries(allEnemies.map((e) => [e.id, e.name]));

  if (!active || eulaSnowflakes <= 0) return null;

  const canConfirm = targets.length === eulaSnowflakes;

  function handleConfirm() {
    if (!canConfirm) return;
    send<GameEndTurnRequest>({
      action: "game.endTurn",
      eulaBurstTargets: [...targets],
    });
    dispatch(clearEulaEndTurn());
  }

  function handleCancel() {
    dispatch(clearEulaEndTurn());
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.hint}>
        {hintText} {targets.length} / {eulaSnowflakes}
      </div>
      {targets.length > 0 && (
        <div className={styles.targetsRow}>
          <span className={styles.targetsLabel}>{targetsLabel}</span>
          <span className={styles.targetsList}>
            {targets.map((id) => idToName[id] ?? id).join(", ")}
          </span>
          <button
            type="button"
            className={styles.removeLast}
            onClick={() => dispatch(removeLastEulaEndTurnTarget())}
          >
            {removeLastText}
          </button>
        </div>
      )}
      <div className={styles.buttons}>
        <button
          type="button"
          className="generalButton"
          onClick={handleConfirm}
          disabled={!canConfirm}
        >
          {endTurnText}
        </button>
        <button type="button" className="generalButton" onClick={handleCancel}>
          {cancelText}
        </button>
      </div>
    </div>
  );
}
