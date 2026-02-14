import { useSelector } from "react-redux";
import type { ELeyline } from "../../../types/enums";
import { State } from "../../../redux";
import styles from "./Leyline.module.scss";

export default function Leyline(props: { name: ELeyline }) {
  const leyline = useSelector((state: State) => state.lang.leylines[props.name]);
  const nameText = leyline.name;
  const descriptionText = leyline.description;

  return (
    <div>
      <div className={styles.leyline}>
        {nameText}
        <span className={styles.tooltip}>{descriptionText}</span>
      </div>
    </div>
  );
}
