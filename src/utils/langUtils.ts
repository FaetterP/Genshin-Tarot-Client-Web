import { Lang } from "../../types/general";

export function getBrowserLanguage() {
  return (navigator.languages && navigator.languages[0]) || navigator.language;
}

const rusLangs = ["ru-RU", "ru"];

export function getBrowserLang(): Lang {
  const language = getBrowserLanguage();

  return rusLangs.includes(language) ? "RU" : "EN";
}
