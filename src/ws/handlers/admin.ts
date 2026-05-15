import { store } from "../../redux";
import { setCycle, setPlayers } from "../../redux/players";
import { filterStaleEnemies as filterCardEnemies } from "../../redux/card";
import { filterStaleEnemies as filterBurstEnemies } from "../../redux/burst";
import type { AdminChangeStatsResponse, AdminStateSyncResponse } from "../../types/response";

function changeStats(payload: AdminChangeStatsResponse) {
  store.dispatch(setPlayers({ you: payload.you, otherPlayers: payload.otherPlayers }));
  store.dispatch(setCycle({ cycle: payload.cycle }));
}

function stateSync(payload: AdminStateSyncResponse) {
  store.dispatch(setPlayers({ you: payload.you, otherPlayers: payload.otherPlayers }));
  store.dispatch(setCycle({ cycle: payload.cycle }));

  const validIds = [
    ...payload.you.enemies,
    ...payload.otherPlayers.flatMap((p) => p.enemies),
  ].map((e) => e.id);

  store.dispatch(filterCardEnemies({ validIds }));
  store.dispatch(filterBurstEnemies({ validIds }));
}

export default {
  handlers: {
    changeStats,
    stateSync,
  },
};
