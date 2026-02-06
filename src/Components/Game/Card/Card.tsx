import { useDispatch, useSelector } from "react-redux";
import { CardPrimitive } from "../../../types/general";
import styles from "./Card.module.scss";
import { selectCard } from "../../../redux/card";
import { clearBurstSelection } from "../../../redux/burst";
import { State } from "../../../redux";
import CardTexture from "./CardTexture";
import { cards } from "../../../storage/cards/cards";

type Props = CardPrimitive & {
  upgrading?: { oldCard: CardPrimitive; newCard: CardPrimitive };
};

export default function Card(props: Props) {
  const { upgrading, cardId, name } = props;
  const dispatch = useDispatch();
  const canPlay = cards[name]?.canPlay === true;

  function select() {
    if (upgrading || !canPlay) return;
    dispatch(clearBurstSelection());
    dispatch(selectCard({ cardId, cardKey: name }));
  }

  const isSelected =
    useSelector((state: State) => state.card.selectedCard) === cardId;

  if (upgrading) {
    return (
      <div
        className={`${styles.canSelect} ${styles.upgrading}`}
        aria-hidden
      >
        <div className={styles.upgradingInner}>
          <div className={styles.upgradingOld}>
            <CardTexture name={upgrading.oldCard.name} />
          </div>
          <div className={styles.upgradingNew}>
            <CardTexture name={upgrading.newCard.name} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.canSelect} ${isSelected ? styles.selected : ""} ${!canPlay ? styles.cannotPlay : ""}`}
      onClick={select}
    >
      <CardTexture name={name} />
    </div>
  );
}
