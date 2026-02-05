import { useEffect, useRef, useState } from "react";
import styles from "./ChangeableStat.module.scss";

const POPUP_DURATION_MS = 1000;

export type ChangeableStatProps = {
  value: number;
  children: React.ReactNode;
  className?: string;
  popupClassName?: string;
  popupPositiveClassName?: string;
  popupNegativeClassName?: string;
};

export default function ChangeableStat({
  value,
  children,
  className,
  popupClassName,
  popupPositiveClassName,
  popupNegativeClassName,
}: ChangeableStatProps) {
  const prevValueRef = useRef<number | undefined>(undefined);
  const keyRef = useRef(0);
  const [popup, setPopup] = useState<{ delta: number; key: number } | null>(
    null
  );

  useEffect(() => {
    if (prevValueRef.current === undefined) {
      prevValueRef.current = value;
      return;
    }
    if (prevValueRef.current === value) return;

    const delta = value - prevValueRef.current;
    keyRef.current += 1;
    setPopup({ delta, key: keyRef.current });

    const t = setTimeout(() => {
      prevValueRef.current = value;
      setPopup(null);
    }, POPUP_DURATION_MS);

    return () => clearTimeout(t);
  }, [value]);

  return (
    <span className={`${styles.wrapper} ${className ?? ""}`.trim()}>
      {children}
      {popup && (
        <span
          key={popup.key}
          className={`${styles.popup} ${
            popup.delta > 0
              ? `${styles.popupPositive} ${popupPositiveClassName ?? ""}`
              : `${styles.popupNegative} ${popupNegativeClassName ?? ""}`
          } ${popupClassName ?? ""}`.trim()}
        >
          {popup.delta > 0 ? "+" : ""}
          {popup.delta}
        </span>
      )}
    </span>
  );
}
