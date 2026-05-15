import { useState } from "react";
import { useSelector } from "react-redux";
import { send } from "../../../ws";
import CharacterLine from "./CharacterLine";
import CharacterDetail from "./CharacterDetail";
import styles from "./ChooseCharacters.module.scss";
import { State } from "../../../redux";
import { ECharacter } from "../../../types/enums";
import { GameStartRequest } from "../../../types/request";

export function ChooseCharacters() {
  const [selectedCharacter, setSelectedCharacter] = useState<ECharacter | null>(null);

  function startGame() {
    send<GameStartRequest>({ action: "game.startGame" });
  }

  const startText =
    useSelector((state: State) => state.lang.service.startGame) || "service.startGame";
  const players = useSelector((state: State) => state.players.players);
  const myPlayerId = useSelector((state: State) => state.service.myPlayerId);
  const characterNames = useSelector((state: State) => state.lang.characters.names);

  return (
    <div className={styles.background}>
      <div className={styles.layout}>
        <div className={styles.leftPanel}>
          {Object.values(ECharacter).map((character) => (
            <CharacterLine
              character={character}
              key={character}
              isViewing={selectedCharacter === character}
              onClick={() => setSelectedCharacter(character)}
            />
          ))}
        </div>

        <div className={styles.centerPanel}>
          {selectedCharacter ? (
            <CharacterDetail character={selectedCharacter} />
          ) : (
            <div className={styles.placeholder}>Выберите персонажа из списка</div>
          )}
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.playersList}>
            {players.map((player) => (
              <div key={player.playerId} className={styles.playerEntry}>
                <div className={styles.playerName}>
                  {player.playerId === myPlayerId ? "Вы" : player.playerId}
                </div>
                <div className={styles.playerCharacters}>
                  {player.characters.length === 0 ? (
                    <div className={styles.noCharacters}>—</div>
                  ) : (
                    player.characters.map((char) => (
                      <div key={char} className={styles.playerCharacterTag}>
                        {characterNames?.[char] || char}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
          <button className={styles.startButton} onClick={startGame}>
            {startText}
          </button>
        </div>
      </div>
    </div>
  );
}
