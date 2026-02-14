import { ECharacter } from "../../types/enums";

export const engDescriptions: Record<ECharacter, { name: string; description: string }> = {
  [ECharacter.Aether]: {
    name: "Wake of Earth",
    description: "Give all players other than yourself 3 Guard.",
  },
  [ECharacter.Albedo]: {
    name: "Abiogenesis: Solar Isotoma",
    description: "Apply Geo to up to 3 different enemies anywhere. Geo reaction triggered by this burst can instead trigger ANY elemental reaction effect of your choose.",
  },
  [ECharacter.Amber]: {
    name: "Fiery Rain",
    description: "Apply Pyro and deal 2 piercing damage to all enemies in any one player's zone.",
  },
  [ECharacter.Barbara]: {
    name: "Shining Miracle",
    description: "Restore 5 HP divided across any number of players.",
  },
  [ECharacter.Beidou]: {
    name: "Stormbreaker",
    description: "Draw 2 cards. This turn: after you Normal Attack cards resolve, deal 1 piercing damage to 1 enemy that the Normal Attack card targeted.",
  },
  [ECharacter.Bennett]: {
    name: "Fantastic Voyage",
    description: "All players with 7 HP or less restore 3 HP. All other players add on Overheat card to their hand.",
  },
  [ECharacter.ChongYun]: {
    name: "Cloud-parting Star",
    description: "Draw 3 cards. You can discard up to 3 cards to apply Cryo to 1 enemy anywhere per card discarded.",
  },
  [ECharacter.Diluc]: {
    name: "Dawn",
    description: "Apply Pyro and deal 6 damage to 1 enemy anywhere.",
  },
  [ECharacter.Diona]: {
    name: "Signature Mix",
    description: "Restore 1 HP to yourself and one other player. You may both trash a Burn card from your hand or discard.",
  },
  [ECharacter.Eula]: {
    name: "Glacial Illumination",
    description: "This turn: when you play a Eula card, place 1 ❄ on this card. When you end you turn, remove all ❄ on this card to deal 2 damage to 1 enemy anywhere for each ❄ removed.",
  },
  [ECharacter.Fischl]: {
    name: "Midnight Phantasmagoria",
    description: "Apply Electro and deal 2 damage to all enemies in any player's zone.",
  },
  [ECharacter.Ganyu]: {
    name: "Celestial Shower",
    description: "Deal 1d6 damage to 3 different enemies anywhere. Roll the damage separately for each enemy chosen. This damage is piercing against enemies with Cryo Applied.",
  },
  [ECharacter.HuTao]: {
    name: "Spirit Shooter",
    description: "Deal 2 damage to all enemies in your zone. If you have 7 or less HP, deal 4 damage instead and restore your HP to 7.",
  },
  [ECharacter.Jean]: {
    name: "Dandelion Breeze",
    description: "Apply Anemo to all enemies in your zone. Restore 2 HP to yourself and one other player.",
  },
  [ECharacter.Kaeya]: {
    name: "Glacial Waltz",
    description: "Draw 1 card. If you drew an Action card, it cost 0 Action Point to play in this turn.",
  },
  [ECharacter.Kazuha]: {
    name: "Kazuha Slash",
    description: "Apply Anemo to all enemies in any one player's zone. Dash cards gained from this are added to your hand instead to your discard.",
  },
  [ECharacter.KeQing]: {
    name: "Starward Sword",
    description: "Deal 5 piercing damage to up to 3 enemies anywhere that have Electro applied, then remove the Electro.",
  },
  [ECharacter.Klee]: {
    name: "Sparks 'n' Splash",
    description: "Deal 2 piercing damage to 1 enemy anywhere. Roll 1d6, on a 4 or higher, reactivate this elemental burst for free.",
  },
  [ECharacter.Lisa]: {
    name: "Lightning Rose",
    description: "Draw 2 cards. Apply Electro to 1 enemy anywhere.",
  },
  [ECharacter.Lumine]: {
    name: "Gust Surge",
    description: "Remove all tokens, including damage, from 1 enemy anywhere and flip it facedown. You may move this enemy to another player's zone.",
  },
  [ECharacter.Mona]: {
    name: "Illusory Torrent",
    description: "Declare a character. If the top card of you deck belongs to that character, deal 5 piercing damage to 1 enemy anywhere.",
  },
  [ECharacter.NingGuang]: {
    name: "Starshatter",
    description: "Deal 3 damage to 1 enemy anywhere. Deal 9 damage instead if it had Geo applied.",
  },
  [ECharacter.Noelle]: {
    name: "Sweeping Time",
    description: "Deal damage equal to you Guard value to 1 enemy in your zone.",
  },
  [ECharacter.QiQi]: {
    name: "Preserver of Fortune",
    description: "Apply Cryo to all enemies in your zone. Restore 2 HP to yourself and one other player.",
  },
  [ECharacter.Raiden]: {
    name: "Musou Shinsetsu",
    description: 'This turn: all you Normal Attack cards become 0 Action Point cards that reads "Apply Electro and deal 2 piercing damage to 1 enemy anywhere" instead of their original text.',
  },
  [ECharacter.Razor]: {
    name: "Lightning Fang",
    description: "Discard all 🟣 from Razor's Burst. This turn: you Razor cards will deal damage equal the number of 🟣 removed to all enemies they target.",
  },
  [ECharacter.Rosaria]: {
    name: "Rites of Termination",
    description: "Deal 3 damage to 1 enemy in your zone. Apply Cryo and deal 3 damage to all enemies in your zone.",
  },
  [ECharacter.Sucrose]: {
    name: "Isomer 75 / Type II",
    description: "Draw 2 cards, then trash a card in your hand and gain 2 Mora.",
  },
  [ECharacter.Tartaglia]: {
    name: "Havoc: Obliteration",
    description: "Deal 5 piercing damage to up to 3 enemies anywhere that have Hydro applied, then remove the Hydro.",
  },
  [ECharacter.Venti]: {
    name: "Wind's Grand Ode",
    description: "Deal 4 piercing damage to all enemies anywhere with Hydro, Pyro, Cryo or Electro applied. You may freely swap these enemies before dealing the damage.",
  },
  [ECharacter.XiangLing]: {
    name: "Pyronado",
    description: "Draw 2 cards. This turn: you Normal Attacks will apply Pyro to any enemies they target.",
  },
  [ECharacter.Xiao]: {
    name: "Bane of All Evil",
    description: "Take 1 piercing damage. Add a Dash card into your hand.",
  },
  [ECharacter.XingQiu]: {
    name: "Raincutter",
    description: "Draw 2 cards. This turn: you Normal Attacks will apply Hydro to any enemies they target.",
  },
  [ECharacter.Xinyan]: {
    name: "Riff Revolution",
    description: "Gain 3 Guard. Apply Pyro and deal 2 damage to all enemies in your zone.",
  },
  [ECharacter.Yanfei]: {
    name: "Done Deal",
    description: "Yanfei's passive: anytime you clear a row of enemies, place a 🔥 on Yanfei's Burst (max 5). Burst Active: a player with a less HP then you gains 1 Guard per 🔥 on Yanfei's Burst.",
  },
  [ECharacter.Yoimiya]: {
    name: "Ryuukin Saxifrage",
    description: "Yoimiya passive: anytime you trigger a reaction, place a 🔥 on Yoimiya's Burst (max 3). Burst active: remove all 🔥 from Yoimiya's Burst to deal 2 damage to 1 enemy anywhere per 🔥 removed.",
  },
  [ECharacter.ZhongLi]: {
    name: "Planet Befall",
    description: "Deal 3 piercing damage to all enemies in any ony player's zone. All enemies except bosses do not attack players this round.",
  },
};

