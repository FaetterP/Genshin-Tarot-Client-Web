import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../../redux";
import { setDragonBreathTask } from "../../../redux/boss";
import { send } from "../../../ws";
import { GameDragonBreathResponseRequest } from "../../../types/request";
import { ECard } from "../../../types/enums";
import styles from "./DragonBreathModal.module.scss";

type Mode = "none" | "dash" | "discard";

export default function DragonBreathModal() {
  const dispatch = useDispatch();
  const task = useSelector((state: State) => state.boss.dragonBreathTask);
  const hand = useSelector((state: State) => state.players.me.hand);
  const cardNames = useSelector((state: State) => state.lang.cards.names);
  const t = useSelector((state: State) => state.lang.service);

  const [mode, setMode] = useState<Mode>("none");
  const [selectedDash, setSelectedDash] = useState<string | null>(null);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  if (!task) return null;

  const dashCards = hand.filter((c) => c.name === ECard.Dash);
  const actionCards = hand;

  function toggleCard(cardId: string) {
    setSelectedCards((prev) => {
      if (prev.includes(cardId)) return prev.filter((id) => id !== cardId);
      if (prev.length >= 4) return prev;
      return [...prev, cardId];
    });
  }

  function canSubmit(): boolean {
    if (mode === "none") return true;
    if (mode === "dash") return selectedDash !== null;
    if (mode === "discard") return selectedCards.length === 4;
    return false;
  }

  function handleSubmit() {
    if (!task || !canSubmit()) return;

    let req: GameDragonBreathResponseRequest;
    if (mode === "none") {
      req = { action: "game.dragonBreathResponse", taskId: task.taskId, type: "none" };
    } else if (mode === "dash" && selectedDash) {
      req = { action: "game.dragonBreathResponse", taskId: task.taskId, type: "dash", cardId: selectedDash };
    } else if (mode === "discard" && selectedCards.length === 4) {
      req = { action: "game.dragonBreathResponse", taskId: task.taskId, type: "discard", cardIds: selectedCards };
    } else {
      return;
    }

    send<GameDragonBreathResponseRequest>(req);
    dispatch(setDragonBreathTask(null));
    setMode("none");
    setSelectedDash(null);
    setSelectedCards([]);
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.fireBreath} aria-hidden="true" />

        <div className={styles.header}>
          <div className={styles.attackName}>{t.dragonBreathTitle}</div>
          <div className={styles.attackDesc}>
            {t.dragonBreathDesc}
          </div>
          <div className={styles.evadeHint}>
            {t.dragonBreathEvadeHint}
          </div>
        </div>

        <div className={styles.options}>
          <button
            className={`${styles.optionBtn} ${mode === "none" ? styles.selected : ""}`}
            onClick={() => setMode("none")}
          >
            <span className={styles.optionIcon}>💥</span>
            <span className={styles.optionTitle}>{t.dragonBreathTakeHit}</span>
            <span className={styles.optionSub}>{t.dragonBreathTakeHitSub}</span>
          </button>

          <button
            className={`${styles.optionBtn} ${mode === "dash" ? styles.selected : ""} ${dashCards.length === 0 ? styles.disabled : ""}`}
            onClick={() => dashCards.length > 0 && setMode("dash")}
          >
            <span className={styles.optionIcon}>💨</span>
            <span className={styles.optionTitle}>{t.dragonBreathDash}</span>
            <span className={styles.optionSub}>{t.dragonBreathDashSub}</span>
            {dashCards.length === 0 && <span className={styles.noneAvail}>{t.dragonBreathNoDash}</span>}
          </button>

          <button
            className={`${styles.optionBtn} ${mode === "discard" ? styles.selected : ""} ${hand.length < 4 ? styles.disabled : ""}`}
            onClick={() => hand.length >= 4 && setMode("discard")}
          >
            <span className={styles.optionIcon}>🃏</span>
            <span className={styles.optionTitle}>{t.dragonBreathDiscard4}</span>
            <span className={styles.optionSub}>{t.dragonBreathDiscard4Sub}</span>
            {hand.length < 4 && <span className={styles.noneAvail}>{t.dragonBreathNotEnough}</span>}
          </button>
        </div>

        {mode === "dash" && dashCards.length > 0 && (
          <div className={styles.cardPicker}>
            <div className={styles.pickerLabel}>{t.dragonBreathSelectDash}</div>
            <div className={styles.cardList}>
              {dashCards.map((card) => (
                <button
                  key={card.cardId}
                  className={`${styles.cardChip} ${selectedDash === card.cardId ? styles.cardSelected : ""}`}
                  onClick={() => setSelectedDash(card.cardId)}
                >
                  {cardNames[card.name] || card.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === "discard" && (
          <div className={styles.cardPicker}>
            <div className={styles.pickerLabel}>
              {t.dragonBreathSelectDiscard} ({selectedCards.length}/4):
            </div>
            <div className={styles.cardList}>
              {actionCards.map((card) => (
                <button
                  key={card.cardId}
                  className={`${styles.cardChip} ${selectedCards.includes(card.cardId) ? styles.cardSelected : ""}`}
                  onClick={() => toggleCard(card.cardId)}
                >
                  {cardNames[card.name] || card.name}
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
          {t.dragonBreathConfirm}
        </button>
      </div>
    </div>
  );
}
