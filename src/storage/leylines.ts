import { ELeyline } from "../types/enums";

export type LeylineLocale = Record<ELeyline, { name: string; description: string }>;

export const engLeylines: LeylineLocale = {
  [ELeyline.EngulfingStorm]: {
    name: "Engulfing Storm",
    description: "All players take 1 piercing damage.",
  },
  [ELeyline.SmolderingFlames]: {
    name: "Smoldering Flames",
    description:
      "All players add 1 Burn card to their discard, then apply Pyro to all enemies with no elements applied.",
  },
  [ELeyline.MonsterAttendants]: {
    name: "Monster Attendants",
    description: "All enemies have their damage fully removed.",
  },
  [ELeyline.Adrenaline]: {
    name: "Adrenaline",
    description: "Players with 7 or less HP add 1 Overheat card to their hand.",
  },
  [ELeyline.CondensedIce]: {
    name: "Condensed Ice",
    description: "All players add 1 Freeze card to their discard, then apply Cryo to all enemies with no elements applied.",
  },
  [ELeyline.LightingBolts]: {
    name: "Lighting Bolts",
    description: "All players discard 2 energy, then apply Electro to all enemies with no elements applied.",
  },
  [ELeyline.ReinforcedShields]: {
    name: "Reinforced Shields",
    description: "All players gain 3 Guard.",
  },
  [ELeyline.ElementalRefresh]: {
    name: "Elemental Refresh",
    description: "All enemies have their applied elements removed.",
  },
  [ELeyline.SlowingWater]: {
    name: "Slowing Water",
    description: "All players discard 1 random card, then apply Hydro to all enemies with no elements applied.",
  },
  [ELeyline.ChaosCluster]: {
    name: "Chaos Cluster",
    description: "Players with 5 or more energy take 2 damage.",
  },
  [ELeyline.HighEnergyCores]: {
    name: "High Energy Cores",
    description: "Players with 5 or more energy restore 1 HP.",
  },
  [ELeyline.IcicleBlast]: {
    name: "Icicle Blast",
    description: "All players must trash their every Freeze card in their hand or discard pile, then take 1 piercing damage per card trashed.",
  },
  [ELeyline.PlasmaField]: {
    name: "Plasma Field",
    description: "All players with no energy gain 3 energy.",
  },
  [ELeyline.EnergyTides]: {
    name: "Energy Tides",
    description: "Players with 5 or more energy loose 2 energy, everyone else gain 2 energy.",
  },
  [ELeyline.WindCurrent]: {
    name: "Wind Current",
    description: "Players with 7 or less HP add 1 Dash card to their hand.",
  },
  [ELeyline.SheerCold]: {
    name: "Sheer Cold",
    description: "All players with no Freeze card in their hands adds 1 Freeze card to the top of their deck.",
  },
};

export const rusLeylines: LeylineLocale = {
  [ELeyline.EngulfingStorm]: {
    name: "Охватывающий шторм",
    description: "Все игроки получают 1 пронзающий урон.",
  },
  [ELeyline.SmolderingFlames]: {
    name: "Тлеющее пламя",
    description: "Все игроки добавляют 1 Горение в их колоду сброса, затем накладывается Пиро на всех врагов без эффектов.",
  },
  [ELeyline.MonsterAttendants]: {
    name: "Прислужники монстров",
    description: "Все враги полностью восстанавливаются.",
  },
  [ELeyline.Adrenaline]: {
    name: "Адреналин",
    description: "Игроки с 7 или меньше ОЗ получают 1 Перегрузку в их руку.",
  },
  [ELeyline.CondensedIce]: {
    name: "Конденсированный лёд",
    description: "Все игроки добавляют 1 Заморозку в их колоду сброса, затем накладывается Крио на всех врагов без эффектов.",
  },
  [ELeyline.LightingBolts]: {
    name: "Удары молний",
    description: "Все игроки теряют 2 энергии, затем накладывается Электро на всех врагов без эффектов.",
  },
  [ELeyline.ReinforcedShields]: {
    name: "Укрепление щитов",
    description: "Все игроки получают 3 защиты.",
  },
  [ELeyline.ElementalRefresh]: {
    name: "Элементальное очищение",
    description: "Со всех врагов снимаются элементы.",
  },
  [ELeyline.SlowingWater]: {
    name: "Замедляющая вода",
    description: "Все игроки сбрасывают 1 случайную карту, затем накладывается Гидро на всех врагов без эффектов.",
  },
  [ELeyline.ChaosCluster]: {
    name: "Кластер хаоса",
    description: "Игроки с 5 или больше энергии получают 2 урона.",
  },
  [ELeyline.HighEnergyCores]: {
    name: "Высокоэнергетическое ядро",
    description: "Игроки с 5 или больше энергии восстанавливают 1 ОЗ.",
  },
  [ELeyline.IcicleBlast]: {
    name: "Взрывные сосульки",
    description: "Все игроки должны удалить все карты Заморозки из руки или колоды сброса, затем получите 1 пронзающий урон за каждую удалённую карту.",
  },
  [ELeyline.PlasmaField]: {
    name: "Плазменное поле",
    description: "Все игроки без энергии получают 3 энергии.",
  },
  [ELeyline.EnergyTides]: {
    name: "Прилив энергии",
    description: "Игроки с 5 или больше энергии теряют 2 энергии, остальные получают 2 энергии.",
  },
  [ELeyline.WindCurrent]: {
    name: "Течение ветров",
    description: "Игроки с 7 или меньше ОЗ получают 1 Рывок в руку.",
  },
  [ELeyline.SheerCold]: {
    name: "Абсолютный холод",
    description: "Все игроки, у которых нет Заморозки в руке получают 1 Заморозку на верх колоды.",
  },
};
