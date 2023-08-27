import { useSelector } from "react-redux";
import { useEffect } from "react";
import { State, store } from "../../redux";
import { finishEffect } from "../../redux/effects";
import { sleep } from "../../utils/sleep";
import styles from "./LeylineEffect.module.scss";

export default function LeylineEffect() {
  const leyline = useSelector((state: State) => state.effects.useLeyline);
  const counter = useSelector((state: State) => state.effects.counter);

  useEffect(() => {
    (async () => {
      if (leyline.isShown) {
        await sleep(2000);

        store.dispatch(finishEffect());
      }
    })();
  }, [leyline.isShown, counter]);

  const displayName = useSelector(
    (state: State) => state.lang.leylines[leyline.name]
  );

  if (!leyline.isShown) return <></>;

  return <div className={styles[leyline.name]}>{displayName}</div>;
}
