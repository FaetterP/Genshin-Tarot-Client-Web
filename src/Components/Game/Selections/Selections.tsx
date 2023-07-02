import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../redux";
import { send } from "../../../ws";
import { useFormik } from "formik";

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
  } = useSelector((state: State) => state.card);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      isUseAlternative: false,
    },
    onSubmit: (values) => {
      const data: Request = { action: "game.useCard", cardId: selectedCard };
      if (needEnemies) {
        data.enemies = enemies;
      }
      if (selectedPlayer) {
        data.selectedPlayer = selectedCard;
      }

      data.isUseAlternative = values.isUseAlternative;

      send(data);
    },
  });

  const useAltText =
    useSelector((state: State) => state.lang.service.useAlt) ||
    "service.useAlt";
  const useCardText =
    useSelector((state: State) => state.lang.service.useCard) ||
    "service.useCard";

  if (!selectedCard) {
    return <></>;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      {isCanAlternative ? (
        <div>
          <input
            id="isUseAlternative"
            name="isUseAlternative"
            type="checkbox"
            onChange={formik.handleChange}
            value={formik.values.isUseAlternative ? 1 : 0}
          ></input>
          <label>{useAltText}</label>
        </div>
      ) : (
        <></>
      )}
      <button type="submit">{useCardText}</button>
    </form>
  );
}
