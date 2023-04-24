export const engDescriptions: Record<
  string,
  { name: string; cost: number; description: string }
> = {
  Aether: {
    name: "Wake of Earth",
    cost: 4,
    description: "Give all players other than yourself 3 Guard.",
  },
  Albedo: {
    name: "Abiogenesis: Solar Isotoma",
    cost: 6,
    description:
      "Apply Geo to up to 3 different enemies anywhere. Geo reaction triggered by this burst can instead trigger ANY elemental reaction effect of your choose.",
  },
  Amber: {
    name: "Fiery Rain",
    cost: 5,
    description:
      "Apply Pyro and deal 2 piercing damage to all enemies in any one player's zone.",
  },
  Barbara: {
    name: "Shining Miracle",
    cost: 5,
    description: "Restore 5 HP divided across any number of players.",
  },
  Beidou: {
    name: "Stormbreaker",
    cost: 4,
    description:
      "Draw 2 cards. This turn: after you Normal Attack cards resolve, deal 1 piercing damage to 1 enemy that the Normal Attack card targeted.",
  },
  Bennett: {
    name: "Fantastic Voyage",
    cost: 7,
    description:
      "All players with 7 HP or less restore 3 HP. All other players add on Overheat card to their hand.",
  },
  ChongYun: {
    name: "Cloud-parting Star",
    cost: 3,
    description:
      "Draw 3 cards. You can discard up to 3 cards to apply Cryo to 1 enemy anywhere per card discarded.",
  },
  Diluc: {
    name: "Dawn",
    cost: 7,
    description: "Apply Pyro and deal 6 damage to 1 enemy anywhere.",
  },
  Diona: {
    name: "Signature Mix",
    cost: 5,
    description:
      "Restore 1 HP to yourself and one other player. You may both trash a Burn card from your hand or discard.",
  },
  Eula: {
    name: "Glacial Illumination",
    cost: 4,
    description:
      "This turn: when you play a Eula card, place 1 ❄ on this card. When you end you turn, remove all ❄ on this card to deal 2 damage to 1 enemy anywhere for each ❄ removed.",
  },
  Fischl: {
    name: "Midnight Phantasmagoria",
    cost: 5,
    description:
      "Apply Electro and deal 2 damage to all enemies in any player's zone.",
  },
  Ganyu: {
    name: "Celestial Shower",
    cost: 7,
    description:
      "Deal 1d6 damage to 3 different enemies anywhere. Roll the damage separately for each enemy chosen. This damage is piercing against enemies with Cryo Applied.",
  },
  HuTao: {
    name: "Spirit Shooter",
    cost: 6,
    description:
      "Deal 2 damage to all enemies in your zone. If you have 7 or less HP, deal 4 damage instead and restore your HP to 7.",
  },
  Jean: {
    name: "Dandelion Breeze",
    cost: 5,
    description:
      "Apply Anemo to all enemies in your zone. Restore 2 HP to yourself and one other player.",
  },
  Kaeya: {
    name: "Glacial Waltz",
    cost: 3,
    description:
      "Draw 1 card. If you drew an Action card, it cost 0 Action Point to play in this turn.",
  },
  Kazuha: {
    name: "Kazuha Slash",
    cost: 6,
    description:
      "Apply Anemo to all enemies in any one player's zone. Dash cards gained from this are added to your hand instead to your discard.",
  },
  KeQing: {
    name: "Starward Sword",
    cost: 8,
    description:
      "Deal 5 piercing damage to up to 3 enemies anywhere that have Electro applied, then remove the Electro.",
  },
  Klee: {
    name: "Sparks 'n' Splash",
    cost: 4,
    description:
      "Deal 2 piercing damage to 1 enemy anywhere. Roll 1d6, on a 4 or higher, reactivate this elemental burst for free.",
  },
  Lisa: {
    name: "Lightning Rose",
    cost: 3,
    description: "Draw 2 cards. Apply Electro to 1 enemy anywhere.",
  },
  Lumine: {
    name: "Gust Surge",
    cost: 3,
    description:
      "Remove all tokens, including damage, from 1 enemy anywhere and flip it facedown. You may move this enemy to another player's zone.",
  },
  Mona: {
    name: "Illusory Torrent",
    cost: 3,
    description:
      "Declare a character. If the top card of you deck belongs to that character, deal 5 piercing damage to 1 enemy anywhere.",
  },
  NingGuang: {
    name: "Starshatter",
    cost: 7,
    description:
      "Deal 3 damage to 1 enemy anywhere. Deal 9 damage instead if it had Geo applied.",
  },
  Noelle: {
    name: "Sweeping Time",
    cost: 3,
    description:
      "Deal damage equal to you Guard value to 1 enemy in your zone.",
  },
  QiQi: {
    name: "Preserver of Fortune",
    cost: 5,
    description:
      "Apply Cryo to all enemies in your zone. Restore 2 HP to yourself and one other player.",
  },
  Raiden: {
    name: "Musou Shinsetsu",
    cost: 10,
    description:
      'This turn: all you Normal Attack cards become 0 Action Point cards that reads "Apply Electro and deal 2 piercing damage to 1 enemy anywhere" instead of their original text.',
  },
  Razor: {
    name: "Lightning Fang",
    cost: 5,
    description:
      "Discard all 🟣 from Razor's Burst. This turn: you Razor cards will deal damage equal the number of 🟣 removed to all enemies they target.",
  },
  Rosaria: {
    name: "Rites of Termination",
    cost: 8,
    description:
      "Deal 3 damage to 1 enemy in your zone. Apply Cryo and deal 3 damage to all enemies in your zone.",
  },
  Sucrose: {
    name: "Isomer 75 / Type II",
    cost: 4,
    description:
      "Draw 2 cards, then trash a card in your hand and gain 2 Mora.",
  },
  Tartaglia: {
    name: "Havoc: Obliteration",
    cost: 8,
    description:
      "Deal 5 piercing damage to up to 3 enemies anywhere that have Hydro applied, then remove the Hydro.",
  },
  Venti: {
    name: "Wind's Grand Ode",
    cost: 10,
    description:
      "Deal 4 piercing damage to all enemies anywhere with Hydro, Pyro, Cryo or Electro applied. You may freely swap these enemies before dealing the damage.",
  },
  XiangLing: {
    name: "Pyronado",
    cost: 4,
    description:
      "Draw 2 cards. This turn: you Normal Attacks will apply Pyro to any enemies they target.",
  },
  Xiao: {
    name: "Bane of All Evil",
    cost: 2,
    description: "Take 1 piercing damage. Add a Dash card into your hand.",
  },
  XingQiu: {
    name: "Raincutter",
    cost: 4,
    description:
      "Draw 2 cards. This turn: you Normal Attacks will apply Hydro to any enemies they target.",
  },
  Xinyan: {
    name: "Riff Revolution",
    cost: 6,
    description:
      "Gain 3 Guard. Apply Pyro and deal 2 damage to all enemies in your zone.",
  },
  Yanfei: {
    name: "Done Deal",
    cost: 3,
    description:
      "Yanfei's passive: anytime you clear a row of enemies, place a 🔥 on Yanfei's Burst (max 5). Burst Active: a player with a less HP then you gains 1 Guard per 🔥 on Yanfei's Burst.",
  },
  Yoimiya: {
    name: "Ryuukin Saxifrage",
    cost: 4,
    description:
      "Yoimiya passive: anytime you trigger a reaction, place a 🔥 on Yoimiya's Burst (max 3). Burst active: remove all 🔥 from Yoimiya's Burst to deal 2 damage to 1 enemy anywhere per 🔥 removed.",
  },
  ZhongLi: {
    name: "Planet Befall",
    cost: 10,
    description:
      "Deal 3 piercing damage to all enemies in any ony player's zone. All enemies except bosses do not attack players this round.",
  },
};

