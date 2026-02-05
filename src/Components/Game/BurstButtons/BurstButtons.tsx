import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../redux";
import { send } from "../../../ws";
import { selectBurstCharacter } from "../../../redux/burst";
import { clearUsedCard } from "../../../redux/card";
import { burstsRequire } from "../../../storage/characters/burstsRequire";
import styles from "./BurstButtons.module.scss";

export default function BurstButtons() {
  const dispatch = useDispatch();
  const me = useSelector((state: State) => state.players.me);
  const characters = me?.characters ?? [];
  const energy = me?.energy ?? 0;
  const burstData = useSelector((state: State) => state.lang.characters.bursts);
  const characterNames = useSelector(
    (state: State) => state.lang.characters.names
  );

  function handleBurstClick(character: string) {
    const cost = burstData[character]?.cost ?? 0;
    if (energy < cost) return;
    const require = burstsRequire[character];
    const needsSelection =
      require &&
      (require.needEnemies ||
        require.needPlayer ||
        require.needEnemy ||
        require.needDivide ||
        require.needCharacter);
    if (needsSelection) {
      dispatch(clearUsedCard(undefined));
      dispatch(selectBurstCharacter({ character }));
    } else {
      send({ action: "game.useBurst", character });
    }
  }

  if (!characters.length) return null;

  return (
    <div className={styles.wrap}>
      {characters.map((character) => {
        const burst = burstData[character];
        const burstName = burst?.name ?? `${character}.burst`;
        const characterName = characterNames[character] ?? character;
        const description = burst?.description ?? "";
        const cost = burst?.cost ?? 0;
        let costText = "";
        for (let i = 0; i < cost; i++) costText += "⚪";
        for (let i = 0; i < 10 - cost; i++) costText += "⚫";
        const canUse = energy >= cost;

        return (
          <div key={character} className={styles.burstBtnWrap}>
            <button
              type="button"
              className={`${styles.burstBtn} ${!canUse ? styles.disabled : ""}`}
              onClick={() => handleBurstClick(character)}
            >
              <span>{characterName}</span>
            </button>
            <div className={styles.tooltip} role="tooltip">
              <div className={styles.tooltipName}>{burstName}</div>
              <div className={styles.tooltipCost}>{costText}</div>
              <div className={styles.tooltipDesc}>{description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
