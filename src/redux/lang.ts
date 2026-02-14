import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ECard, ECharacter, ELeyline } from "../types/enums";
import { Lang } from "../types/general";
import { engNames as engNamesEnemies } from "../storage/enemies/names";
import {
  engDescriptions as engDescriptionsEnemies,
  rusDescriptions as rusDescriptionsEnemies,
} from "../storage/enemies/descriptions";
import { engCards } from "../storage/cards/names";
import {
  engDescriptions as engDescriptionsCards,
  rusDescriptions as rusDescriptionsCards,
} from "../storage/cards/descriptions";
import { engNames as engNamesCharacters } from "../storage/characters/names";
import { engDescriptions as engBursts } from "../storage/characters/bursts";
import { rusNames as rusNamesEnemies } from "../storage/enemies/names";
import { rusCards } from "../storage/cards/names";
import { rusDescriptions as rusBursts } from "../storage/characters/bursts";
import { rusNames as rusNamesCharacters } from "../storage/characters/names";
import { engText as engTextService, rusText as rusTextService } from "../storage/texts";
import { engLeylines, rusLeylines } from "../storage/leylines";
import { engElements, rusElements } from "../storage/elements";
import {
  type PlayerEffectLocale,
  engPlayerEffects,
  rusPlayerEffects,
} from "../storage/playerEffects";
import {
  type EnemyEffectLocale,
  engEnemyEffects,
  rusEnemyEffects,
} from "../storage/enemyEffects";

type LangType = {
  elements: Record<string, string>;
  enemies: {
    names: Record<string, string>;
    descriptions: Record<string, string>;
  };
  cards: {
    names: Record<ECard, string>;
    descriptions: Record<ECard, string>;
  };
  characters: {
    names: Record<ECharacter, string>;
    bursts: Record<ECharacter, { name: string; description: string }>;
  };
  service: Record<string, string>;
  leylines: Record<ELeyline, { name: string; description: string }>;
  playerEffects: PlayerEffectLocale;
  enemyEffects: EnemyEffectLocale;
};

const mapper: { EN: LangType; RU: LangType } = {
  EN: {
    elements: engElements,
    enemies: { names: engNamesEnemies, descriptions: engDescriptionsEnemies },
    cards: { names: engCards, descriptions: engDescriptionsCards },
    characters: { names: engNamesCharacters, bursts: engBursts },
    service: engTextService,
    leylines: engLeylines,
    playerEffects: engPlayerEffects,
    enemyEffects: engEnemyEffects,
  },
  RU: {
    elements: rusElements,
    enemies: { names: rusNamesEnemies, descriptions: rusDescriptionsEnemies },
    cards: { names: rusCards, descriptions: rusDescriptionsCards },
    characters: { names: rusNamesCharacters, bursts: rusBursts },
    service: rusTextService,
    leylines: rusLeylines,
    playerEffects: rusPlayerEffects,
    enemyEffects: rusEnemyEffects,
  },
};

const initialState: LangType = mapper.EN;

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    changeLanguage(state, action: PayloadAction<{ language: Lang }>) {
      const { language } = action.payload;
      return mapper[language] || {};
    },
  },
});

export default langSlice.reducer;
export const { changeLanguage } = langSlice.actions;
