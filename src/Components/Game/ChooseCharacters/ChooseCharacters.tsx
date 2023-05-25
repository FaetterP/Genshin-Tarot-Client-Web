import { useSelector } from "react-redux";
import { send } from "../../../ws";
import CharacterLine from "./CharacterLine";
import styles from "./ChooseCharacters.module.scss";
import { State } from "../../../redux";

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
    const data = { action: "game.startGame" };
    send(data);
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
      <button onClick={() => startGame()}>{startText}</button>
    </div>
  );
}
