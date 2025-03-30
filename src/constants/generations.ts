export type Generation = {
  id: string;
  limit: number;
  offset: number;
  title: string;
};

export const generations: Generation[] = [
  { id: "gen1", limit: 151, offset: 0, title: "Gen I" },
  { id: "gen2", limit: 100, offset: 151, title: "Gen II" },
  { id: "gen3", limit: 135, offset: 251, title: "Gen III" },
  { id: "gen4", limit: 107, offset: 386, title: "Gen IV" },
  { id: "gen5", limit: 156, offset: 493, title: "Gen V" },
  { id: "gen6", limit: 72, offset: 649, title: "Gen VI" },
  { id: "gen7", limit: 88, offset: 721, title: "Gen VII" },
  { id: "gen8", limit: 96, offset: 809, title: "Gen VIII" },
  { id: "gen9", limit: 115, offset: 905, title: "Gen IX" },
];
