export const statValues = {
  defense: "Defense",
  attack: "Attack",
  hp: "HP",
  "special-attack": "Spl. Atk",
  "special-defense": "Spl. Def",
  speed: "Speed",
} as const;

export type StatValues = keyof typeof statValues;
