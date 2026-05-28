import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux";
import { PyramidSlot } from "../../../types/general";
import Enemy from "./Enemy";
import EnemyFaceDown from "./EnemyFaceDown";
import styles from "./Pyramid.module.scss";


type Line = { x1: number; y1: number; x2: number; y2: number };

function buildLayers(enemies: PyramidSlot[]): PyramidSlot[][] {
  if (enemies.length === 0) return [];

  const parents = new Map<string, string[]>();
  for (const e of enemies) {
    for (const childId of e.covers) {
      const list = parents.get(childId);
      if (list) list.push(e.id);
      else parents.set(childId, [e.id]);
    }
  }

  function longestDepths(group: PyramidSlot[]): Map<string, number> {
    const groupIds = new Set(group.map((e) => e.id));
    const byId = new Map(group.map((e) => [e.id, e]));

    const inDeg = new Map<string, number>(group.map((e) => [e.id, 0]));
    for (const e of group) {
      for (const childId of e.covers) {
        if (groupIds.has(childId)) inDeg.set(childId, inDeg.get(childId)! + 1);
      }
    }

    const depth = new Map<string, number>();
    const queue: string[] = [];
    inDeg.forEach((deg, id) => {
      if (deg === 0) { queue.push(id); depth.set(id, 0); }
    });

    let qi = 0;
    while (qi < queue.length) {
      const id = queue[qi++];
      const d = depth.get(id)!;
      for (const childId of (byId.get(id)?.covers ?? [])) {
        if (!groupIds.has(childId)) continue;
        if ((depth.get(childId) ?? 0) < d + 1) depth.set(childId, d + 1);
        const nd = inDeg.get(childId)! - 1;
        inDeg.set(childId, nd);
        if (nd === 0) queue.push(childId);
      }
    }
    return depth;
  }

  function depthsToLayers(
    group: PyramidSlot[],
    depth: Map<string, number>,
    externalPos?: Map<string, number>,
  ): PyramidSlot[][] {
    if (group.length === 0) return [];
    const maxD = Math.max(...Array.from(depth.values()), -1);
    if (maxD < 0) return [];

    const layers: PyramidSlot[][] = Array.from({ length: maxD + 1 }, () => []);
    for (const e of group) {
      const d = depth.get(e.id);
      if (d !== undefined) layers[d].push(e);
    }

    const layerPos = new Map<string, number>(externalPos ? Array.from(externalPos) : []);
    for (const layer of layers) {
      layer.sort((a, b) => {
        const avg = (e: PyramidSlot) => {
          const ps = (parents.get(e.id) ?? []).filter((id) => layerPos.has(id));
          return ps.length > 0
            ? ps.reduce((s, id) => s + layerPos.get(id)!, 0) / ps.length
            : 0;
        };
        return avg(a) - avg(b);
      });
      layer.forEach((e, i) => layerPos.set(e.id, i));
    }

    return layers.filter((l) => l.length > 0);
  }

  const revealed = enemies.filter((e) => !e.faceDown);
  const hidden = enemies.filter((e) => e.faceDown);
  const revLayers = depthsToLayers(revealed, longestDepths(revealed));
  const revPos = new Map<string, number>();
  let off = 0;
  for (const layer of revLayers) {
    layer.forEach((e, i) => revPos.set(e.id, off + i));
    off += layer.length;
  }

  const hidLayers = depthsToLayers(
    hidden,
    longestDepths(hidden),
    revPos.size > 0 ? revPos : undefined,
  );

  return [...revLayers, ...hidLayers].filter((l) => l.length > 0);
}

export default function Pyramid() {
  const enemies = useSelector((state: State) => state.players.me.enemies);
  const revealingEnemyIds = useSelector((state: State) => state.stepAnimation.revealingEnemyIds);

  const layers = useMemo(() => buildLayers(enemies), [enemies]);

  const containerRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [lines, setLines] = useState<Line[]>([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const newLines: Line[] = [];

    for (const row of layers) {
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
  }, [layers]);

  if (!layers.length) return null;

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

        {layers.map((row, rowIdx) => {
          if (row.length === 0) return null;

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
                      <EnemyFaceDown isElite={slot.isElite} />
                    </div>
                  );
                }

                const { faceDown: _fd, covers: _c, ...enemyProps } = slot;
                const isRevealing = revealingEnemyIds.includes(slot.id);

                return (
                  <div key={slot.id} className={`${styles.slot} ${styles.hoverable}`} ref={ref}>
                    <div className={isRevealing ? styles.revealing : undefined}>
                      <Enemy {...enemyProps} />
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