export const rusDescriptions: Record<
  string,
  { name: string; description: string; cost: number }
> = {
  Aether: {
    name: "Движение земли",
    cost: 4,
    description: "Даёт всем игрокам, кроме вас, 3 Защиты.",
  },
  Albedo: {
    name: "Тектоническая волна",
    cost: 6,
    description:
      "Применяет Гео к 3 разным врагам где угодно. Гео реакции, вызванные этим взрывом могут вместо себя вызвать ЛЮБУЮ элементальную реакцию на выбор.",
  },
  Amber: {
    name: "Огненный дождь",
    cost: 5,
    description:
      "Накладывает Пиро и наносит 2 пронзающего урона всем врагам в зоне одного любого игрока.",
  },
  Barbara: {
    name: "Чудесное сияние",
    cost: 5,
    description: "Восстанавливает 5 ОЗ разделённые между всеми игроками.",
  },
  Beidou: {
    name: "Крушитель бури",
    cost: 4,
    description:
      "Вытягивает 2 карты. На этот ход: после того, как будет разыграна Обычная атака, наносит 1 пронзающий урон тому врагу, который был атакован этой атакой.",
  },
  Bennett: {
    name: "Волнительное приключение",
    cost: 7,
    description:
      "Все игроки с ОЗ 7 или меньше восстанавливают 3 ОЗ. Все остальные игроки добавляют Перегрузку в свою руку.",
  },
  ChongYun: {
    name: "Падение с небес",
    cost: 3,
    description:
      "Вытягивает 3 карты. Вы можете сбросить до 3 карт, чтобы наложить Крио 1 врагу где угодно за каждую сброшенную карту.",
  },
  Diluc: {
    name: "Рассвет",
    cost: 7,
    description: "Накладывает Пиро и наносит 6 урона 1 врагу где угодно.",
  },
  Diona: {
    name: "Авторский коктейль",
    cost: 5,
    description:
      "Восстанавливает 1 HP себе и одному другому игроку. Вы оба можете убрать карту Горение из руки или из колоды сброса.",
  },
  Eula: {
    name: "Сумеречный меч",
    cost: 4,
    description:
      "На этом ходу: когда разыгрывается карты Эолы, добавляется 1 ❄. Когда вы заканчиваете ход, все ❄ удаляются и наносится 2 урона 1 врагу где угодно за каждый удалённый ❄.",
  },
  Fischl: {
    name: "Ночная иллюзия",
    cost: 5,
    description:
      "Накладывает Электро и наносит 2 урона всем врагам в зоне любого игрока.",
  },
  Ganyu: {
    name: "Небесный дождь",
    cost: 7,
    description:
      "Наносит 1d6 урона 3 разным врагам где угодно. Урон генерируется для каждого врага отдельно. Урон становится пронзающим, если на враге есть Крио.",
  },
  HuTao: {
    name: "Упокоение духов",
    cost: 6,
    description:
      "Наносит 2 урона всем врагам в вашей зоне. Если у вас 7 ОЗ или меньше, наносит 4 урона и восстанавливает ОЗ до 7.",
  },
  Jean: {
    name: "Одуванчиковый бриз",
    cost: 5,
    description:
      "Накладывает Анемо всем врагам в вашей зоне. Восстанавливает 2 ОЗ себе и одному другому игроку.",
  },
  Kaeya: {
    name: "Ледниковый вальс",
    cost: 3,
    description:
      "Вытягивает 1 карту. Если вы вытянули карту действия, она стоит 0 Очков действия, если сыграть её на этом ходу.",
  },
  Kazuha: {
    name: "Удар Кадзухи",
    cost: 6,
    description:
      "Накладывает Anemo всем врагам в зоне любого игрока. Карты Рывка, полученные от этого, помещаются не в сброс, а в руку.",
  },
  KeQing: {
    name: "Меч небесного тракта",
    cost: 8,
    description:
      "Наносит 5 пронзающий урон 3 врагам где угодно, если на них наложено Электро, затем убирает с них Электро.",
  },
  Klee: {
    name: "Грохот и искры",
    cost: 4,
    description:
      "Наносит 2 пронзающего урона 1 врагу шде угодно. Роллит 1d6, если 4 или выше, вызывает эту реакцию повторно и бесплатно.",
  },
  Lisa: {
    name: "Громовая роза",
    cost: 3,
    description: "Вытягивает 2 карты. Накладывает Электро 1 врагу где угодно.",
  },
  Lumine: {
    name: "Взрывное торнадо",
    cost: 3,
    description:
      "Убирает все сетки у одного врага где угодно и переворачивает его. Вы можете переместить этого врага в зону к другому игроку.",
  },
  Mona: {
    name: "Звёздный фантазм",
    cost: 3,
    description:
      "Выберите персонажа. Если верхняя карта колоды принадлежит выбранному персонажу, нанесите 5 пронзающего урона 1 врагу где угодно.",
  },
  NingGuang: {
    name: "Осколки звёзд",
    cost: 7,
    description:
      "Наносит 3 урона 1 врагу где угодно. Наносит 9 урона, если на враге есть Гео.",
  },
  Noelle: {
    name: "Генеральная уборка",
    cost: 3,
    description:
      "Наносит урон, равный вашей защите 1 врагу в вашей зоне.",
  },
  QiQi: {
    name: "Хранитель Фортуны",
    cost: 5,
    description:
      "Применяет Крио всем врагам в вашей зоне. Восстанавливает 2 ОЗ себе и одному другому игроку.",
  },
  Raiden: {
    name: "Мусо синсэцу",
    cost: 10,
    description:
      'На этом ходу: ваши Обычные атаки стоят 0 Очков действий и вместо своего эффекта накладывают Электро и наносят 2 пронзающего урона 1 врагу где угодно.',
  },
  Razor: {
    name: "Громовой клык",
    cost: 5,
    description:
      "Удаляет все 🟣 с взрыва Рэйзора. На этом ходу: карты Рэйзора наносят дополнительный урон, равный числу удалённых 🟣.",
  },
  Rosaria: {
    name: "Обряд кончины",
    cost: 8,
    description:
      "Наносит 3 урона 1 врагу в вашей зоне. Накладывает Крио и наносит 3 урона всем врагам в вашей зоне.",
  },
  Sucrose: {
    name: "Изомер 75 / Тип II",
    cost: 4,
    description:
      "Вытягивает 2 карты, затем удалите карту из вашей руки и получите 2 Моры.",
  },
  Tartaglia: {
    name: "Хаос: Опустошение",
    cost: 8,
    description:
      "Наносит 5 пронзающего урона 3 врагам где угодно, если на них есть Гидро, затем убирает с них Гидро.",
  },
  Venti: {
    name: "Великая ода ветру",
    cost: 10,
    description:
      "Наносит 4 пронзающего урона всем врагам везде с наложенными Гидро, Пиро, Крио или Электро. Вы можете свободно перемещать врагов до нанесения урона.",
  },
  XiangLing: {
    name: "Огневихрь",
    cost: 4,
    description:
      "Вытягивает 2 карты. На этом ходу: ваши Обычные атаки накладывают Пиро.",
  },
  Xiao: {
    name: "Истребление всего зла",
    cost: 2,
    description: "Получите 1 пронзающий урон. Добавьте Рывок в вашу руку.",
  },
  XingQiu: {
    name: "Радужная стойка",
    cost: 4,
    description:
      "Вытягивает 2 карты. На этом ходу: ваши Обычные атаки накладывают Гидро.",
  },
  Xinyan: {
    name: "Струны протеста",
    cost: 6,
    description:
      "Даёт 3 Защиты. Накладывает Пиро и наносит 2 урона всем врагам в вашей зоне.",
  },
  Yanfei: {
    name: "По рукам",
    cost: 3,
    description:
      "Пассивно: когда вы завершаете ряд врагов, размещается 🔥 на Взрыв Янь Фэй (макс. 5). Взрыв стихий: игрок с ОЗ меньше, чем у вас, получает 1 Защиту за каждый 🔥 на взрыве Янь Фэй.",
  },
  Yoimiya: {
    name: "Камнеломка Рюкин",
    cost: 4,
    description:
      "Пассивно: каждый раз при вызове реакции, размещает 🔥 на Взрыве Ёимии (макс. 3). Взрыв стихий: удаляет все 🔥 с взрыва Ёимии. Наносит 2 урона 1 врагу где угодно за каждый удалённый 🔥.",
  },
  ZhongLi: {
    name: "Падение кометы",
    cost: 10,
    description:
      "Наносит 3 пронзающего урона всем врагам в зоне одного любого игрока. Все враги, кроме боссов не атакуют игроков на этом ходу.",
  },
};
