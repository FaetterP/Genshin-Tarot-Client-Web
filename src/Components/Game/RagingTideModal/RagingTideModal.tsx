import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../../redux";
import { setRagingTideTask } from "../../../redux/ragingTide";
import { send } from "../../../ws";
import { GameRagingTideSelectResponseRequest } from "../../../types/request";
import styles from "./RagingTideModal.module.scss";

type Pair = { cardId: string; enemyId: string };

export default function RagingTideModal() {
  const dispatch = useDispatch();
  const task = useSelector((state: State) => state.ragingTide.task);
  const hand = useSelector((state: State) => state.players.me.hand);
  const enemies = useSelector((state: State) => state.players.me.enemies);
  const cardNames = useSelector((state: State) => state.lang.cards.names);
  const enemyNames = useSelector((state: State) => state.lang.enemies.names);
  const t = useSelector((state: State) => state.lang.service);

  const [pairs, setPairs] = useState<Pair[]>([]);

  if (!task) return null;

  const faceUpEnemies = enemies.filter((e) => !e.faceDown) as Extract<
    (typeof enemies)[number],
    { faceDown: false }
  >[];

  const selectedCardIds = pairs.map((p) => p.cardId);

  function toggleCard(cardId: string) {
    if (selectedCardIds.includes(cardId)) {
      setPairs((prev) => prev.filter((p) => p.cardId !== cardId));
    } else if (pairs.length < 3) {
      setPairs((prev) => [...prev, { cardId, enemyId: "" }]);
    }
  }

  function setEnemyForPair(cardId: string, enemyId: string) {
    setPairs((prev) => prev.map((p) => (p.cardId === cardId ? { ...p, enemyId } : p)));
  }

  function canSubmit(): boolean {
    return pairs.every((p) => p.enemyId !== "");
  }

  function handleSubmit() {
    if (!task || !canSubmit()) return;

    send<GameRagingTideSelectResponseRequest>({
      action: "game.ragingTideSelectResponse",
      taskId: task.taskId,
      selectedCards: pairs.map((p) => p.cardId),
      enemies: pairs.map((p) => p.enemyId),
    });

    dispatch(setRagingTideTask(null));
    setPairs([]);
  }

  function handleSkip() {
    if (!task) return;

    send<GameRagingTideSelectResponseRequest>({
      action: "game.ragingTideSelectResponse",
      taskId: task.taskId,
      selectedCards: [],
      enemies: [],
    });

    dispatch(setRagingTideTask(null));
    setPairs([]);
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.waveEffect} aria-hidden="true" />

        <div className={styles.header}>
          <div className={styles.title}>{t.ragingTideTitle}</div>
          <div className={styles.desc}>{t.ragingTideDesc}</div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionLabel}>{t.ragingTideHandLabel}</div>
          <div className={styles.cardGrid}>
            {hand.map((card) => {
              const isSelected = selectedCardIds.includes(card.cardId);
              const isDisabled = !isSelected && pairs.length >= 3;
              return (
                <button
                  key={card.cardId}
                  className={`${styles.cardChip} ${isSelected ? styles.cardSelected : ""} ${isDisabled ? styles.cardDisabled : ""}`}
                  onClick={() => toggleCard(card.cardId)}
                  disabled={isDisabled}
                >
                  {cardNames[card.name] || card.name}
                </button>
              );
            })}
          </div>
        </div>

        {pairs.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionLabel}>{t.ragingTideDiscardLabel}</div>
            <div className={styles.pairList}>
              {pairs.map((pair) => {
                const card = hand.find((c) => c.cardId === pair.cardId);
                return (
                  <div key={pair.cardId} className={styles.pairRow}>
                    <span className={styles.pairCardName}>
                      {card ? cardNames[card.name] || card.name : pair.cardId}
                    </span>
                    <span className={styles.pairArrow}>→</span>
                    {faceUpEnemies.length === 0 ? (
                      <span className={styles.noEnemies}>{t.ragingTideNoEnemies}</span>
                    ) : (
                      <select
                        className={`${styles.enemySelect} ${pair.enemyId === "" ? styles.enemySelectEmpty : ""}`}
                        value={pair.enemyId}
                        onChange={(e) => setEnemyForPair(pair.cardId, e.target.value)}
                      >
                        <option value="">{t.ragingTideSelectEnemy}</option>
                        {faceUpEnemies.map((enemy) => (
                          <option key={enemy.id} value={enemy.id}>
                            {enemyNames[enemy.name] || enemy.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <button className={styles.skipBtn} onClick={handleSkip}>
            {t.ragingTideSkip}
          </button>
          <button
            className={`${styles.confirmBtn} ${!canSubmit() || pairs.length === 0 ? styles.confirmDisabled : ""}`}
            onClick={handleSubmit}
            disabled={!canSubmit() || pairs.length === 0}
          >
            {t.ragingTideConfirm} {pairs.length > 0 ? `(${pairs.length})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}
