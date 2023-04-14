import React from "react";
import { send } from "../../ws";

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
  function choose(character: string) {
    const data = {
      action: "characters.addCharacter",
      character,
    };
    send(data);
  }

  function startGame() {
    const data = { action: "game.startGame" };
    send(data);
  }

  return (
    <div>
      {characters.map((character) => (
        <div onClick={() => choose(character)}>{character}</div>
      ))}
      <button onClick={() => startGame()}>Start</button>
    </div>
  );
}
