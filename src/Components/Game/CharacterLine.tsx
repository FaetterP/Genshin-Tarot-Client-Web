import { useSelector } from "react-redux";
import { send } from "../../ws";
import { State } from "./../../redux";

export default function CharacterLine({ character }: { character: string }) {
  function addCharacter(character: string) {
    const data = {
      action: "characters.addCharacter",
      character,
    };
    send(data);
  }

  function removeCharacter(character: string) {
    const data = {
      action: "characters.removeCharacter",
      character,
    };
    send(data);
  }

  const me = useSelector((state: State) => {
    return state.players.players.find(
      (player) => player.playerId === state.service.myPlayerId
    )!;
  });
  if (!me) return <></>;

  const isCharacterChosen = me.characters.includes(character);

  return (
    <div>
      <div onClick={() => addCharacter(character)}>{character}</div>
      {isCharacterChosen ? (
        <button onClick={() => removeCharacter(character)}>Remove</button>
      ) : (
        <></>
      )}
    </div>
  );
}
