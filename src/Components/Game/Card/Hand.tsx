import { useEffect } from "react";
import { State, store } from "../../../redux";
import { finishEffect } from "../../../redux/effects";
import { sleep } from "../../../utils/sleep";
import { useSelector } from "react-redux";
import stylesHand from "./Hand.module.scss";
import stylesGame from "../Game.module.scss";
import Card from "./Card";
import CardTexture from "./CardTexture";
import { setHand } from "../../../redux/players";

export default function Hand() {
  const hand = useSelector((state: State) => state.players.me.hand);
  const drawEffect = useSelector((state: State) => state.effects.drawCards);
  const clearHand = useSelector((state: State) => state.effects.clearHand);
  const counter = useSelector((state: State) => state.effects.counter);

  useEffect(() => {
    (async () => {
      if (!drawEffect.isShown && !clearHand.isShown) return;

      await sleep(2000);

      if (clearHand.isShown) {
        store.dispatch(setHand({ cards: [] }));
      }

      if (drawEffect.isShown) {
        store.dispatch(setHand({ cards: drawEffect.cards }));
      }

      store.dispatch(finishEffect());
    })();
  }, [drawEffect.isShown, clearHand.isShown, counter]);

  if (clearHand.isShown) {
    return (
      <div>
        {hand.map((card, i) => (
          <div
            style={{ "--x": `${5 + (i + 0.5) * 15}vw` } as any}
            className={`${stylesHand.card} ${stylesHand.discard}`}
          >
            <CardTexture name={card.name} key={card.cardId} />
          </div>
        ))}
      </div>
    );
  }

  if (drawEffect.isShown) {
    return (
      <div>
        {drawEffect.cards.map((card, i) => (
          <div
            style={{ "--x": `${5 + (i + 0.5) * 15}vw` } as any}
            className={`${stylesHand.card} ${stylesHand.draw}`}
          >
            <CardTexture name={card.name} key={card.cardId} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={stylesGame.cards}>
      {hand.map((card) => (
        <Card {...card} key={card.cardId} />
      ))}
    </div>
  );
}
