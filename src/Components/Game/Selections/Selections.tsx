import { useSelector } from "react-redux";
import { State } from "../../../redux";
import { send } from "../../../ws";

type Request = {
  action: "game.useCard";
  cardId: string;
  enemies?: string[];
  selectedPlayer?: string;
  isUseAlternative?: boolean;
};

export default function Selections() {
  const {
    needEnemies,
    isCanAlternative,
    selectedCard,
    enemies,
    selectedPlayer,
    isUseAlternative,
  } = useSelector((state: State) => state.card);

  if (!selectedCard) {
    return <></>;
  }

  function useCard() {
    const data: Request = { action: "game.useCard", cardId: selectedCard };
    if (needEnemies) {
      data.enemies = enemies;
    }
    if (selectedPlayer) {
      data.selectedPlayer = selectedCard;
    }
    if (isUseAlternative) {
      data.isUseAlternative = isUseAlternative;
    }

    send(data);
  }

  return (
    <div>
      {isCanAlternative ? (
        <div>
          <input type="checkbox"></input>
          <label>use alt?</label>
        </div>
      ) : (
        <></>
      )}
      <button onClick={useCard}>Use card</button>
    </div>
  );
}
