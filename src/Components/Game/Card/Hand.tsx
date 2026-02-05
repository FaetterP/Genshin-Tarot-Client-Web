import { useEffect } from "react";
import { State, store } from "../../../redux";
import { finishEffect } from "../../../redux/effects";
import { useSelector } from "react-redux";
import stylesGame from "../Game.module.scss";
import Card from "./Card";
import { setHand } from "../../../redux/players";

export default function Hand() {
  const myId = useSelector((state: State) => state.players.me.playerId);
  const hand = useSelector((state: State) => state.players.me.hand);
  const drawEffect = useSelector((state: State) => state.effects.drawCards);
  const clearHand = useSelector((state: State) => state.effects.clearHand);
  const counter = useSelector((state: State) => state.effects.counter);
  const animatingUpgradeCard = useSelector(
    (state: State) => state.stepAnimation.animatingUpgradeCard
  );

  useEffect(() => {
    if (!drawEffect.isShown && !clearHand.isShown) return;

    if (drawEffect.player === myId || clearHand.player === myId) {
      if (clearHand.isShown) {
        store.dispatch(setHand({ cards: [] }));
      }
      if (drawEffect.isShown) {
        store.dispatch(setHand({ cards: drawEffect.cards }));
      }
    }
    store.dispatch(finishEffect());
  }, [...Object.values(drawEffect), ...Object.values(clearHand), counter]);

  return (
    <div className={stylesGame.cards}>
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
