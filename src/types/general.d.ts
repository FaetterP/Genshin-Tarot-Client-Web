import type { ECard, ECardType, ECharacter, EElement, EEnemy, EEnemyEffect, EPlayerEffect } from "./enums";

export type EnemyPrimitive = {
  id: string;
  name: EEnemy;
  hp: number;
  shield: number;
  elements: EElement[];
  isStunned: boolean;
  effects: EEnemyEffect[];
};

export type PlayerPrimitive = {
  playerId: string;
  characters: ECharacter[];
  hp: number;
  shields: number;
  energy: number;
  mora: number;
  actionPoints: {
    normal: number;
    extra: number;
    total: number;
  };
  wave: number;
  enemies: EnemyPrimitive[];
  effects: EPlayerEffect[];
  hand: CardPrimitive[];
  discard: CardPrimitive[];
  deck: CardPrimitive[];

  eulaSnowflakes: number;
};

export type CardPrimitive = {
  cardId: string;
  name: ECard;
  type: ECardType;
  deckPosition?: number;
};

export type Lang = "EN" | "RU";