export const rusDescriptions: Record<ECharacter, { name: string; description: string }> = {
  [ECharacter.Aether]: {
    name: "Движение земли",
    description: "Даёт всем игрокам, кроме вас, 3 Защиты.",
  },
  [ECharacter.Albedo]: {
    name: "Тектоническая волна",
    description: "Применяет Гео к 3 разным врагам где угодно. Гео реакции, вызванные этим взрывом могут вместо себя вызвать ЛЮБУЮ элементальную реакцию на выбор.",
  },
  [ECharacter.Amber]: {
    name: "Огненный дождь",
    description: "Накладывает Пиро и наносит 2 пронзающего урона всем врагам в зоне одного любого игрока.",
  },
  [ECharacter.Barbara]: {
    name: "Чудесное сияние",
    description: "Восстанавливает 5 ОЗ разделённые между всеми игроками.",
  },
  [ECharacter.Beidou]: {
    name: "Крушитель бури",
    description: "Вытягивает 2 карты. На этот ход: после того, как будет разыграна Обычная атака, наносит 1 пронзающий урон тому врагу, который был атакован этой атакой.",
  },
  [ECharacter.Bennett]: {
    name: "Волнительное приключение",
    description: "Все игроки с ОЗ 7 или меньше восстанавливают 3 ОЗ. Все остальные игроки добавляют Перегрузку в свою руку.",
  },
  [ECharacter.ChongYun]: {
    name: "Падение с небес",
    description: "Вытягивает 3 карты. Вы можете сбросить до 3 карт, чтобы наложить Крио 1 врагу где угодно за каждую сброшенную карту.",
  },
  [ECharacter.Diluc]: {
    name: "Рассвет",
    description: "Накладывает Пиро и наносит 6 урона 1 врагу где угодно.",
  },
  [ECharacter.Diona]: {
    name: "Авторский коктейль",
    description: "Восстанавливает 1 HP себе и одному другому игроку. Вы оба можете убрать карту Горение из руки или из колоды сброса.",
  },
  [ECharacter.Eula]: {
    name: "Сумеречный меч",
    description: "На этом ходу: когда разыгрывается карты Эолы, добавляется 1 ❄. Когда вы заканчиваете ход, все ❄ удаляются и наносится 2 урона 1 врагу где угодно за каждый удалённый ❄.",
  },
  [ECharacter.Fischl]: {
    name: "Ночная иллюзия",
    description: "Накладывает Электро и наносит 2 урона всем врагам в зоне любого игрока.",
  },
  [ECharacter.Ganyu]: {
    name: "Небесный дождь",
    description: "Наносит 1d6 урона 3 разным врагам где угодно. Урон генерируется для каждого врага отдельно. Урон становится пронзающим, если на враге есть Крио.",
  },
  [ECharacter.HuTao]: {
    name: "Упокоение духов",
    description: "Наносит 2 урона всем врагам в вашей зоне. Если у вас 7 ОЗ или меньше, наносит 4 урона и восстанавливает ОЗ до 7.",
  },
  [ECharacter.Jean]: {
    name: "Одуванчиковый бриз",
    description: "Накладывает Анемо всем врагам в вашей зоне. Восстанавливает 2 ОЗ себе и одному другому игроку.",
  },
  [ECharacter.Kaeya]: {
    name: "Ледниковый вальс",
    description: "Вытягивает 1 карту. Если вы вытянули карту действия, она стоит 0 Очков действия, если сыграть её на этом ходу.",
  },
  [ECharacter.Kazuha]: {
    name: "Удар Кадзухи",
    description: "Накладывает Anemo всем врагам в зоне любого игрока. Карты Рывка, полученные от этого, помещаются не в сброс, а в руку.",
  },
  [ECharacter.KeQing]: {
    name: "Меч небесного тракта",
    description: "Наносит 5 пронзающий урон 3 врагам где угодно, если на них наложено Электро, затем убирает с них Электро.",
  },
  [ECharacter.Klee]: {
    name: "Грохот и искры",
    description: "Наносит 2 пронзающего урона 1 врагу шде угодно. Роллит 1d6, если 4 или выше, вызывает эту реакцию повторно и бесплатно.",
  },
  [ECharacter.Lisa]: {
    name: "Громовая роза",
    description: "Вытягивает 2 карты. Накладывает Электро 1 врагу где угодно.",
  },
  [ECharacter.Lumine]: {
    name: "Взрывное торнадо",
    description: "Убирает все сетки у одного врага где угодно и переворачивает его. Вы можете переместить этого врага в зону к другому игроку.",
  },
  [ECharacter.Mona]: {
    name: "Звёздный фантазм",
    description: "Выберите персонажа. Если верхняя карта колоды принадлежит выбранному персонажу, нанесите 5 пронзающего урона 1 врагу где угодно.",
  },
  [ECharacter.NingGuang]: {
    name: "Осколки звёзд",
    description: "Наносит 3 урона 1 врагу где угодно. Наносит 9 урона, если на враге есть Гео.",
  },
  [ECharacter.Noelle]: {
    name: "Генеральная уборка",
    description: "Наносит урон, равный вашей защите 1 врагу в вашей зоне.",
  },
  [ECharacter.QiQi]: {
    name: "Хранитель Фортуны",
    description: "Применяет Крио всем врагам в вашей зоне. Восстанавливает 2 ОЗ себе и одному другому игроку.",
  },
  [ECharacter.Raiden]: {
    name: "Мусо синсэцу",
    description: 'На этом ходу: ваши Обычные атаки стоят 0 Очков действий и вместо своего эффекта накладывают Электро и наносят 2 пронзающего урона 1 врагу где угодно.',
  },
  [ECharacter.Razor]: {
    name: "Громовой клык",
    description: "Удаляет все 🟣 с взрыва Рэйзора. На этом ходу: карты Рэйзора наносят дополнительный урон, равный числу удалённых 🟣.",
  },
  [ECharacter.Rosaria]: {
    name: "Обряд кончины",
    description: "Наносит 3 урона 1 врагу в вашей зоне. Накладывает Крио и наносит 3 урона всем врагам в вашей зоне.",
  },
  [ECharacter.Sucrose]: {
    name: "Изомер 75 / Тип II",
    description: "Вытягивает 2 карты, затем удалите карту из вашей руки и получите 2 Моры.",
  },
  [ECharacter.Tartaglia]: {
    name: "Хаос: Опустошение",
    description: "Наносит 5 пронзающего урона 3 врагам где угодно, если на них есть Гидро, затем убирает с них Гидро.",
  },
  [ECharacter.Venti]: {
    name: "Великая ода ветру",
    description: "Наносит 4 пронзающего урона всем врагам везде с наложенными Гидро, Пиро, Крио или Электро. Вы можете свободно перемещать врагов до нанесения урона.",
  },
  [ECharacter.XiangLing]: {
    name: "Огневихрь",
    description: "Вытягивает 2 карты. На этом ходу: ваши Обычные атаки накладывают Пиро.",
  },
  [ECharacter.Xiao]: {
    name: "Истребление всего зла",
    description: "Получите 1 пронзающий урон. Добавьте Рывок в вашу руку.",
  },
  [ECharacter.XingQiu]: {
    name: "Радужная стойка",
    description: "Вытягивает 2 карты. На этом ходу: ваши Обычные атаки накладывают Гидро.",
  },
  [ECharacter.Xinyan]: {
    name: "Струны протеста",
    description: "Даёт 3 Защиты. Накладывает Пиро и наносит 2 урона всем врагам в вашей зоне.",
  },
  [ECharacter.Yanfei]: {
    name: "По рукам",
    description: "Пассивно: когда вы завершаете ряд врагов, размещается 🔥 на Взрыв Янь Фэй (макс. 5). Взрыв стихий: игрок с ОЗ меньше, чем у вас, получает 1 Защиту за каждый 🔥 на взрыве Янь Фэй.",
  },
  [ECharacter.Yoimiya]: {
    name: "Камнеломка Рюкин",
    description: "Пассивно: каждый раз при вызове реакции, размещает 🔥 на Взрыве Ёимии (макс. 3). Взрыв стихий: удаляет все 🔥 с взрыва Ёимии. Наносит 2 урона 1 врагу где угодно за каждый удалённый 🔥.",
  },
  [ECharacter.ZhongLi]: {
    name: "Падение кометы",
    description: "Наносит 3 пронзающего урона всем врагам в зоне одного любого игрока. Все враги, кроме боссов не атакуют игроков на этом ходу.",
  },
};
