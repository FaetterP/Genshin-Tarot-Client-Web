import { EEnemyEffect } from "../types/enums";

export type EnemyEffectLocale = Record<EEnemyEffect, { name: string; description: string }>;

export const engEnemyEffects: EnemyEffectLocale = {
  [EEnemyEffect.Nightrider]: {
    name: "Nightrider",
    description: "At the start of next turn: apply Electro and deal 1 piercing damage.",
  },
  [EEnemyEffect.NightriderPlus]: {
    name: "Nightrider+",
    description: "At the start of next turn: apply Electro and deal 2 piercing damage.",
  },
};

export const rusEnemyEffects: EnemyEffectLocale = {
  [EEnemyEffect.Nightrider]: {
    name: "Тень расправленных крыльев",
    description: "В начале следующего хода накладывает Электро и наносит 1 пронзающий урон.",
  },
  [EEnemyEffect.NightriderPlus]: {
    name: "Тень расправленных крыльев+",
    description: "В начале следующего хода накладывает Электро и наносит 2 пронзающего урона.",
  },
};
