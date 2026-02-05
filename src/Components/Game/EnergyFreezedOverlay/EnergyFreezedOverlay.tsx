import { useSelector } from "react-redux";
import { State } from "../../../redux";
import styles from "./EnergyFreezedOverlay.module.scss";

export default function EnergyFreezedOverlay() {
  const energyFreezedPlayerId = useSelector(
    (state: State) => state.stepAnimation.energyFreezedPlayerId
  );
  const myPlayerId = useSelector(
    (state: State) => state.service.myPlayerId
  );

  if (energyFreezedPlayerId !== myPlayerId || !energyFreezedPlayerId) {
    return null;
  }

  return <div className={styles.overlay} aria-hidden />;
}
