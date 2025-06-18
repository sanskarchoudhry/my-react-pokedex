import { NameUrl } from "../types";

export type Generation = {
  id: string;
  limit: number;
  offset: number;
  title: string;
  name: string;
  genID: string;
  versionGroups?: string[];
  regionName?: NameUrl;
};

export const allGenerationList = [
  "red-blue",
  "yellow",
  "gold-silver",
  "crystal",
  "ruby-sapphire",
  "emerald",
  "sword-shield",
  "brilliant-diamond-and-shining-pearl",
  "legends-arceus",
  "scarlet-violet",
  "firered-leafgreen",
  "diamond-pearl",
  "platinum",
  "heartgold-soulsilver",
  "black-white",
  "black-2-white-2",
  "x-y",
  "omega-ruby-alpha-sapphire",
  "sun-moon",
  "ultra-sun-ultra-moon",
] as const;

export type VersionGroup = (typeof allGenerationList)[number];

export const generations: Generation[] = [
  {
    id: "gen1",
    limit: 151,
    offset: 0,
    title: "Gen I",
    name: "Generation 1",
    genID: "1",
    versionGroups: ["red-blue", "yellow"],
    regionName: { name: "kanto", url: "https://pokeapi.co/api/v2/region/1/" },
  },
  {
    id: "gen2",
    limit: 100,
    offset: 151,
    title: "Gen II",
    name: "Generation 2",
    genID: "2",
    versionGroups: ["gold-silver", "crystal"],
    regionName: { name: "johto", url: "https://pokeapi.co/api/v2/region/2/" },
  },
  {
    id: "gen3",
    limit: 135,
    offset: 251,
    title: "Gen III",
    name: "Generation 3",
    genID: "3",
    versionGroups: ["ruby-sapphire", "emerald", "firered-leafgreen"],
    regionName: { name: "hoenn", url: "https://pokeapi.co/api/v2/region/3/" },
  },
  {
    id: "gen4",
    limit: 107,
    offset: 386,
    title: "Gen IV",
    name: "Generation 4",
    genID: "4",
    versionGroups: ["diamond-pearl", "platinum", "heartgold-soulsilver"],
    regionName: { name: "sinnoh", url: "https://pokeapi.co/api/v2/region/4/" },
  },
  {
    id: "gen5",
    limit: 156,
    offset: 493,
    title: "Gen V",
    name: "Generation 5",
    genID: "5",
    versionGroups: ["black-white", "black-2-white-2"],
    regionName: { name: "unova", url: "https://pokeapi.co/api/v2/region/5/" },
  },
  {
    id: "gen6",
    limit: 72,
    offset: 649,
    title: "Gen VI",
    name: "Generation 6",
    genID: "6",
    versionGroups: ["x-y", "omega-ruby-alpha-sapphire"],
    regionName: { name: "kalos", url: "https://pokeapi.co/api/v2/region/6/" },
  },
  {
    id: "gen7",
    limit: 88,
    offset: 721,
    title: "Gen VII",
    name: "Generation 7",
    genID: "7",
    versionGroups: ["sun-moon", "ultra-sun-ultra-moon"],
    regionName: { name: "alola", url: "https://pokeapi.co/api/v2/region/7/" },
  },
  {
    id: "gen8",
    limit: 96,
    offset: 809,
    title: "Gen VIII",
    name: "Generation 8",
    genID: "8",
    versionGroups: [
      "sword-shield",
      "brilliant-diamond-and-shining-pearl",
      "legends-arceus",
    ],
    regionName: { name: "galar", url: "https://pokeapi.co/api/v2/region/8/" },
  },
  {
    id: "gen9",
    limit: 115,
    offset: 905,
    title: "Gen IX",
    name: "Generation 9",
    genID: "9",
    versionGroups: ["scarlet-violet"],
    regionName: { name: "paldea", url: "https://pokeapi.co/api/v2/region/10/" },
  },
];

export type PokemonGenerations = {
  genID: string;
  versionGroups: string[];
  regionName: NameUrl;
};

export const versionGenerationMap: { [versionName in VersionGroup]?: string } =
  {
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
