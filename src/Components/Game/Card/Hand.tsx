import { useSelector } from "react-redux";
import { State } from "../../../redux";
import stylesGame from "../Game.module.scss";
import Card from "./Card";

export default function Hand() {
  const hand = useSelector((state: State) => state.players.me.hand);
  const animatingUpgradeCard = useSelector(
    (state: State) => state.stepAnimation.animatingUpgradeCard
  );

  const isStacked = hand.length > 5;

  return (
    <div
      className={`${stylesGame.cards} ${isStacked ? stylesGame.cardsStacked : ""}`}
    >
      {hand.map((card) => (
        <Card
          {...card}
          key={card.cardId}
          upgrading={
            animatingUpgradeCard?.oldCard.cardId === card.cardId
              ? animatingUpgradeCard
              : undefined
          }
        />
      ))}
    </div>
  );
}
