import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { State } from "../../../redux";
import CompactCard from "../Card/CompactCard";
import { CardPrimitive } from "../../../../types/general";
import styles from "./DiscardDeck.module.scss";

export default function DiscardDeck({ cards }: { cards: CardPrimitive[] }) {
  const cardNames = useSelector((state: State) => state.lang.cards.names);
  const panelRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<{
    name: string;
    panelRight: number;
    centerY: number;
  } | null>(null);

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
        <div className={styles.list}>
          {cards.map((card) => {
            const displayName = cardNames[card.name] || card.name;
            return (
              <div
                key={card.cardId}
                className={styles.card}
                onMouseEnter={() => handleMouseEnter(card)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {displayName}
              </div>
            );
          })}
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
            <CompactCard name={hoveredCard.name} />
          </div>,
          document.body
        )}
    </>
  );
}
