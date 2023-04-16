import { store } from "../../redux";
import { addCharacterAction, removeCharacterAction } from "../../redux/players";

async function addCharacter(payload: { player: string; character: string }) {
  const { player, character } = payload;
  store.dispatch(addCharacterAction({ playerId: player, character }));
}

async function removeCharacter(payload: { player: string; character: string }) {
  const { player, character } = payload;
  store.dispatch(removeCharacterAction({ playerId: player, character }));
}

export default { handlers: { addCharacter, removeCharacter } };
