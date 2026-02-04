import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { State } from "../../../redux";
import CompactCard from "../Card/CompactCard";
import styles from "./DrawDeck.module.scss";
import { CardPrimitive } from "../../../../types/general";

export default function DrawDeck({ cards }: { cards: CardPrimitive[] }) {
  const cardNames = useSelector((state: State) => state.lang.cards.names);
  const panelRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<{
    name: string;
    panelLeft: number;
    centerY: number;
  } | null>(null);

  function handleMouseEnter(card: CardPrimitive) {
    const panel = panelRef.current;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    setHoveredCard({
      name: card.name,
      panelLeft: rect.left,
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
                "--panel-left": `${hoveredCard.panelLeft}px`,
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
