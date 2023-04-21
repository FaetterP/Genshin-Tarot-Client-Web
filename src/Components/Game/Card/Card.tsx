import { CardPrimitive } from "../../../../types/general";
import { cards } from "../../../storage/Cards/cards";
import { rusCards } from "../../../storage/Cards/names";
import styles from "./Card.module.scss";

export default function Card(props: CardPrimitive) {
  const { cost, isUpgraded } = cards[props.name];
  const name = rusCards[props.name];
  const description =
    "description description description description description";

  let costText = "";
  for (let i = 0; i < 3 - cost; i++) {
    costText += "◻";
  }
  for (let i = 0; i < cost; i++) {
    costText += "⬜";
  }

  return (
    <div className={styles.cardBlock}>
      <div className={styles.cost}>{costText}</div>
      <div className={styles[isUpgraded ? "upgradedName" : "name"]}>{name}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}
