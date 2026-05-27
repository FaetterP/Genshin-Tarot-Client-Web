import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux";
import { EnemyPrimitive } from "../../../types/general";
import Enemy from "./Enemy";
import EnemyFaceDown from "./EnemyFaceDown";
import styles from "./Pyramid.module.scss";


type Line = { x1: number; y1: number; x2: number; y2: number };

export default function Pyramid() {
  const pyramid = useSelector((state: State) => state.players.me.pyramid);
  const enemies = useSelector((state: State) => state.players.me.enemies);
  const revealingEnemyIds = useSelector((state: State) => state.stepAnimation.revealingEnemyIds);

  const enemyMap = useMemo(() => {
    const map = new Map<string, EnemyPrimitive>();
    for (const e of enemies) map.set(e.id, e);
    return map;
  }, [enemies]);

  const containerRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [lines, setLines] = useState<Line[]>([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const newLines: Line[] = [];

    for (const row of pyramid) {
      for (const slot of row) {
        if (!slot.covers.length) continue;
        const parentEl = slotRefs.current.get(slot.id);
        if (!parentEl) continue;
        const pRect = parentEl.getBoundingClientRect();
        const px = pRect.left + pRect.width / 2 - containerRect.left;
        const py = pRect.bottom - containerRect.top;

        for (const coveredId of slot.covers) {
          const childEl = slotRefs.current.get(coveredId);
          if (!childEl) continue;
          const cRect = childEl.getBoundingClientRect();
          const cx = cRect.left + cRect.width / 2 - containerRect.left;
          const cy = cRect.top - containerRect.top;
          newLines.push({ x1: px, y1: py, x2: cx, y2: cy });
        }
      }
    }

    setLines(newLines);
  }, [pyramid]);

  if (!pyramid.length) return null;

  const eliteThreshold = pyramid.length - 2;

  return (
    <div className={styles.pyramidWrap}>
      <div ref={containerRef} className={styles.pyramid}>
        <svg className={styles.connections}>
          <defs>
            <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <marker
              id="arrow"
              viewBox="0 0 6 6"
              refX="5"
              refY="3"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,200,100,0.6)" />
            </marker>
          </defs>
          {lines.map((l, i) => (
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="rgba(255, 200, 100, 0.65)"
              strokeWidth="2"
              markerEnd="url(#arrow)"
              filter="url(#line-glow)"
            />
          ))}
        </svg>

        {pyramid.map((row, rowIdx) => {
          if (row.length === 0) return null;
          const isEliteRow = rowIdx >= eliteThreshold;

          return (
            <div key={rowIdx} className={styles.row}>
              {row.map((slot) => {
                const ref = (el: HTMLDivElement | null) => {
                  if (el) slotRefs.current.set(slot.id, el);
                  else slotRefs.current.delete(slot.id);
                };

                if (slot.faceDown) {
                  return (
                    <div key={slot.id} className={styles.slot} ref={ref}>
                      <EnemyFaceDown isElite={isEliteRow} />
                    </div>
                  );
                }

                const enemyData: EnemyPrimitive = enemyMap.get(slot.id) ?? slot;
                const isRevealing = revealingEnemyIds.includes(slot.id);

                return (
                  <div key={slot.id} className={`${styles.slot} ${styles.hoverable}`} ref={ref}>
                    <div className={isRevealing ? styles.revealing : undefined}>
                      <Enemy {...enemyData} />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
