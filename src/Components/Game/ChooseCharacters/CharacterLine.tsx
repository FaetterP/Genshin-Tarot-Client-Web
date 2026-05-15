import { useSelector } from "react-redux";
import { State } from "../../../redux";
import styles from "./CharacterLine.module.scss";
import type { ECharacter } from "../../../types/enums";

interface Props {
  character: ECharacter;
  isViewing: boolean;
  onClick: () => void;
}

export default function CharacterLine({ character, isViewing, onClick }: Props) {
  const name =
    useSelector((state: State) => state.lang.characters.names[character]) || character;
  const me = useSelector((state: State) =>
    state.players.players.find((player) => player.playerId === state.service.myPlayerId),
  );
  const isCharacterChosen = me?.characters.includes(character) ?? false;

  return (
    <div
      className={`${styles.characterItem} ${isCharacterChosen ? styles.selected : ""} ${isViewing ? styles.viewing : ""}`}
      onClick={onClick}
    >
      {isCharacterChosen && <span className={styles.checkmark}>✓</span>}
      {name}
    </div>
  );
}
