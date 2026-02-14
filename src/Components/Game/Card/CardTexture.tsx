import { useSelector } from "react-redux";
import { State } from "../../../redux";
import styles from "./Card.module.scss";
import { cards } from "../../../storage/cards/cards";
import { ECard, ECardType } from "../../../types/enums";

type PropsType = {
  card: ECard;
};

export default function CardTexture(props: PropsType) {
  const { cost, isUpgraded, cardType } = cards[props.card] || {
    cost: -1,
    isUpgraded: false,
    cardType: ECardType.Skill,
  };
  const cardTypeIcon =
    cardType === ECardType.Attack ? "🗡️" : cardType === ECardType.Skill ? "✨" : "";
  const name =
    useSelector((state: State) => state.lang.cards.names[props.card]) || `${props.card}.name`;

  const description =
    useSelector((state: State) => state.lang.cards.descriptions[props.card]) ||
    `${props.card}.description`;

  const reactionLight = props.card === ECard.Dash || props.card === ECard.Overheat;
  const reactionDark = props.card === ECard.Burn || props.card === ECard.Freeze;
  const blockClass = reactionLight
    ? `${styles.cardBlock} ${styles.cardBlockLight}`
    : reactionDark
      ? `${styles.cardBlock} ${styles.cardBlockDark}`
      : styles.cardBlock;

  let costText = "";
  for (let i = 0; i < 3 - cost; i++) {
    costText += "◻";
  }
  for (let i = 0; i < cost; i++) {
    costText += "⬜";
  }

  return (
    <div className={blockClass}>
      <div className={styles.costRow}>
        <span className={styles.cardTypeIcon}>{cardTypeIcon}</span>
        <div className={styles.cost}>{costText}</div>
      </div>
      <div className={styles[isUpgraded ? "upgradedName" : "name"]}>{name}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}
