import { useSelector } from "react-redux";
import { send } from "../../../ws";
import CharacterLine from "./CharacterLine";
import styles from "./ChooseCharacters.module.scss";
import { State } from "../../../redux";
import { ECharacter } from "../../../types/enums";
import { GameStartRequest } from "../../../types/request";


export function ChooseCharacters() {
  function startGame() {
    send<GameStartRequest>({ action: "game.startGame" });
  }

  const startText =
    useSelector((state: State) => state.lang.service.startGame) || "service.startGame";

  return (
    <div className={styles.background}>
      <div className={styles.charactersList}>
        {Object.values(ECharacter).map((character) => (
          <CharacterLine character={character} key={character} />
        ))}
      </div>
      <button className={styles.startButton} onClick={() => startGame()}>
        {startText}
      </button>
    </div>
  );
}
