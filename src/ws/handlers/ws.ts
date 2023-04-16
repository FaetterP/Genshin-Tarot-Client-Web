import { store } from "../../redux";
import { addPlayerAction } from "../../redux/players";
import { setMyPlayerId } from "../../redux/service";

async function connect(payload: { youPlayerId: string }) {
  const { youPlayerId } = payload;
  store.dispatch(setMyPlayerId({ playerId: youPlayerId }));
  store.dispatch(addPlayerAction({ playerId: youPlayerId }));
}

export default { handlers: { connect } };
