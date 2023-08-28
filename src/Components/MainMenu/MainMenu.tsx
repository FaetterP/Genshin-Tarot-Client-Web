import { ConnectionField } from "./ConnectionField";
import styles from "./MainMenu.module.scss";

export default function MainMenu() {
  return (
    <div className={styles.menu}>
      <span className={styles.title}>Genshin Tarot</span>
      <div className={styles.menuItems}>
        <ConnectionField />
      </div>
    </div>
  );
}
