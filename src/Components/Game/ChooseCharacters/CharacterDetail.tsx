import { useSelector } from "react-redux";
import { send } from "../../../ws";
import { State } from "../../../redux";
import { burstCosts } from "../../../storage/characters/burstCosts";
import { characterSkillCards } from "../../../storage/characters/cards";
import CompactCard from "../Card/CompactCard";
import styles from "./CharacterDetail.module.scss";
import {
  CharactersAddCharacterRequest,
  CharactersRemoveCharacterRequest,
} from "../../../types/request";
import type { ECard, ECharacter } from "../../../types/enums";

export default function CharacterDetail({ character }: { character: ECharacter }) {
  const name =
    useSelector((state: State) => state.lang.characters.names[character]) || character;
  const burst = useSelector((state: State) => state.lang.characters.bursts[character]);
  const burstName = burst?.name || `${character}.burst`;
  const description = burst?.description || `${character}.description`;
  const cost = burstCosts[character] ?? 0;
  const skillCards = characterSkillCards[character];

  const me = useSelector((state: State) =>
    state.players.players.find((p) => p.playerId === state.service.myPlayerId),
  );
  const isChosen = me?.characters.includes(character) ?? false;

  function addCharacter() {
    send<CharactersAddCharacterRequest>({ action: "characters.addCharacter", character });
  }

  function removeCharacter() {
    send<CharactersRemoveCharacterRequest>({ action: "characters.removeCharacter", character });
  }

  let costText = "";
  for (let i = 0; i < cost; i++) costText += "⚪";
  for (let i = 0; i < 10 - cost; i++) costText += "⚫";

  return (
    <div className={styles.detail}>
      <div className={styles.header}>
        <div className={styles.name}>{name}</div>
        <button
          className={`${styles.toggleButton} ${isChosen ? styles.remove : styles.add}`}
          onClick={isChosen ? removeCharacter : addCharacter}
        >
          {isChosen ? "Убрать" : "Добавить"}
        </button>
      </div>

      <div className={styles.burst}>
        <div className={styles.burstHeader}>
          <span className={styles.burstName}>{burstName}</span>
          <span className={styles.burstCost}>{costText}</span>
        </div>
        <div className={styles.burstDescription}>{description}</div>
      </div>

      {skillCards && (
        <div className={styles.skillCards}>
          <div className={styles.skillCardRow}>
            <div className={styles.miniCard}>
              <CompactCard card={skillCards.card1} />
            </div>
            <span className={styles.cardArrow}>⟫</span>
            <div className={styles.miniCard}>
              <CompactCard card={`${skillCards.card1}Plus` as ECard} />
            </div>
          </div>
          <div className={styles.skillCardRow}>
            <div className={styles.miniCard}>
              <CompactCard card={skillCards.card2} />
            </div>
            <span className={styles.cardArrow}>⟫</span>
            <div className={styles.miniCard}>
              <CompactCard card={`${skillCards.card2}Plus` as ECard} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
