import { useSelector } from "react-redux";
import { send } from "../../../ws";
import { State } from "../../../redux";
import styles from "./CharacterLine.module.scss";

export default function CharacterLine({ character }: { character: string }) {
  function addCharacter() {
    const data = {
      action: "characters.addCharacter",
      character,
    };
    send(data);
  }

  function removeCharacter() {
    const data = {
      action: "characters.removeCharacter",
      character,
    };
    send(data);
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

  let costText = "";
  for (let i = 0; i < cost; i++) {
    costText += "⚪";
  }
  for (let i = 0; i < 10 - cost; i++) {
    costText += "⚫";
  }

  return (
    <div
      className={`${styles.characterBlock} ${
        isCharacterChosen ? styles.selected : ""
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
    </div>
  );
}
