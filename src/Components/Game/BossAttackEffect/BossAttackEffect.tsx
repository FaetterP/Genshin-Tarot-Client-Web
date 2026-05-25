import { useSelector } from "react-redux";
import { State } from "../../../redux";
import { EDvalinAttack } from "../../../types/enums";
import styles from "./BossAttackEffect.module.scss";

export default function BossAttackEffect() {
  const attack = useSelector((state: State) => state.stepAnimation.animatingBossAttack);
  const t = useSelector((state: State) => state.lang.service);

  if (!attack) return null;

  const nameMap: Record<EDvalinAttack, string> = {
    [EDvalinAttack.SwoopingStrike]: t.swoopingStrikeName,
    [EDvalinAttack.PulsingWind]: t.pulsingWindName,
    [EDvalinAttack.DragonBreath]: t.dragonBreathTitle,
  };

  const descMap: Record<EDvalinAttack, string> = {
    [EDvalinAttack.SwoopingStrike]: t.swoopingStrikeDesc,
    [EDvalinAttack.PulsingWind]: t.pulsingWindDesc,
    [EDvalinAttack.DragonBreath]: t.dragonBreathDesc,
  };

  return (
    <div className={`${styles.overlay} ${styles[attack]}`}>
      <div className={styles.name}>{nameMap[attack]}</div>
      <div className={styles.desc}>{descMap[attack]}</div>
    </div>
  );
}
