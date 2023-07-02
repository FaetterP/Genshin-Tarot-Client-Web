export const cards: Record<
  string,
  {
    cost: number;
    isUpgraded: boolean;
    require?: {
      enemiesCount?: number;
      isRange?: boolean;
      isCanAlternative?: boolean;
      isNeedPlayer?: boolean;
    };
  }
> = {
  ForeignRockblade: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1 },
  },
  ForeignRockbladePlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1 },
  },
  StarfellSword: { cost: 2, isUpgraded: false },
  StarfellSwordPlus: { cost: 1, isUpgraded: true },
  WeissBladework: { cost: 1, isUpgraded: false, require: { enemiesCount: 1 } },
  WeissBladeworkPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1 },
  },
  SolarIsotoma: { cost: 2, isUpgraded: false },
  SolarIsotomaPlus: { cost: 1, isUpgraded: true },
  Sharpshooter: {
    cost: 0,
    isUpgraded: false,
    require: { enemiesCount: 1, isRange: true, isCanAlternative: true },
  },
  SharpshooterPlus: {
    cost: 0,
    isUpgraded: true,
    require: { enemiesCount: 1, isRange: true },
  },
  ExplosivePuppet: { cost: 2, isUpgraded: false, require: { enemiesCount: 1 } },
  ExplosivePuppetPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1 },
  },
  WhisperOfWater: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isRange: true },
  },
  WhisperOfWaterPlus: {
    cost: 1,
    isUpgraded: true,
    require: { isNeedPlayer: true },
  },
  LetTheShowBegin: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isNeedPlayer: true, isCanAlternative: true },
  },
  LetTheShowBeginPlus: { cost: 1, isUpgraded: true },
  Oceanborn: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isCanAlternative: true },
  },
  OceanbornPlus: { cost: 1, isUpgraded: true },
  Tidecaller: { cost: 1, isUpgraded: false },
  TidecallerPlus: { cost: 1, isUpgraded: true },
  StrikeOfFortune: { cost: 1, isUpgraded: false, require: { enemiesCount: 1 } },
  StrikeOfFortunePlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1 },
  },
  PassionOverload: { cost: 1, isUpgraded: false, require: { enemiesCount: 1 } },
  PassionOverloadPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1 },
  },
  Demonbane: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isCanAlternative: true },
  },
  DemonbanePlus: { cost: 1, isUpgraded: true },
  LayeredFrost: { cost: 1, isUpgraded: false },
  LayeredFrostPlus: { cost: 0, isUpgraded: true },
  TemperedSword: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isCanAlternative: true },
  },
  TemperedSwordPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1 },
  },
  SearingOnslaught: {
    cost: 2,
    isUpgraded: false,
    require: { enemiesCount: 3 },
  },
  SearingOnslaughtPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 3 },
  },
  KatzleinStyle: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isRange: true },
  },
  KatzleinStylePlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1, isRange: true },
  },
  IcyPaws: { cost: 1, isUpgraded: false, require: { isCanAlternative: true } },
  IcyPawsPlus: { cost: 1, isUpgraded: true },
  EdelBladework: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isCanAlternative: true },
  },
  EdelBladeworkPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1 },
  },
  IcetideVortex: { cost: 1, isUpgraded: false, require: { enemiesCount: 1 } },
  IcetideVortexPlus: {
    cost: 0,
    isUpgraded: true,
    require: { enemiesCount: 1 },
  },
  BoltsOfDownfall: {
    cost: 0,
    isUpgraded: false,
    require: { enemiesCount: 1, isRange: true, isCanAlternative: true },
  },
  BoltsOfDownfallPlus: {
    cost: 0,
    isUpgraded: true,
    require: { enemiesCount: 1, isRange: true },
  },
  Nightrider: { cost: 1, isUpgraded: false, require: { enemiesCount: 1 } },
  NightriderPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1, isRange: true },
  },
  LiutianArchery: {
    cost: 0,
    isUpgraded: false,
    require: { enemiesCount: 1, isRange: true, isCanAlternative: true },
  },
  LiutianArcheryPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1, isRange: true, isCanAlternative: true },
  },
  TrailOfTheQilin: { cost: 2, isUpgraded: false, require: { enemiesCount: 1 } },
  TrailOfTheQilinPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1 },
  },
  SpearOfWangsheng: {
    cost: 0,
    isUpgraded: false,
    require: { enemiesCount: 1 },
  },
  SpearOfWangshengPlus: {
    cost: 0,
    isUpgraded: true,
    require: { enemiesCount: 1 },
  },
  GuideOfAfterlife: {
    cost: 1,
    isUpgraded: false,
    require: { isCanAlternative: true },
  },
  GuideOfAfterlifePlus: {
    cost: 0,
    isUpgraded: true,
    require: { isCanAlternative: true },
  },
  FavoniusBladework: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1 },
  },
  FavoniusBladeworkPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1 },
  },
  GaleBlade: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isCanAlternative: true },
  },
  GaleBladePlus: {
    cost: 0,
    isUpgraded: true,
    require: { enemiesCount: 1, isRange: true, isCanAlternative: true },
  },
  CeremonialBladework: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1 },
  },
  CeremonialBladeworkPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1 },
  },
  Frostgnaw: { cost: 1, isUpgraded: false },
  FrostgnawPlus: { cost: 1, isUpgraded: true },
  GaryuuBladework: { cost: 1, isUpgraded: false, require: { enemiesCount: 1 } },
  GaryuuBladeworkPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1 },
  },
  Chihayaburu: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 2, isRange: true, isCanAlternative: true },
  },
  ChihayaburuPlus: { cost: 0, isUpgraded: true },
  YunlaiSwordsmanship: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1 },
  },
  YunlaiSwordsmanshipPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1 },
  },
  StellarRestoration: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isRange: true, isCanAlternative: true },
  },
  StellarRestorationPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 3, isRange: true },
  },
  Kaboom: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isRange: true },
  },
  KaboomPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1, isRange: true, isCanAlternative: true },
  },
  JumpyDumpty: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 2, isCanAlternative: true },
  },
  JumpyDumptyPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 2, isCanAlternative: true },
  },
  LightningTouch: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isRange: true },
  },
  LightningTouchPlus: {
    cost: 0,
    isUpgraded: true,
    require: { enemiesCount: 1, isRange: true },
  },
  VioletArc: { cost: 2, isUpgraded: false },
  VioletArcPlus: { cost: 1, isUpgraded: true },
  ForeignIronwind: { cost: 1, isUpgraded: false, require: { enemiesCount: 1 } },
  ForeignIronwindPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1 },
  },
  PalmVortex: { cost: 1, isUpgraded: false },
  PalmVortexPlus: { cost: 1, isUpgraded: true },
  RippleOfFate: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isRange: true },
  },
  RippleOfFatePlus: { cost: 0, isUpgraded: true },
  MirrorReflections: {
    cost: 2,
    isUpgraded: false,
    require: { enemiesCount: 1 },
  },
  MirrorReflectionsPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1 },
  },
  SparklingScatter: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isRange: true },
  },
  SparklingScatterPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 2, isRange: true },
  },
  JadeScreen: { cost: 1, isUpgraded: false, require: { isNeedPlayer: true } },
  JadeScreenPlus: {
    cost: 1,
    isUpgraded: true,
    require: { isNeedPlayer: true },
  },
  MaidsBladework: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isCanAlternative: true },
  },
  MaidsBladeworkPlus: { cost: 0, isUpgraded: true },
  Breastplate: { cost: 1, isUpgraded: false },
  BreastplatePlus: { cost: 1, isUpgraded: true },
  AncientSwordArt: { cost: 1, isUpgraded: false, require: { enemiesCount: 1 } },
  AncientSwordArtPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1 },
  },
  HeraldOfFrost: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isRange: true },
  },
  HeraldOfFrostPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1, isRange: true },
  },
  Origin: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isCanAlternative: true },
  },
  OriginPlus: { cost: 1, isUpgraded: true, require: { enemiesCount: 1 } },
  BalefulOmen: { cost: 1, isUpgraded: false, require: { isNeedPlayer: true } },
  BalefulOmenPlus: {
    cost: 1,
    isUpgraded: true,
    require: { isNeedPlayer: true },
  },
  SteelFang: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isCanAlternative: true },
  },
  SteelFangPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1, isCanAlternative: true },
  },
  ClawAndThunder: { cost: 1, isUpgraded: false },
  ClawAndThunderPlus: { cost: 1, isUpgraded: true },
  SpearOfTheChurch: {
    cost: 0,
    isUpgraded: false,
    require: { enemiesCount: 2, isRange: true, isCanAlternative: true },
  },
  SpearOfTheChurchPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1, isCanAlternative: true },
  },
  RavagingConfession: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isRange: true, isCanAlternative: true },
  },
  RavagingConfessionPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1, isRange: true, isCanAlternative: true },
  },
  WindSpiritCreation: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isRange: true },
  },
  WindSpiritCreationPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 2, isRange: true },
  },
  AnemoHypostatis: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isRange: true },
  },
  AnemoHypostatisPlus: { cost: 1, isUpgraded: true },
  CuttingTorrent: {
    cost: 0,
    isUpgraded: false,
    require: { enemiesCount: 1, isRange: true, isCanAlternative: true },
  },
  CuttingTorrentPlus: {
    cost: 0,
    isUpgraded: true,
    require: { enemiesCount: 1, isRange: true },
  },
  RagingTide: { cost: 1, isUpgraded: false },
  RagingTidePlus: { cost: 0, isUpgraded: true },
  DivineArchery: {
    cost: 0,
    isUpgraded: false,
    require: { enemiesCount: 1, isRange: true, isCanAlternative: true },
  },
  DivineArcheryPlus: {
    cost: 0,
    isUpgraded: true,
    require: { enemiesCount: 1, isRange: true, isCanAlternative: true },
  },
  SkywardSonnet: { cost: 1, isUpgraded: false },
  SkywardSonnetPlus: {
    cost: 1,
    isUpgraded: true,
    require: { isNeedPlayer: true },
  },
  DoughFu: {
    cost: 0,
    isUpgraded: false,
    require: { enemiesCount: 1, isCanAlternative: true },
  },
  DoughFuPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1, isCanAlternative: true },
  },
  GuobaFire: { cost: 2, isUpgraded: false },
  GuobaFirePlus: { cost: 1, isUpgraded: true },
  WhirlwindThrust: {
    cost: 0,
    isUpgraded: false,
    require: { enemiesCount: 2, isRange: true, isCanAlternative: true },
  },
  WhirlwindThrustPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1, isCanAlternative: true },
  },
  LemniscaticWind: { cost: 1, isUpgraded: false },
  LemniscaticWindPlus: { cost: 1, isUpgraded: true },
  GuhuaStyle: { cost: 1, isUpgraded: false, require: { enemiesCount: 1 } },
  GuhuaStylePlus: { cost: 1, isUpgraded: true, require: { enemiesCount: 1 } },
  FatalRainscreen: {
    cost: 2,
    isUpgraded: false,
    require: { enemiesCount: 1, isNeedPlayer: true },
  },
  FatalRainscreenPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1, isNeedPlayer: true },
  },
  DanceOfFire: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isCanAlternative: true },
  },
  DanceOfFirePlus: { cost: 1, isUpgraded: true },
  SweepingFervor: { cost: 1, isUpgraded: false },
  SweepingFervorPlus: { cost: 0, isUpgraded: true },
  SealOfApproval: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isRange: true },
  },
  SealOfApprovalPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1, isRange: true },
  },
  SignedEdict: { cost: 1, isUpgraded: false, require: { enemiesCount: 1 } },
  SignedEdictPlus: {
    cost: 1,
    isUpgraded: true,
    require: { isCanAlternative: true, isNeedPlayer: true },
  },
  FireworkFlareUp: {
    cost: 1,
    isUpgraded: false,
    require: { enemiesCount: 1, isRange: true },
  },
  FireworkFlareUpPlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 3, isRange: true },
  },
  NiwabiFireDance: { cost: 0, isUpgraded: false },
  NiwabiFireDancePlus: { cost: 0, isUpgraded: true },
  RainOfStone: {
    cost: 0,
    isUpgraded: false,
    require: { enemiesCount: 2, isRange: true, isCanAlternative: true },
  },
  RainOfStonePlus: {
    cost: 1,
    isUpgraded: true,
    require: { enemiesCount: 1, isCanAlternative: true },
  },
  DominusLapidis: {
    cost: 2,
    isUpgraded: false,
    require: { isNeedPlayer: true },
  },
  DominusLapidisPlus: {
    cost: 1,
    isUpgraded: true,
    require: { isNeedPlayer: true },
  },
};
