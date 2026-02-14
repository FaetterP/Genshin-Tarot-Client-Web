import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { State } from "../../../redux";
import CompactCard from "../Card/CompactCard";
import { CardPrimitive } from "../../../types/general";
import type { ECard } from "../../../types/enums";
import styles from "./DiscardDeck.module.scss";

const ENTER_DURATION_MS = 350;
const LIST_RESIZE_DURATION_MS = 300;

export default function DiscardDeck({ cards }: { cards: CardPrimitive[] }) {
  const cardNames = useSelector((state: State) => state.lang.cards.names);
  const selectedCardForEffect = useSelector((state: State) => state.card.selectedCardForEffect);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const prevCardsRef = useRef<CardPrimitive[]>([]);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hoveredCard, setHoveredCard] = useState<{
    name: ECard;
    panelRight: number;
    centerY: number;
  } | null>(null);
  const [exitingCards, setExitingCards] = useState<CardPrimitive[]>([]);
  const [enteringIds, setEnteringIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const prev = prevCardsRef.current;
    const prevIds = new Set(prev.map((c) => c.cardId));
    const currentIds = new Set(cards.map((c) => c.cardId));
    const added = cards.filter((c) => !prevIds.has(c.cardId));
    const removed = prev.filter((c) => !currentIds.has(c.cardId));
    if (added.length > 0 && prev.length > 0) {
      setEnteringIds((s) => new Set([...Array.from(s), ...added.map((c) => c.cardId)]));
    }
    if (removed.length > 0) {
      setExitingCards((prevExiting) => [...prevExiting, ...removed]);
    }
    prevCardsRef.current = [...cards];
  }, [cards]);

  useEffect(() => {
    if (enteringIds.size === 0) return;
    const t = setTimeout(() => setEnteringIds(new Set()), ENTER_DURATION_MS);
    return () => clearTimeout(t);
  }, [enteringIds]);

  const handleExitAnimationEnd = (cardId: string) => {
    const list = listRef.current;
    if (list) {
      list.style.height = `${list.getBoundingClientRect().height}px`;
      list.classList.add(styles.listResizing);
    }
    setExitingCards((prev) => prev.filter((c) => c.cardId !== cardId));
  };

  useEffect(() => {
    const list = listRef.current;
    if (!list || !list.style.height || list.style.height === "auto") return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        list.style.height = `${list.scrollHeight}px`;
        const t = setTimeout(() => {
          list.style.height = "";
          list.classList.remove(styles.listResizing);
        }, LIST_RESIZE_DURATION_MS);
        resizeTimeoutRef.current = t;
      });
    });
    return () => {
      cancelAnimationFrame(raf);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, [exitingCards]);

  function handleMouseEnter(card: CardPrimitive) {
    const panel = panelRef.current;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    setHoveredCard({
      name: card.name,
      panelRight: rect.right,
      centerY: rect.top + rect.height / 2,
    });
  }

  return (
    <>
      <div ref={panelRef} className={styles.panel}>
        <div ref={listRef} className={styles.list}>
          {exitingCards.map((card) => (
            <div
              key={`exiting-${card.cardId}`}
              className={`${styles.card} ${styles.cardExiting}`}
              onAnimationEnd={() => handleExitAnimationEnd(card.cardId)}
            >
              {cardNames[card.name] || card.name}
            </div>
          ))}
          {cards.map((card) => (
            <div
              key={card.cardId}
              className={`${styles.card} ${enteringIds.has(card.cardId) ? styles.cardEntering : ""} ${selectedCardForEffect === card.cardId ? styles.cardSelectedForEffect : ""}`}
              onMouseEnter={() => handleMouseEnter(card)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {cardNames[card.name] || card.name}
            </div>
          ))}
        </div>
      </div>
      {hoveredCard &&
        createPortal(
          <div
            className={styles.cardPreviewPortal}
            style={
              {
                "--panel-right": `${hoveredCard.panelRight}px`,
                "--center-y": `${hoveredCard.centerY}px`,
              } as React.CSSProperties
            }
          >
            <CompactCard card={hoveredCard.name} />
          </div>,
          document.body,
        )}
    </>
  );
}
