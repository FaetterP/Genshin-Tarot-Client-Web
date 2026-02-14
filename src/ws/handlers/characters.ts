import type { ECharacter } from "../../types/enums";
import { store } from "../../redux";
import { addCharacterAction, removeCharacterAction } from "../../redux/players";

async function addCharacter(payload: { player: string; character: ECharacter }) {
  const { player, character } = payload;
  store.dispatch(addCharacterAction({ playerId: player, character }));
}

async function removeCharacter(payload: { player: string; character: ECharacter }) {
  const { player, character } = payload;
  store.dispatch(removeCharacterAction({ playerId: player, character }));
}

export default { handlers: { addCharacter, removeCharacter } };
