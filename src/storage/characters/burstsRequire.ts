import { ECharacter } from "../../types/enums";

export type BurstRequire = {
  needEnemies?: number;
  isRange?: boolean;
  needPlayer?: boolean;
  needEnemy?: boolean;
  needDivide?: boolean;
  needCharacter?: boolean;
};

export const burstsRequire: Record<ECharacter, BurstRequire> = {
  [ECharacter.Aether]: {},
  [ECharacter.Albedo]: {},
  [ECharacter.Amber]: { needPlayer: true },
  [ECharacter.Barbara]: { needDivide: true },
  [ECharacter.Beidou]: {},
  [ECharacter.Bennett]: {},
  [ECharacter.ChongYun]: {},
  [ECharacter.Diluc]: { needEnemies: 1, isRange: true },
  [ECharacter.Diona]: { needPlayer: true },
  [ECharacter.Eula]: { needEnemies: 1, isRange: true },
  [ECharacter.Fischl]: { needPlayer: true },
  [ECharacter.Ganyu]: { needEnemies: 3, isRange: true },
  [ECharacter.HuTao]: {},
  [ECharacter.Jean]: { needPlayer: true },
  [ECharacter.Kaeya]: {},
  [ECharacter.Kazuha]: { needPlayer: true },
  [ECharacter.KeQing]: { needEnemies: 3, isRange: true },
  [ECharacter.Klee]: { needEnemies: 1, isRange: true },
  [ECharacter.Lisa]: { needEnemies: 1, isRange: true },
  [ECharacter.Lumine]: { needEnemies: 1, isRange: true },
  [ECharacter.Mona]: { needEnemies: 1, isRange: true, needCharacter: true },
  [ECharacter.NingGuang]: { needEnemies: 1, isRange: true },
  [ECharacter.Noelle]: { needEnemies: 1 },
  [ECharacter.QiQi]: { needPlayer: true },
  [ECharacter.Raiden]: {},
  [ECharacter.Razor]: {},
  [ECharacter.Rosaria]: { needEnemies: 1 },
  [ECharacter.Sucrose]: {},
  [ECharacter.Tartaglia]: { needEnemies: 3, isRange: true },
  [ECharacter.Venti]: {},
  [ECharacter.XiangLing]: {},
  [ECharacter.Xiao]: {},
  [ECharacter.XingQiu]: {},
  [ECharacter.Xinyan]: {},
  [ECharacter.Yanfei]: {},
  [ECharacter.Yoimiya]: { needEnemies: 1, isRange: true },
  [ECharacter.ZhongLi]: { needPlayer: true },
};
