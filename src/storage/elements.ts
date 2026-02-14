import { EElement } from "../types/enums";

export const engElements: Record<EElement, string> = {
  [EElement.Pyro]: "Pyro",
  [EElement.Cryo]: "Cryo",
  [EElement.Geo]: "Geo",
  [EElement.Anemo]: "Anemo",
  [EElement.Hydro]: "Hydro",
  [EElement.Electro]: "Electro",
  [EElement.Dendro]: "Dendro",
};

export const rusElements: Record<EElement, string> = {
  [EElement.Pyro]: "Пиро",
  [EElement.Cryo]: "Крио",
  [EElement.Geo]: "Гео",
  [EElement.Anemo]: "Анемо",
  [EElement.Hydro]: "Гидро",
  [EElement.Electro]: "Электро",
  [EElement.Dendro]: "Дендро",
};
