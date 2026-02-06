import { useSelector } from "react-redux";
import { send } from "../../../ws";
import CharacterLine from "./CharacterLine";
import styles from "./ChooseCharacters.module.scss";
import { State } from "../../../redux";
import { GameStartRequest } from "../../../types/request";

const characters: ReadonlyArray<string> = [
  "Aether",
  "Albedo",
  "Amber",
  "Barbara",
  "Beidou",
  "Bennett",
  "ChongYun",
  "Diluc",
  "Diona",
  "Eula",
  "Fischl",
  "Ganyu",
  "HuTao",
  "Jean",
  "Kaeya",
  "Kazuha",
  "KeQing",
  "Klee",
  "Lisa",
  "Lumine",
  "Mona",
  "NingGuang",
  "Noelle",
  "QiQi",
  "Raiden",
  "Razor",
  "Rosaria",
  "Sucrose",
  "Tartaglia",
  "Venti",
  "XiangLing",
  "Xiao",
  "XingQiu",
  "Xinyan",
  "Yanfei",
  "Yoimiya",
  "ZhongLi",
];

export function ChooseCharacters() {
  function startGame() {
    send<GameStartRequest>({ action: "game.startGame" });
  }

  const startText =
    useSelector((state: State) => state.lang.service.startGame) ||
    "service.startGame";

  return (
    <div className={styles.background}>
      <div className={styles.charactersList}>
        {characters.map((character) => (
          <CharacterLine character={character} key={character} />
        ))}
      </div>
      <button className={styles.startButton} onClick={() => startGame()}>
        {startText}
      </button>
    </div>
  );
}
