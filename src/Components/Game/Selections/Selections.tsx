import { useSelector } from "react-redux";
import { State } from "../../../redux";
import { send } from "../../../ws";
import { useFormik } from "formik";
import styles from "./Selections.module.scss";
import { cards } from "../../../storage/cards/cards";
import CompactCard from "../Card/CompactCard";

type Request = {
  action: "game.useCard" | "game.upgradeCard";
  cardId: string;
  enemies?: string[];
  selectedPlayer?: string;
  isUseAlternative?: boolean;
};

export default function Selections() {
  const {
    needEnemies,
    isCanAlternative,
    selectedCard,
    enemies,
    selectedPlayer,
  } = useSelector((state: State) => state.card);
  const hand = useSelector((state: State) => state.players.me.hand);
  const selectedCardInHand = hand.find((c) => c.cardId === selectedCard);
  const canUpgrade =
    selectedCardInHand &&
    cards[selectedCardInHand.name] &&
    !cards[selectedCardInHand.name].isUpgraded;

  const formik = useFormik({
    initialValues: {
      isUseAlternative: false,
    },
    onSubmit: (values) => {
      const data: Request = { action: "game.useCard", cardId: selectedCard };
      if (needEnemies) {
        data.enemies = enemies;
      }
      if (selectedPlayer) {
        data.selectedPlayer = selectedCard;
      }

      data.isUseAlternative = values.isUseAlternative;

      send(data);
    },
  });

  const useAltText =
    useSelector((state: State) => state.lang.service.useAlt) ||
    "service.useAlt";
  const useCardText =
    useSelector((state: State) => state.lang.service.useCard) ||
    "service.useCard";
  const upgradeCardText =
    useSelector((state: State) => state.lang.service.upgradeCard) ||
    "service.upgradeCard";

  function handleUpgrade() {
    if (!selectedCard) return;
    send({ action: "game.upgradeCard", cardId: selectedCard });
  }

  if (!selectedCard) {
    return <></>;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      {isCanAlternative ? (
        <div className={styles.isCanAlternative}>
          <input
            id="isUseAlternative"
            name="isUseAlternative"
            type="checkbox"
            onChange={formik.handleChange}
            value={formik.values.isUseAlternative ? 1 : 0}
          ></input>
          <label>{useAltText}</label>
        </div>
      ) : (
        <></>
      )}
      <div className={styles.buttons}>
        <button type="submit" className="generalButton">{useCardText}</button>
        {canUpgrade && selectedCardInHand && (
          <div className={styles.upgradeButtonWrap}>
            <div className={styles.upgradeTooltip}>
              <div className={styles.miniCard}>
                <CompactCard name={selectedCardInHand.name} />
              </div>
              <span className={styles.cardArrow}>⟫</span>
              <div className={styles.miniCard}>
                <CompactCard name={`${selectedCardInHand.name}Plus`} />
              </div>
            </div>
            <button
              type="button"
              className="generalButton"
              onClick={handleUpgrade}
            >
              {upgradeCardText}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
