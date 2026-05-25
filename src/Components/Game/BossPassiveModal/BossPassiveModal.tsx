import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../../redux";
import { setBossPassiveTask } from "../../../redux/boss";
import { send } from "../../../ws";
import { GameBossPassiveResponseRequest } from "../../../types/request";
import { ECardType } from "../../../types/enums";
import styles from "./BossPassiveModal.module.scss";

export default function BossPassiveModal() {
  const dispatch = useDispatch();
  const task = useSelector((state: State) => state.boss.bossPassiveTask);
  const cardNames = useSelector((state: State) => state.lang.cards.names);
  const t = useSelector((state: State) => state.lang.service);

  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  if (!task) return null;

  const actionCards = task.hand.filter(
    (c) => c.type === ECardType.Attack || c.type === ECardType.Skill,
  );

  function toggleCard(cardId: string) {
    setSelectedCards((prev) => {
      if (prev.includes(cardId)) return prev.filter((id) => id !== cardId);
      if (prev.length >= 2) return prev;
      return [...prev, cardId];
    });
  }

  function handleLoseAP() {
    if (!task) return;
    send<GameBossPassiveResponseRequest>({
      action: "game.bossPassiveResponse",
      taskId: task.taskId,
      type: "loseAP",
    });
    dispatch(setBossPassiveTask(null));
    setSelectedCards([]);
  }

  function handleDiscard() {
    if (!task || selectedCards.length !== 2) return;
    send<GameBossPassiveResponseRequest>({
      action: "game.bossPassiveResponse",
      taskId: task.taskId,
      type: "discard",
      cardIds: [selectedCards[0], selectedCards[1]],
    });
    dispatch(setBossPassiveTask(null));
    setSelectedCards([]);
  }

  const canDiscard = selectedCards.length === 2;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.windEffect} aria-hidden="true" />

        <div className={styles.header}>
          <div className={styles.passiveName}>{t.bossPassiveName}</div>
          <div className={styles.passiveDesc}>
            {t.bossPassiveDesc}
          </div>
        </div>

        <div className={styles.separator} />

        <div className={styles.section}>
          <div className={styles.sectionTitle}>{t.bossPassiveDiscardTitle}</div>
          {actionCards.length >= 2 ? (
            <>
              <div className={styles.cardList}>
                {actionCards.map((card) => (
                  <button
                    key={card.cardId}
                    className={`${styles.cardChip} ${selectedCards.includes(card.cardId) ? styles.cardSelected : ""}`}
                    onClick={() => toggleCard(card.cardId)}
                  >
                    <span className={styles.cardTypeBadge}>
                      {card.type === ECardType.Attack ? "⚔" : "✨"}
                    </span>
                    {cardNames[card.name] || card.name}
                  </button>
                ))}
              </div>
              <button
                className={`${styles.discardBtn} ${!canDiscard ? styles.btnDisabled : ""}`}
                onClick={handleDiscard}
                disabled={!canDiscard}
              >
                {t.bossPassiveDiscardBtn} ({selectedCards.length}/2)
              </button>
            </>
          ) : (
            <div className={styles.notEnough}>
              {t.bossPassiveNotEnough}
            </div>
          )}
        </div>

        <div className={styles.separator} />

        <div className={styles.section}>
          <div className={styles.sectionTitle}>{t.bossPassiveLoseTitle}</div>
          <button className={styles.loseApBtn} onClick={handleLoseAP}>
            {t.bossPassiveLoseBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
