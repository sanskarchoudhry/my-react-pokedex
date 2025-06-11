export type Generation = {
  id: string;
  limit: number;
  offset: number;
  title: string;
  name: string;
};

export const generations: Generation[] = [
  { id: "gen1", limit: 151, offset: 0, title: "Gen I", name: "Generation 1" },
  {
    id: "gen2",
    limit: 100,
    offset: 151,
    title: "Gen II",
    name: "Generation 2",
  },
  {
    id: "gen3",
    limit: 135,
    offset: 251,
    title: "Gen III",
    name: "Generation 3",
  },
  {
    id: "gen4",
    limit: 107,
    offset: 386,
    title: "Gen IV",
    name: "Generation 4",
  },
  { id: "gen5", limit: 156, offset: 493, title: "Gen V", name: "Generation 5" },
  { id: "gen6", limit: 72, offset: 649, title: "Gen VI", name: "Generation 6" },
  {
    id: "gen7",
    limit: 88,
    offset: 721,
    title: "Gen VII",
    name: "Generation 7",
  },
  {
    id: "gen8",
    limit: 96,
    offset: 809,
    title: "Gen VIII",
    name: "Generation 8",
  },
  {
    id: "gen9",
    limit: 115,
    offset: 905,
    title: "Gen IX",
    name: "Generation 9",
  },
];
