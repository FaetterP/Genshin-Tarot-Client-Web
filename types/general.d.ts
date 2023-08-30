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
  mora: number;
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

export type ReportEffect =
  | { type: "createWave"; enemies: EnemyPrimitive[]; player: string }
  | { type: "resetStats"; player: string }
  | { type: "drawCards"; cards: CardPrimitive[]; player: string }
  | { type: "clearHand"; player: string }
  | { type: "useLeyline"; name: string }
  | { type: "useEffect"; effect: string; isRemove: boolean; player: string }
  | {
      type: "enemyAttack";
      damage: number;
      enemy: string;
      player: string;
      player: string;
    };
