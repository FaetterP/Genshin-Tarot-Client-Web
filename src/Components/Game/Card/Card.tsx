import { useDispatch, useSelector } from "react-redux";
import { CardPrimitive } from "../../../../types/general";
import styles from "./Card.module.scss";
import { selectCard } from "../../../redux/card";
import { State } from "../../../redux";
import CardTexture from "./CardTexture";

export default function Card(props: CardPrimitive) {
  const dispatch = useDispatch();

  function select() {
    dispatch(selectCard({ cardId: props.cardId, cardKey: props.name }));
  }

  const isSelected =
    useSelector((state: State) => state.card.selectedCard) === props.cardId;

  return (
    <div
      className={`${styles.canSelect} ${isSelected ? styles.selected : ""}`}
      onClick={select}
    >
      <CardTexture name={props.name} />
    </div>
  );
}
