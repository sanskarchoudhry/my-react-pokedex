import { NameUrl } from "../types";

export const generations = [
  {
    id: "1",
    limit: 151,
    offset: 0,
    title: "Gen I",
    name: "Generation 1",
    versionGroups: ["red-blue", "yellow"],
  },
  {
    id: "2",
    limit: 100,
    offset: 151,
    title: "Gen II",
    name: "Generation 2",
    versionGroups: ["gold-silver", "crystal"],
  },
  {
    id: "3",
    limit: 135,
    offset: 251,
    title: "Gen III",
    name: "Generation 3",
    versionGroups: ["ruby-sapphire", "emerald", "firered-leafgreen"],
  },
  {
    id: "4",
    limit: 107,
    offset: 386,
    title: "Gen IV",
    name: "Generation 4",
    versionGroups: ["diamond-pearl", "platinum", "heartgold-soulsilver"],
  },
  {
    id: "5",
    limit: 156,
    offset: 493,
    title: "Gen V",
    name: "Generation 5",
    versionGroups: ["black-white", "black-2-white-2"],
  },
  {
    id: "6",
    limit: 72,
    offset: 649,
    title: "Gen VI",
    name: "Generation 6",
    versionGroups: ["x-y", "omega-ruby-alpha-sapphire"],
  },
  {
    id: "7",
    limit: 88,
    offset: 721,
    title: "Gen VII",
    name: "Generation 7",
    versionGroups: ["sun-moon", "ultra-sun-ultra-moon"],
  },
  {
    id: "8",
    limit: 96,
    offset: 809,
    title: "Gen VIII",
    name: "Generation 8",
    versionGroups: [
      "sword-shield",
      "brilliant-diamond-and-shining-pearl",
      "legends-arceus",
    ],
  },
  {
    id: "9",
    limit: 115,
    offset: 905,
    title: "Gen IX",
    name: "Generation 9",
    versionGroups: ["scarlet-violet"],
  },
] as const;

export type Generation = (typeof generations)[number];

export type VersionGroup = Generation["versionGroups"][number];

export type PokemonGenerations = {
  genID: string;
  versionGroups: VersionGroup[];
  regionName: NameUrl;
};

export const versionGenerationMap: Record<VersionGroup, Generation["id"]> = {
  "red-blue": "1",
  yellow: "1",
  "gold-silver": "2",
  crystal: "2",
  "ruby-sapphire": "3",
  emerald: "3",
  "firered-leafgreen": "3",
  "diamond-pearl": "4",
  platinum: "4",
  "heartgold-soulsilver": "4",
  "black-white": "5",
  "black-2-white-2": "5",
  "x-y": "6",
  "omega-ruby-alpha-sapphire": "6",
  "sun-moon": "7",
  "ultra-sun-ultra-moon": "7",
  "sword-shield": "8",
  "brilliant-diamond-and-shining-pearl": "8",
  "legends-arceus": "8",
  "scarlet-violet": "9",
};
