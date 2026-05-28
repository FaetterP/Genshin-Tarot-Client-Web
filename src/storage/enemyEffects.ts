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
  [EEnemyEffect.HeraldOfFrost]: {
    name: "Herald Of Frost",
    description: "This turn: the next player to target this enemy restores 2 HP.",
  },
  [EEnemyEffect.HeraldOfFrostPlus]: {
    name: "Herald Of Frost+",
    description: "This turn: the next player to target this enemy restores 3 HP and gains 2 energy.",
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
  [EEnemyEffect.HeraldOfFrost]: {
    name: "Вестник стужи",
    description: "На этом ходу следующий игрок, который атакует этого врага, восстановит 2 ОЗ.",
  },
  [EEnemyEffect.HeraldOfFrostPlus]: {
    name: "Вестник стужи+",
    description: "На этом ходу следующий игрок, который атакует этого врага, восстановит 3 ОЗ и получит 2 энергии.",
  },
};
