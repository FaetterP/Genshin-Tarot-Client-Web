/**
 * Требования для использования взрыва стихии (game.useBurst).
 * Совпадает с полями тела запроса: selectedPlayer, selectedEnemy, selectedEnemies, divide, selectedCharacter.
 */
export type BurstRequire = {
  /** Количество врагов для selectedEnemies (если 1, можно слать selectedEnemy) */
  needEnemies?: number;
  /** Враги из зоны любого игрока (isRange для карт) */
  isRange?: boolean;
  /** Нужен выбор одного игрока (зона или цель для лечения) */
  needPlayer?: boolean;
  /** Нужен выбор одного врага (часть API selectedEnemy) */
  needEnemy?: boolean;
  /** Нужно распределение по игрокам (divide: { playerId, count }[]) */
  needDivide?: boolean;
  /** Нужен выбор персонажа (Mona — объявить персонажа) */
  needCharacter?: boolean;
};

export const burstsRequire: Record<string, BurstRequire> = {
  Barbara: { needDivide: true },
  Jean: { needPlayer: true },
  Diona: { needPlayer: true },
  QiQi: { needPlayer: true },
  Amber: { needPlayer: true },
  Fischl: { needPlayer: true },
  Kazuha: { needPlayer: true },
  ZhongLi: { needPlayer: true },
  Diluc: { needEnemies: 1, isRange: true },
  Klee: { needEnemies: 1, isRange: true },
  Lisa: { needEnemies: 1, isRange: true },
  Lumine: { needEnemies: 1, isRange: true },
  Mona: { needEnemies: 1, isRange: true, needCharacter: true },
  NingGuang: { needEnemies: 1, isRange: true },
  Ganyu: { needEnemies: 3, isRange: true },
  KeQing: { needEnemies: 3, isRange: true },
  Tartaglia: { needEnemies: 3, isRange: true },
  Eula: { needEnemies: 1, isRange: true },
  Yoimiya: { needEnemies: 1, isRange: true },
  Noelle: { needEnemies: 1 },
  Rosaria: { needEnemies: 1 },
};
