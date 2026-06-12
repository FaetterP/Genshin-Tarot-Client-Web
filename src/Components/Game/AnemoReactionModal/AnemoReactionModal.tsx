import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../../redux";
import { setAnemoReactionTask } from "../../../redux/anemoReaction";
import { send } from "../../../ws";
import { GameAnemoReactionResponseRequest } from "../../../types/request";
import styles from "./AnemoReactionModal.module.scss";

export default function AnemoReactionModal() {
  const dispatch = useDispatch();
  const task = useSelector((state: State) => state.anemoReaction.task);
  const me = useSelector((state: State) => state.players.me);
  const other = useSelector((state: State) => state.players.other);
  const t = useSelector((state: State) => state.lang.service);

  const [isHeal, setIsHeal] = useState(false);
  const [targetPlayerId, setTargetPlayerId] = useState("");

  if (!task) return null;

  const allPlayers = me?.playerId ? [me, ...other] : other;

  function canSubmit(): boolean {
    if (!isHeal) return true;
    return targetPlayerId !== "";
  }

  function handleSubmit() {
    if (!task || !canSubmit()) return;

    let req: GameAnemoReactionResponseRequest;
    if (isHeal) {
      req = { action: "game.anemoReactionResponse", taskId: task.taskId, isHeal: true, targetPlayerId };
    } else {
      req = { action: "game.anemoReactionResponse", taskId: task.taskId, isHeal: false };
    }

    send<GameAnemoReactionResponseRequest>(req);
    dispatch(setAnemoReactionTask(null));
    setIsHeal(false);
    setTargetPlayerId("");
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.windEffect} aria-hidden="true" />

        <div className={styles.header}>
          <div className={styles.title}>{t.anemoReactionTitle}</div>
          <div className={styles.desc}>{t.anemoReactionDesc}</div>
        </div>

        <div className={styles.options}>
          <button
            className={`${styles.optionBtn} ${!isHeal ? styles.selected : ""}`}
            onClick={() => setIsHeal(false)}
          >
            <span className={styles.optionIcon}>💨</span>
            <span className={styles.optionTitle}>{t.anemoReactionDash}</span>
            <span className={styles.optionSub}>{t.anemoReactionDashSub}</span>
          </button>

          <button
            className={`${styles.optionBtn} ${isHeal ? styles.selected : ""}`}
            onClick={() => setIsHeal(true)}
          >
            <span className={styles.optionIcon}>💚</span>
            <span className={styles.optionTitle}>{t.anemoReactionHeal}</span>
            <span className={styles.optionSub}>{t.anemoReactionHealSub}</span>
          </button>
        </div>

        {isHeal && (
          <div className={styles.playerPicker}>
            <div className={styles.pickerLabel}>{t.anemoReactionSelectPlayer}</div>
            <div className={styles.playerList}>
              {allPlayers.map((player) => (
                <button
                  key={player.playerId}
                  className={`${styles.playerChip} ${targetPlayerId === player.playerId ? styles.playerSelected : ""}`}
                  onClick={() => setTargetPlayerId(player.playerId)}
                >
                  {player.playerId === me?.playerId ? t.meLabel : player.playerId}
                  <span className={styles.playerHp}> ({player.hp} HP)</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          className={`${styles.confirmBtn} ${!canSubmit() ? styles.confirmDisabled : ""}`}
          onClick={handleSubmit}
          disabled={!canSubmit()}
        >
          {t.anemoReactionConfirm}
        </button>
      </div>
    </div>
  );
}
