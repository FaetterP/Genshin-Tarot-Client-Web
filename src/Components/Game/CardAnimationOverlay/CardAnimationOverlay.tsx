import { useSelector } from "react-redux";
import { State } from "../../../redux";
import type { AddCardDestination } from "../../../redux/stepAnimation";
import CardTexture from "../Card/CardTexture";
import styles from "./CardAnimationOverlay.module.scss";

const addCardClassMap: Record<AddCardDestination, string> = {
  hand: styles.addToHand,
  deck: styles.addToDeck,
  discard: styles.addToDiscard,
};

function FullSizeCardTexture({ name }: { name: string }) {
  return <CardTexture name={name} />;
}

export default function CardAnimationOverlay() {
  const animatingDiscardCards = useSelector(
    (state: State) => state.stepAnimation.animatingDiscardCards
  );
  const animatingDrawCards = useSelector(
    (state: State) => state.stepAnimation.animatingDrawCards
  );
  const animatingAddCard = useSelector(
    (state: State) => state.stepAnimation.animatingAddCard
  );
  const animatingUpgradeCard = useSelector(
    (state: State) => state.stepAnimation.animatingUpgradeCard
  );

  const hasAnimation =
    (animatingDiscardCards?.length ?? 0) > 0 ||
    (animatingDrawCards?.length ?? 0) > 0 ||
    (animatingAddCard !== null && animatingUpgradeCard === null);

  if (!hasAnimation) return null;

  return (
    <div className={styles.overlay}>
      {animatingDiscardCards?.map((card, i) => (
        <div
          className={`${styles.card} ${styles.discard}`}
          key={card.cardId}
          style={
            {
              "--x": `${5 + (i + 0.5) * 15}vw`,
            } as React.CSSProperties
          }
        >
          <FullSizeCardTexture name={card.name} />
        </div>
      ))}

      {animatingDrawCards?.map((card, i) => (
        <div
          key={card.cardId}
          className={`${styles.card} ${styles.draw}`}
          style={
            {
              "--x": `${5 + (i + 0.5) * 15}vw`,
            } as React.CSSProperties
          }
        >
          <FullSizeCardTexture name={card.name} />
        </div>
      ))}

      {animatingAddCard && !animatingUpgradeCard && (
        <div
          className={`${styles.card} ${addCardClassMap[animatingAddCard.to]}`}
          key={animatingAddCard.card.cardId}
        >
          <FullSizeCardTexture name={animatingAddCard.card.name} />
        </div>
      )}
    </div>
  );
}
