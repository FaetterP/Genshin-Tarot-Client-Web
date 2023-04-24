import { send } from "../../../ws";
import CharacterLine from "./CharacterLine";
import styles from "./ChooseCharacters.module.scss";

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

  return (
    <div className={styles.background}>
      <div className={styles.charactersList}>
        {characters.map((character) => (
          <CharacterLine character={character} key={character} />
        ))}
      </div>
      <button onClick={() => startGame()}>Start</button>
    </div>
  );
}
