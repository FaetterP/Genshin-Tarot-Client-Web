export type EnemyPrimitive = {
  id: string;
  name: string;
  hp: number;
  shield: number;
  elements: string[];
  isStunned: boolean;
};

export type PlayerPrimitive = {
  playerId: string;
  characters: string[];
  hp: number;
  shields: number;
  energy: number;
  actionPoints: {
    normal: number;
    extra: number;
    total: number;
  };
  wave: number;
  enemies: EnemyPrimitive[];
  effects: string[];
  hand: CardPrimitive[];
  discard: CardPrimitive[];
  deck: CardPrimitive[];
};

export type CardPrimitive = {
  cardId: string;
  name: string;
};

export type Lang = "EN" | "RU";
