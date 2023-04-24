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
> = {};
