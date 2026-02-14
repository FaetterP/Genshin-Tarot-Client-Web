import { EPlayerEffect } from "../types/enums";

export type PlayerEffectLocale = Record<EPlayerEffect, { name: string; description: string }>;

export const engPlayerEffects: PlayerEffectLocale = {
  [EPlayerEffect.Breastplate]: {
    name: "Breastplate",
    description: "This turn: your normal attacks restore 1 HP to any 1 player.",
  },
  [EPlayerEffect.DominusLapidis]: {
    name: "Dominus Lapidis",
    description: "At the start of next turn, apply Geo to all enemies in your zone.",
  },
  [EPlayerEffect.ExplosivePuppet]: {
    name: "Explosive Puppet",
    description: "At the start of next turn: apply Pyro and deal 2 damage to all enemies in your zone.",
  },
  [EPlayerEffect.GuideOfAfterlife]: {
    name: "Guide Of Afterlife",
    description: "This turn: your Normal Attacks apply Pyro to any enemies they target.",
  },
  [EPlayerEffect.GuobaFire]: {
    name: "Guoba Fire",
    description: "At the start of next turn: apply Pyro and deal 2 damage to all enemies in your zone.",
  },
  [EPlayerEffect.LayeredFrost]: {
    name: "Layered Frost",
    description: "This turn: your normal attacks apply Cryo to any enemies they target.",
  },
  [EPlayerEffect.LetTheShowBeginPlus]: {
    name: "Let The Show Begin",
    description: "This turn: your normal attacks restore 1 HP to 1 random player.",
  },
  [EPlayerEffect.MirrorReflections]: {
    name: "Mirror Reflections",
    description: "At the start of next turn: apply Hydro and deal 2 damage to all enemies in your zone.",
  },
  [EPlayerEffect.NiwabiFireDance]: {
    name: "Niwabi Fire-Dance",
    description: "This turn: your next normal attack will apply Pyro to any enemies it targets.",
  },
  [EPlayerEffect.Overheat]: {
    name: "Overheat",
    description: "The next time you deal damage this turn, increase the damage dealt by 1. If this damage defeats the enemy, gain 2 Energy.",
  },
  [EPlayerEffect.Pyronado]: {
    name: "Pyronado",
    description: "This turn: you Normal Attacks will apply Pyro to any enemies they target.",
  },
  [EPlayerEffect.Raincutter]: {
    name: "Raincutter",
    description: "This turn: your Normal Attacks apply Hydro to any enemies they target.",
  },
  [EPlayerEffect.SkywardSonnet]: {
    name: "Skyward Sonnet",
    description: "This turn: your next Normal attack deals +1 damage.",
  },
  [EPlayerEffect.SkywardSonnetPlus]: {
    name: "Skyward Sonnet+",
    description: "This turn: your next Normal attack deals +2 damage.",
  },
  [EPlayerEffect.SolarIsotoma]: {
    name: "Solar Isotoma",
    description: "At the start of next turn, apply Geo to all enemies in your zone.",
  },
  [EPlayerEffect.Stormbreaker]: {
    name: "Stormbreaker",
    description: "This turn: after your Normal Attack cards resolve, deal 1 piercing damage to 1 enemy that was targeted.",
  },
  [EPlayerEffect.TrailOfTheQilin]: {
    name: "Trail Of The Qilin",
    description: "At the start of next turn: apply Cryo and deal 2 damage to all enemies in your zone.",
  },
  [EPlayerEffect.GlacialIllumination]: {
    name: "Glacial Illumination",
    description: "When you play an Eula card, add 1 ❄.",
  },
};

export const rusPlayerEffects: PlayerEffectLocale = {
  [EPlayerEffect.Breastplate]: {
    name: "Бронефартук",
    description: "На этом ходу ваши обычные атаки восстанавливают 1 ОЗ любому игроку.",
  },
  [EPlayerEffect.DominusLapidis]: {
    name: "Власть над камнем",
    description: "В начале следующего хода накладывает Гео всем врагам в вашей зоне.",
  },
  [EPlayerEffect.ExplosivePuppet]: {
    name: "Барон Зайчик",
    description: "В начале следующего хода накладывает Пиро и наносит 2 урона всем врагам в вашей зоне.",
  },
  [EPlayerEffect.GuideOfAfterlife]: {
    name: "Путеводитель по загробной жизни",
    description: "На этом ходу ваши обычные атаки будут накладывать Пиро.",
  },
  [EPlayerEffect.GuobaFire]: {
    name: "Атака Гобы",
    description: "В начале следующего хода накладывает Пиро и наносит 2 урона всем врагам в вашей зоне.",
  },
  [EPlayerEffect.LayeredFrost]: {
    name: "Духовное лезвие: Холод Чунхуа",
    description: "На этом ходу ваши обычные атаки будут накладывать Крио.",
  },
  [EPlayerEffect.LetTheShowBeginPlus]: {
    name: "Да начнётся шоу",
    description: "На этом ходу ваши обычные атаки восстанавливают 1 ОЗ случайному игроку.",
  },
  [EPlayerEffect.MirrorReflections]: {
    name: "Отражение фатума",
    description: "В начале следующего хода накладывает Гидро и наносит 2 урона всем врагам в вашей зоне.",
  },
  [EPlayerEffect.NiwabiFireDance]: {
    name: "Огненный танец Ниваби",
    description: "На этом ходу ваша следующая обычная атака наложит Пиро.",
  },
  [EPlayerEffect.Overheat]: {
    name: "Перегрузка",
    description: "Следующий нанесённый урон будет увеличен на 1. Если этот урон побеждает врага, получите 2 энергии.",
  },
  [EPlayerEffect.Pyronado]: {
    name: "Огневихрь",
    description: "На этом ходу ваши обычные атаки будут накладывать Пиро.",
  },
  [EPlayerEffect.Raincutter]: {
    name: "Радужная стойка",
    description: "На этом ходу ваши обычные атаки будут накладывать Гидро.",
  },
  [EPlayerEffect.SkywardSonnet]: {
    name: "Небесная поэзия",
    description: "На этом ходу ваша следующая обычная атака нанесёт +1 урон.",
  },
  [EPlayerEffect.SkywardSonnetPlus]: {
    name: "Небесная поэзия+",
    description: "На этом ходу ваша следующая обычная атака нанесёт +2 урона.",
  },
  [EPlayerEffect.SolarIsotoma]: {
    name: "Цветок солнца",
    description: "В начале следующего хода, накладывает Гео всем врагам в вашей зоне.",
  },
  [EPlayerEffect.Stormbreaker]: {
    name: "Крушитель бури",
    description: "На этом ходу после обычной атаки враг получит дополнительно 1 пронзающий урон.",
  },
  [EPlayerEffect.TrailOfTheQilin]: {
    name: "След цилиня",
    description: "В начале следующего хода накладывает Крио и наносит 2 урона всем врагам в вашей зоне.",
  },
  [EPlayerEffect.GlacialIllumination]: {
    name: "Сумеречный меч",
    description: "Когда разыгрывается карты Эолы, добавляется 1 ❄.",
  },
};
