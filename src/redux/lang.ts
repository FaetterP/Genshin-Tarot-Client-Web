import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lang } from "../../types/general";
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
import {
  engText as engTextService,
  rusText as rusTextService,
} from "../storage/texts";
import { engLeylines, rusLeylines } from "../storage/leylines";
import { engElements, rusElements } from "../storage/elements";
import {
  engPlayerEffects,
  rusPlayerEffects,
} from "../storage/playerEffects";

type LangType = {
  elements: Record<string, string>;
  enemies: {
    names: Record<string, string>;
    descriptions: Record<string, string>;
  };
  cards: {
    names: Record<string, string>;
    descriptions: Record<string, string>;
  };
  characters: {
    names: Record<string, string>;
    bursts: Record<string, { name: string; description: string; cost: number }>;
  };
  service: Record<string, string>;
  leylines: Record<string, string>;
  playerEffects: Record<string, string>;
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
  },
  RU: {
    elements: rusElements,
    enemies: { names: rusNamesEnemies, descriptions: rusDescriptionsEnemies },
    cards: { names: rusCards, descriptions: rusDescriptionsCards },
    characters: { names: rusNamesCharacters, bursts: rusBursts },
    service: rusTextService,
    leylines: rusLeylines,
    playerEffects: rusPlayerEffects,
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
