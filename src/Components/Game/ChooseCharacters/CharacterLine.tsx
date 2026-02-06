import { useSelector } from "react-redux";
import { send } from "../../../ws";
import { State } from "../../../redux";
import { characterSkillCards } from "../../../storage/characters/cards";
import CompactCard from "../Card/CompactCard";
import styles from "./CharacterLine.module.scss";
import { CharactersAddCharacterRequest, CharactersRemoveCharacterRequest } from "../../../types/request";

export default function CharacterLine({ character }: { character: string }) {
  function addCharacter() {
    send<CharactersAddCharacterRequest>({
      action: "characters.addCharacter",
      character,
    });
  }

  function removeCharacter() {
    send<CharactersRemoveCharacterRequest>({
      action: "characters.removeCharacter",
      character,
    });
  }

  function clickCharacter() {
    if (isCharacterChosen) {
      removeCharacter();
    } else {
      addCharacter();
    }
  }

  const name =
    useSelector((state: State) => state.lang.characters.names[character]) ||
    `${character}.name`;
  const {
    name: burstName,
    description,
    cost,
  } = useSelector(
    (state: State) => state.lang.characters.bursts[character]
  ) || {
      name: `${character}.burst`,
      description: `${character}.description`,
      cost: 0,
    };

  const me = useSelector((state: State) => {
    return state.players.players.find(
      (player) => player.playerId === state.service.myPlayerId
    )!;
  });
  if (!me) return <></>;

  const isCharacterChosen = me.characters.includes(character);

  const skillCards = characterSkillCards[character];

  let costText = "";
  for (let i = 0; i < cost; i++) {
    costText += "⚪";
  }
  for (let i = 0; i < 10 - cost; i++) {
    costText += "⚫";
  }

  return (
    <div
      className={`${styles.characterBlock} ${isCharacterChosen ? styles.selected : ""
        }`}
      onClick={clickCharacter}
    >
      <div className={styles.name}>{name}</div>
      <div className={styles.burst}>
        <div style={{ display: "flex" }}>
          <div className={styles.burstName}>{burstName}</div>
          <div className={styles.burstCost}>{costText}</div>
        </div>
        <div className={styles.burstDescription}>{description}</div>
      </div>
      {skillCards && (
        <div className={styles.skillCards}>
          <div className={styles.skillCardRow}>
            <div className={styles.miniCard}>
              <CompactCard name={skillCards.card1} />
            </div>
            <span className={styles.cardArrow}>⟫</span>
            <div className={styles.miniCard}>
              <CompactCard name={`${skillCards.card1}Plus`} />
            </div>
          </div>
          <div className={styles.skillCardRow}>
            <div className={styles.miniCard}>
              <CompactCard name={skillCards.card2} />
            </div>
            <span className={styles.cardArrow}>⟫</span>
            <div className={styles.miniCard}>
              <CompactCard name={`${skillCards.card2}Plus`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
