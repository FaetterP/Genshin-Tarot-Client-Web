import { useSelector } from "react-redux";
import { State } from "../../../redux";
import type { AddCardDestination } from "../../../redux/stepAnimation";
import type { ECard } from "../../../types/enums";
import CardTexture from "../Card/CardTexture";
import styles from "./CardAnimationOverlay.module.scss";

const addCardClassMap: Record<AddCardDestination, string> = {
  hand: styles.addToHand,
  deck: styles.addToDeck,
  discard: styles.addToDiscard,
};

const SHATTER_FRAGMENTS = [
  { clipPath: "polygon(0% 0%, 50% 0%, 50% 33%, 0% 33%)",   tx: "-120px", ty: "-150px", r: "-35deg" },
  { clipPath: "polygon(50% 0%, 100% 0%, 100% 33%, 50% 33%)", tx: "120px",  ty: "-150px", r: "35deg"  },
  { clipPath: "polygon(0% 33%, 50% 33%, 50% 67%, 0% 67%)",  tx: "-170px", ty: "15px",   r: "-20deg" },
  { clipPath: "polygon(50% 33%, 100% 33%, 100% 67%, 50% 67%)", tx: "170px", ty: "15px",  r: "20deg"  },
  { clipPath: "polygon(0% 67%, 50% 67%, 50% 100%, 0% 100%)", tx: "-110px", ty: "150px",  r: "-45deg" },
  { clipPath: "polygon(50% 67%, 100% 67%, 100% 100%, 50% 100%)", tx: "110px", ty: "150px", r: "45deg" },
];

function FullSizeCardTexture({ name }: { name: ECard }) {
  return <CardTexture card={name} />;
}

export default function CardAnimationOverlay() {
  const animatingTrashCards = useSelector(
    (state: State) => state.stepAnimation.animatingTrashCards,
  );
  const animatingDiscardCards = useSelector(
    (state: State) => state.stepAnimation.animatingDiscardCards,
  );
  const animatingDrawCards = useSelector((state: State) => state.stepAnimation.animatingDrawCards);
  const animatingAddCard = useSelector((state: State) => state.stepAnimation.animatingAddCard);
  const animatingUpgradeCard = useSelector(
    (state: State) => state.stepAnimation.animatingUpgradeCard,
  );

  const hasAnimation =
    (animatingTrashCards?.length ?? 0) > 0 ||
    (animatingDiscardCards?.length ?? 0) > 0 ||
    (animatingDrawCards?.length ?? 0) > 0 ||
    (animatingAddCard !== null && animatingUpgradeCard === null);

  if (!hasAnimation) return null;

  return (
    <div className={styles.overlay}>
      {animatingTrashCards?.map((card) => (
        <div key={card.cardId} className={styles.shatterContainer}>
          {SHATTER_FRAGMENTS.map((fragment, i) => (
            <div
              key={i}
              className={styles.shatterFragment}
              style={
                {
                  clipPath: fragment.clipPath,
                  "--tx": fragment.tx,
                  "--ty": fragment.ty,
                  "--r": fragment.r,
                } as React.CSSProperties
              }
            >
              <FullSizeCardTexture name={card.name} />
            </div>
          ))}
        </div>
      ))}

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
