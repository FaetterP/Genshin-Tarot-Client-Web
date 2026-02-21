import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { State } from "../../../redux";
import { setSelectedCardForEffect, type CardSource } from "../../../redux/card";
import { send } from "../../../ws";
import { useFormik } from "formik";
import styles from "./Selections.module.scss";
import { cards } from "../../../storage/cards/cards";
import CompactCard from "../Card/CompactCard";
import { GameUpgradeCardRequest, GameUseCardRequest } from "../../../types/request";
import type { CardPrimitive } from "../../../types/general";
import type { ECard } from "../../../types/enums";

export default function Selections() {
  const dispatch = useDispatch();
  const {
    needEnemies,
    needEnemiesMax,
    isCanAlternative,
    selectedCard,
    selectedCardForEffect,
    isNeedCardFrom,
    enemies,
    selectedPlayer,
  } = useSelector((state: State) => state.card);
  const cardNames = useSelector((state: State) => state.lang.cards.names);
  const hand = useSelector((state: State) => state.players.me.hand);
  const discard = useSelector((state: State) => state.players.me.discard);
  const deck = useSelector((state: State) => state.players.me.deck);
  const selectedCardInHand = hand.find((c) => c.cardId === selectedCard);
  const canPlayCard = selectedCardInHand && cards[selectedCardInHand.name]?.canPlay === true;
  const canUpgrade = selectedCardInHand && cards[selectedCardInHand.name]?.canUpgrade === true;

  const isNeedPlayer = useSelector((state: State) => state.card.isNeedPlayer);
  const isCanSelectItself = selectedCardInHand
    ? cards[selectedCardInHand.name]?.isCanSelectItself !== false
    : true;
  const deckForSelect = isNeedCardFrom.includes("deck")
    ? [...deck].sort((a, b) => {
        const aPos = a.deckPosition ?? Infinity;
        const bPos = b.deckPosition ?? Infinity;
        return aPos - bPos;
      })
    : [];
  const selectableCardsForEffect: { card: CardPrimitive; source: CardSource }[] = [
    ...(isNeedCardFrom.includes("hand")
      ? hand.map((card) => ({ card, source: "hand" as CardSource }))
      : []),
    ...(isNeedCardFrom.includes("discard")
      ? discard.map((card) => ({ card, source: "discard" as CardSource }))
      : []),
    ...(isNeedCardFrom.includes("deck")
      ? deckForSelect.map((card) => ({ card, source: "deck" as CardSource }))
      : []),
  ].filter(({ card }) => isCanSelectItself || card.cardId !== selectedCard);
  const isSelectedCardForEffectValid =
    !selectedCardForEffect ||
    selectableCardsForEffect.some(({ card }) => card.cardId === selectedCardForEffect);
  const canSubmitCard =
    canPlayCard &&
    (!isNeedPlayer || !!selectedPlayer) &&
    (!needEnemies || (enemies.length >= needEnemies && (!needEnemiesMax || enemies.length <= needEnemiesMax))) &&
    (!isNeedCardFrom?.length || isSelectedCardForEffectValid);

  const formik = useFormik({
    initialValues: {
      isUseAlternative: false,
    },
    onSubmit: (values) => {
      const data: GameUseCardRequest = { action: "game.useCard", cardId: selectedCard };
      if (needEnemies) {
        data.enemies = enemies;
      }
      if (selectedPlayer) {
        data.selectedPlayer = selectedPlayer;
      }
      if (selectedCardForEffect) {
        data.selectedCard = selectedCardForEffect;
      }

      data.isUseAlternative = values.isUseAlternative;

      send<GameUseCardRequest>(data);
    },
  });

  const useAltText = useSelector((state: State) => state.lang.service.useAlt) || "service.useAlt";
  const useCardText =
    useSelector((state: State) => state.lang.service.useCard) || "service.useCard";
  const upgradeCardText =
    useSelector((state: State) => state.lang.service.upgradeCard) || "service.upgradeCard";

  function handleUpgrade() {
    if (!selectedCard) return;
    send<GameUpgradeCardRequest>({ action: "game.upgradeCard", cardId: selectedCard });
  }

  const [cardDropdownOpen, setCardDropdownOpen] = useState(false);
  const cardDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardDropdownOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (cardDropdownRef.current && !cardDropdownRef.current.contains(e.target as Node)) {
        setCardDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cardDropdownOpen]);

  if (!selectedCard) {
    return <></>;
  }

  const selectedCardLabel = selectedCardForEffect
    ? selectableCardsForEffect.find(({ card }) => card.cardId === selectedCardForEffect)
    : null;
  const selectedCardDisplayName = selectedCardLabel
    ? (() => {
        const base = cardNames[selectedCardLabel.card.name] || selectedCardLabel.card.name;
        return selectedCardLabel.source === "deck" && selectedCardLabel.card.deckPosition != null
          ? `#${selectedCardLabel.card.deckPosition} ${base}`
          : base;
      })()
    : "—";

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
      {canPlayCard && isNeedCardFrom?.length > 0 && (
        <div className={styles.cardSelectWrap} ref={cardDropdownRef}>
          <label>Выберите карту:</label>
          <div className={styles.cardSelectTrigger} onClick={() => setCardDropdownOpen((v) => !v)}>
            {selectedCardDisplayName}
          </div>
          {cardDropdownOpen && (
            <div className={styles.cardSelectList}>
              <button
                type="button"
                className={styles.cardSelectOption}
                onClick={() => {
                  dispatch(setSelectedCardForEffect({ cardId: "" }));
                  setCardDropdownOpen(false);
                }}
              >
                —
              </button>
              {selectableCardsForEffect.map(({ card, source }) => {
                const baseName = cardNames[card.name] || card.name;
                const displayName =
                  source === "deck" && card.deckPosition != null
                    ? `#${card.deckPosition} ${baseName}`
                    : baseName;
                return (
                  <button
                    key={card.cardId}
                    type="button"
                    className={styles.cardSelectOption}
                    onClick={() => {
                      dispatch(setSelectedCardForEffect({ cardId: card.cardId }));
                      setCardDropdownOpen(false);
                    }}
                  >
                    {displayName}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
      <div className={styles.buttons}>
        {canPlayCard && (
          <button type="submit" className="generalButton" disabled={!canSubmitCard}>
            {useCardText}
          </button>
        )}
        {canUpgrade && selectedCardInHand && (
          <div className={styles.upgradeButtonWrap}>
            <div className={styles.upgradeTooltip}>
              <div className={styles.miniCard}>
                <CompactCard card={selectedCardInHand.name} />
              </div>
              <span className={styles.cardArrow}>⟫</span>
              <div className={styles.miniCard}>
                <CompactCard card={`${selectedCardInHand.name}Plus` as ECard} />
              </div>
            </div>
            <button type="button" className="generalButton" onClick={handleUpgrade}>
              {upgradeCardText}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
