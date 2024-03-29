import { useSelector } from "react-redux";
import { State } from "../../../redux";
import styles from "./Card.module.scss";
import { cards } from "../../../storage/cards/cards";

type PropsType = {
  name: string;
};

export default function CardTexture(props: PropsType) {
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

  return (
    <div className={`${styles.cardBlock}`}>
      <div className={styles.cost}>{costText}</div>
      <div className={styles[isUpgraded ? "upgradedName" : "name"]}>{name}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}
