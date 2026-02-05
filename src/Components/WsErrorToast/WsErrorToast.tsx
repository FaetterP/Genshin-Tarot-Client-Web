import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux";
import { setWsError } from "../../redux/service";
import styles from "./WsErrorToast.module.scss";
import { useEffect } from "react";

const AUTO_HIDE_MS = 4000;

export function WsErrorToast() {
  const wsError = useSelector((state: State) => state.service.wsError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!wsError) return;
    const t = setTimeout(() => {
      dispatch(setWsError(null));
    }, AUTO_HIDE_MS);
    return () => clearTimeout(t);
  }, [wsError, dispatch]);

  if (!wsError) return null;

  return (
    <div className={styles.toast} role="alert">
      <span className={styles.message}>{wsError}</span>
      <button
        type="button"
        className={styles.close}
        onClick={() => dispatch(setWsError(null))}
        aria-label="Закрыть"
      >
        ×
      </button>
    </div>
  );
}
