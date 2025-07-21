export type StatValues =
  | "defense"
  | "attack"
  | "hp"
  | "special-attack"
  | "special-defense"
  | "speed";

export const statValues: Record<StatValues, string> = {
  defense: "Defense",
  attack: "Attack",
  hp: "HP",
  "special-attack": "Spl. Atk",
  "special-defense": "Spl. Def",
  speed: "Speed",
};
