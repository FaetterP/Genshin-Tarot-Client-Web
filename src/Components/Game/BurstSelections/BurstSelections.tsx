import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../redux";
import { send } from "../../../ws";
import {
  clearBurstSelection,
  setBurstSelectedCharacter,
  setBurstDivide,
} from "../../../redux/burst";
import { burstsRequire } from "../../../storage/characters/burstsRequire";
import { engDescriptions as engBursts } from "../../../storage/characters/bursts";
import styles from "./BurstSelections.module.scss";
import { GameUseBurstRequest } from "../../../types/request";

const allCharacterKeys = Object.keys(engBursts);

export default function BurstSelections() {
  const dispatch = useDispatch();
  const burstCharacter = useSelector((state: State) => state.burst.character);
  const burstEnemies = useSelector((state: State) => state.burst.enemies);
  const burstSelectedPlayer = useSelector(
    (state: State) => state.burst.selectedPlayer
  );
  const burstDivide = useSelector((state: State) => state.burst.divide);
  const burstSelectedChar = useSelector(
    (state: State) => state.burst.selectedCharacter
  );
  const me = useSelector((state: State) => state.players.me);
  const otherPlayers = useSelector((state: State) => state.players.other);
  const lang = useSelector((state: State) => state.lang);
  const allPlayersForDivide = me?.playerId
    ? [me, ...otherPlayers]
    : otherPlayers;
  const characterNames = lang.characters.names;

  if (!burstCharacter) return null;

  const require = burstsRequire[burstCharacter];
  if (!require) {
    return null;
  }

  const needEnemies = require.needEnemies ?? 0;
  const needPlayer = !!require.needPlayer;
  const needDivide = !!require.needDivide;
  const needCharacter = !!require.needCharacter;

  const enemiesOk = burstEnemies.length >= needEnemies;
  const playerOk = !needPlayer || !!burstSelectedPlayer;
  const divideOk = !needDivide || (burstDivide.length > 0 && burstDivide.every((d) => d.count > 0));
  const characterOk = !needCharacter || !!burstSelectedChar;

  const canConfirm =
    enemiesOk && playerOk && (needDivide ? divideOk : true) && characterOk;

  function handleConfirm() {
    if (!canConfirm || !burstCharacter) return;
    const body: GameUseBurstRequest = {
      action: "game.useBurst",
      character: burstCharacter,
    };
    if (needPlayer && burstSelectedPlayer)
      body.selectedPlayer = burstSelectedPlayer;

    if (needEnemies === 1 && burstEnemies.length === 1)
      body.selectedEnemy = burstEnemies[0];
    else if (burstEnemies.length > 0)
      body.selectedEnemies = [...burstEnemies];

    if (needDivide && burstDivide.length > 0)
      body.divide = burstDivide.filter((d) => d.count > 0);
    if (needCharacter && burstSelectedChar) {
      body.selectedCharacter = burstSelectedChar;
    }
    send<GameUseBurstRequest>(body);
    dispatch(clearBurstSelection());
  }

  function handleCancel() {
    dispatch(clearBurstSelection());
  }

  const useBurstText = lang.service?.useBurst ?? "Use Burst";
  const cancelText = lang.service?.cancel ?? "Cancel";

  return (
    <div className={styles.wrap}>
      {needEnemies > 0 && (
        <div className={styles.hint}>
          Выберите врагов: {burstEnemies.length} / {needEnemies}
        </div>
      )}
      {needPlayer && (
        <div className={styles.hint}>
          {burstSelectedPlayer ? `Игрок: ${burstSelectedPlayer}` : "Выберите игрока"}
        </div>
      )}
      {needCharacter && (
        <div className={styles.selectCharacter}>
          <label>
            Персонаж:{" "}
            <select
              value={burstSelectedChar}
              onChange={(e) =>
                dispatch(
                  setBurstSelectedCharacter({ character: e.target.value })
                )
              }
            >
              <option value="">—</option>
              {allCharacterKeys.map((key) => (
                <option key={key} value={key}>
                  {characterNames[key] ?? key}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      {needDivide && (
        <div>
          <div className={styles.hint}>Распределите лечение по игрокам:</div>
          {allPlayersForDivide.map((p) => {
            const entry = burstDivide.find((d) => d.playerId === p.playerId);
            const count = entry?.count ?? 0;
            return (
              <div key={p.playerId} className={styles.divideRow}>
                <span>{p.playerId}</span>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={count}
                  onChange={(e) => {
                    const n = parseInt(e.target.value, 10) || 0;
                    const next = burstDivide.filter(
                      (d) => d.playerId !== p.playerId
                    );
                    if (n > 0) next.push({ playerId: p.playerId, count: n });
                    dispatch(setBurstDivide({ divide: next }));
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
      <div className={styles.buttons}>
        <button
          type="button"
          className="generalButton"
          onClick={handleConfirm}
          disabled={!canConfirm}
        >
          {useBurstText}
        </button>
        <button type="button" className="generalButton" onClick={handleCancel}>
          {cancelText}
        </button>
      </div>
    </div>
  );
}
