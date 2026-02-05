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

export type DetailedStep =
  | { type: "add_card"; playerId: string; card: CardPrimitive; to: "hand" | "deck" | "discard" }
  | { type: "discard_card"; playerId: string; card: CardPrimitive }
  | { type: "draw_cards"; playerId: string; cards: CardPrimitive[] }
  | { type: "enemy_take_damage"; enemyId: string; damage: number; isPiercing: boolean; element?: string }
  | { type: "enemy_block_damage"; enemyId: string; element?: string }
  | { type: "enemy_death"; enemyId: string }
  | { type: "enemy_appearance"; playerId: string; enemy: EnemyPrimitive }
  | { type: "player_take_damage"; playerId: string; damage: number; isPiercing: boolean; enemyId?: string }
  | { type: "player_change_energy"; playerId: string; delta: number }
  | { type: "player_change_shield"; playerId: string; delta: number }
  | { type: "player_change_mora"; playerId: string; delta: number }
  | { type: "player_change_action_points"; playerId: string; delta: number }
  | { type: "player_get_effect"; playerId: string; effect: string }
  | { type: "player_lose_effect"; playerId: string; effect: string }
  | { type: "enemy_get_element"; enemyId: string; element: string }
  | { type: "enemy_reaction"; enemyId: string; element1: string; element2: string }
  | { type: "enemy_change_shield"; enemyId: string; delta: number }
  | { type: "enemy_heal"; enemyId: string; amount: number };

export type ReportEffect =
  | { type: "createWave"; enemies: EnemyPrimitive[]; player: string }
  | { type: "resetStats"; player: string }
  | { type: "drawCards"; cards: CardPrimitive[]; player: string }
  | { type: "clearHand"; player: string }
  | { type: "useLeyline"; name: string }
  | { type: "useEffect"; effect: string; isRemove: boolean; player: string }
  | { type: "enemyAttack"; damage: number; enemy: string; player: string };
