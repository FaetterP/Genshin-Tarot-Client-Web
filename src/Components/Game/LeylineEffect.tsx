import { useSelector } from "react-redux";
import { State } from "../../redux";
import styles from "./LeylineEffect.module.scss";

export default function LeylineEffect() {
  const animatingLeyline = useSelector((state: State) => state.stepAnimation.animatingLeyline);
  const displayName = useSelector((state: State) =>
    animatingLeyline ? state.lang.leylines[animatingLeyline].name : ""
  );

  if (!animatingLeyline) return null;

  return <div className={styles[animatingLeyline]}>{displayName}</div>;
}
