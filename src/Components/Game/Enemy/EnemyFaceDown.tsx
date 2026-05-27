import styles from "./EnemyFaceDown.module.scss";

interface Props {
  isElite?: boolean;
}

export default function EnemyFaceDown({ isElite = false }: Props) {
  return (
    <div className={`${styles.faceDown} ${isElite ? styles.elite : ""}`}>
      <div className={styles.corners}>
        <span /><span /><span /><span />
      </div>
      <div className={styles.symbol}>{isElite ? "★" : "?"}</div>
    </div>
  );
}
