export const ELEMENT_COLORS: Record<string, string> = {
  Pyro: "255, 80, 30",
  Cryo: "160, 240, 255",
  Electro: "180, 100, 255",
  Hydro: "80, 170, 255",
  Geo: "180, 140, 80",
  Anemo: "140, 255, 220",
  Dendro: "120, 200, 80",
};

export function toElementKey(element: string): string {
  if (!element) return "";
  return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
}

export function getElementStyleClass(
  element: string,
  prefix: "element_" | "elementGlow_",
  styles: Record<string, string>
): string {
  if (!element || element.length === 0) return "";
  const key = `${prefix}${toElementKey(element)}`;
  return (styles[key as keyof typeof styles] as string | undefined) ?? "";
}

export function getReactionStyle(
  element1: string,
  element2: string
): Record<string, string> | undefined {
  const e1 = toElementKey(element1);
  const e2 = toElementKey(element2);
  const c1 = ELEMENT_COLORS[e1] ?? "200, 200, 200";
  const c2 = ELEMENT_COLORS[e2] ?? "200, 200, 200";
  return {
    "--reaction-color1": `rgba(${c1}, 0.9)`,
    "--reaction-color2": `rgba(${c2}, 0.9)`,
  };
}

export function getReactionDecorClass(
  element1: string,
  element2: string,
  styles: Record<string, string>
): string {
  const e1 = toElementKey(element1);
  const e2 = toElementKey(element2);
  const [a, b] = [e1, e2].sort();
  return (styles[`reaction_${a}_${b}`] as string | undefined) ?? "";
}
