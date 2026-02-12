import { useSelector } from "react-redux";
import { State } from "../../../redux";
import styles from "./Leyline.module.scss";

export default function Leyline(props: { name: string }) {
  const nameText =
    useSelector((state: State) => state.lang.leylines[props.name]) || `${props.name}.name`;
  const descriptionText =
    useSelector((state: State) => state.lang.leylines[props.name + "Effect"]) ||
    `${props.name}.description`;

  return (
    <div>
      <div className={styles.leyline}>
        {nameText}
        <span className={styles.tooltip}>{descriptionText}</span>
      </div>
    </div>
  );
}
