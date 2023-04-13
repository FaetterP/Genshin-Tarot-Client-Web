import React from "react";

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

export function ChooseCharacters({ ws }: { ws: WebSocket }) {
  function choose(character: string) {
    const data = {
      action: "characters.addCharacter",
      character,
    };
    ws.send(JSON.stringify(data));
  }

  return (
    <div>
      {characters.map((character) => (
        <div onClick={() => choose(character)}>{character}</div>
      ))}
    </div>
  );
}
