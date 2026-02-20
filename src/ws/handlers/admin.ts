import { store } from "../../redux";
import { setCycle, setPlayers } from "../../redux/players";
import type { AdminChangeStatsResponse } from "../../types/response";

function changeStats(payload: AdminChangeStatsResponse) {
  store.dispatch(setPlayers({ you: payload.you, otherPlayers: payload.otherPlayers }));
  store.dispatch(setCycle({ cycle: payload.cycle }));
}

export default {
  handlers: {
    changeStats,
  },
};
