import { useSelector } from "react-redux";
import { State } from "../../../redux";
import { cards } from "../../../storage/cards/cards";
import { ECard, ECardType } from "../../../types/enums";
import styles from "./CompactCard.module.scss";

type PropsType = {
  card: ECard;
};

export default function CompactCard(props: PropsType) {
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
  const cardClass = reactionLight ? styles.cardLight : reactionDark ? styles.cardDark : styles.card;

  let costText = "";
  for (let i = 0; i < 3 - cost; i++) {
    costText += "◻";
  }
  for (let i = 0; i < cost; i++) {
    costText += "⬜";
  }

  return (
    <div className={cardClass}>
      <div className={styles.costRow}>
        <span className={styles.cardTypeIcon}>{cardTypeIcon}</span>
        <div className={styles.cost}>{costText}</div>
      </div>
      <div className={isUpgraded ? styles.upgradedName : styles.name}>{name}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}
