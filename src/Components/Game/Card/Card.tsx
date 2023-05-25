import { useDispatch, useSelector } from "react-redux";
import { CardPrimitive } from "../../../../types/general";
import { cards } from "../../../storage/cards/cards";
import styles from "./Card.module.scss";
import { selectCard } from "../../../redux/card";
import { State } from "../../../redux";

export default function Card(props: CardPrimitive) {
  const dispatch = useDispatch();
  const { cost, isUpgraded } = cards[props.name] || {
    cost: -1,
    isUpgraded: false,
  };
  const name =
    useSelector((state: State) => state.lang.cards.names[props.name]) ||
    `${props.name}.name`;

  const description =
    useSelector((state: State) => state.lang.cards.descriptions[props.name]) ||
    `${props.name}.description`;

  let costText = "";
  for (let i = 0; i < 3 - cost; i++) {
    costText += "◻";
  }
  for (let i = 0; i < cost; i++) {
    costText += "⬜";
  }

  function select() {
    dispatch(selectCard({ cardId: props.cardId, cardKey: props.name }));
  }

  const isSelected =
    useSelector((state: State) => state.card.selectedCard) === props.cardId;

  return (
    <div
      className={`${styles.cardBlock} ${isSelected ? styles.selected : ""}`}
      onClick={select}
    >
      <div className={styles.cost}>{costText}</div>
      <div className={styles[isUpgraded ? "upgradedName" : "name"]}>{name}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}
