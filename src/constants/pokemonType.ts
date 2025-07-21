<<<<<<< HEAD
export const types = {
=======
export type Type = {
  type: {
    name: PokemonType;
    url: string;
  };
};

export type PokemonType =
  | "normal"
  | "fairy"
  | "dark"
  | "dragon"
  | "ice"
  | "psychic"
  | "electric"
  | "grass"
  | "water"
  | "fire"
  | "steel"
  | "ghost"
  | "bug"
  | "rock"
  | "ground"
  | "poison"
  | "flying"
  | "fighting";

export const types: Record<PokemonType, Type & { bgColor: string }> = {
>>>>>>> main
  normal: {
    type: { name: "normal", url: "https://pokeapi.co/api/v2/type/1/" },
    bgColor: "#b3a69d",
  },
  fighting: {
    type: { name: "fighting", url: "https://pokeapi.co/api/v2/type/2/" },
    bgColor: "#b95640",
  },
  flying: {
    type: { name: "flying", url: "https://pokeapi.co/api/v2/type/3/" },
    bgColor: "#8999fe",
  },
  poison: {
    type: { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" },
    bgColor: "#ad519d",
  },
  ground: {
    type: { name: "ground", url: "https://pokeapi.co/api/v2/type/5/" },
    bgColor: "#e0bd56",
  },
  rock: {
    type: { name: "rock", url: "https://pokeapi.co/api/v2/type/6/" },
    bgColor: "#b9aa68",
  },
  bug: {
    type: { name: "bug", url: "https://pokeapi.co/api/v2/type/7/" },
    bgColor: "#aabb1f",
  },
  ghost: {
    type: { name: "ghost", url: "https://pokeapi.co/api/v2/type/8/" },
    bgColor: "#6467bb",
  },
  steel: {
    type: { name: "steel", url: "https://pokeapi.co/api/v2/type/9/" },
    bgColor: "#aba8b9",
  },
  fire: {
    type: { name: "fire", url: "https://pokeapi.co/api/v2/type/10/" },
    bgColor: "#ff431e",
  },
  water: {
    type: { name: "water", url: "https://pokeapi.co/api/v2/type/11/" },
    bgColor: "#339af6",
  },
  grass: {
    type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
    bgColor: "#77d458",
  },
  electric: {
    type: { name: "electric", url: "https://pokeapi.co/api/v2/type/13/" },
    bgColor: "#f5c633",
  },
  psychic: {
    type: { name: "psychic", url: "https://pokeapi.co/api/v2/type/14/" },
    bgColor: "#f64d91",
  },
  ice: {
    type: { name: "ice", url: "https://pokeapi.co/api/v2/type/15/" },
    bgColor: "#66cbff",
  },
  dragon: {
    type: { name: "dragon", url: "https://pokeapi.co/api/v2/type/16/" },
    bgColor: "#7768e8",
  },
  dark: {
    type: { name: "dark", url: "https://pokeapi.co/api/v2/type/17/" },
    bgColor: "#7b5244",
  },
  fairy: {
    type: { name: "fairy", url: "https://pokeapi.co/api/v2/type/18/" },
    bgColor: "#ed99ee",
  },
  //   {
  //     name: "stellar",
  //     url: "https://pokeapi.co/api/v2/type/19/",
  //   },
  //   {
  //     name: "unknown",
  //     url: "https://pokeapi.co/api/v2/type/10001/",
  //   },
<<<<<<< HEAD
} as const;

export type PokemonType = keyof typeof types;
export type TypeInfo = {
  type: (typeof types)[PokemonType]["type"];
};

export type TypeDetail = typeof types;

export const typeDefenses = {
  normal: {
    doubleDamageFrom: ["fighting"],
    doubleDamageTo: [],
    halfDamageFrom: [],
    halfDamageTo: ["rock", "steel"],
    noDamageFrom: ["ghost"],
    noDamageTo: ["ghost"],
  },
  fighting: {
    doubleDamageFrom: ["flying", "psychic", "fairy"],
    doubleDamageTo: ["normal", "rock", "steel", "ice", "dark"],
    halfDamageFrom: ["rock", "bug", "dark"],
    halfDamageTo: ["flying", "poison", "bug", "psychic", "fairy"],
    noDamageFrom: [],
    noDamageTo: ["ghost"],
  },
  flying: {
    doubleDamageFrom: ["rock", "electric", "ice"],
    doubleDamageTo: ["fighting", "bug", "grass"],
    halfDamageFrom: ["fighting", "bug", "grass"],
    halfDamageTo: ["rock", "steel", "electric"],
    noDamageFrom: ["ground"],
    noDamageTo: [],
  },
  poison: {
    doubleDamageFrom: ["ground", "psychic"],
    doubleDamageTo: ["grass", "fairy"],
    halfDamageFrom: ["fighting", "poison", "bug", "grass", "fairy"],
    halfDamageTo: ["poison", "ground", "rock", "ghost"],
    noDamageFrom: [],
    noDamageTo: ["steel"],
  },
  ground: {
    doubleDamageFrom: ["water", "grass", "ice"],
    doubleDamageTo: ["poison", "rock", "steel", "fire", "electric"],
    halfDamageFrom: ["poison", "rock"],
    halfDamageTo: ["bug", "grass"],
    noDamageFrom: ["electric"],
    noDamageTo: ["flying"],
  },
  rock: {
    doubleDamageFrom: ["fighting", "ground", "steel", "water", "grass"],
    doubleDamageTo: ["flying", "bug", "fire", "ice"],
    halfDamageFrom: ["normal", "flying", "poison", "fire"],
    halfDamageTo: ["fighting", "ground", "steel"],
    noDamageFrom: [],
    noDamageTo: [],
  },
  bug: {
    doubleDamageFrom: ["flying", "rock", "fire"],
    doubleDamageTo: ["grass", "psychic", "dark"],
    halfDamageFrom: ["fighting", "ground", "grass"],
    halfDamageTo: [
      "fighting",
      "flying",
      "poison",
      "ghost",
      "steel",
      "fire",
      "fairy",
    ],
    noDamageFrom: [],
    noDamageTo: [],
  },
  ghost: {
    doubleDamageFrom: ["ghost", "dark"],
    doubleDamageTo: ["ghost", "psychic"],
    halfDamageFrom: ["poison", "bug"],
    halfDamageTo: ["dark"],
    noDamageFrom: ["normal", "fighting"],
    noDamageTo: ["normal"],
  },
  steel: {
    doubleDamageFrom: ["fighting", "ground", "fire"],
    doubleDamageTo: ["rock", "ice", "fairy"],
    halfDamageFrom: [
      "normal",
      "flying",
      "rock",
      "bug",
      "steel",
      "grass",
      "psychic",
      "ice",
      "dragon",
      "fairy",
    ],
    halfDamageTo: ["steel", "fire", "water", "electric"],
    noDamageFrom: ["poison"],
    noDamageTo: [],
  },
  fire: {
    doubleDamageFrom: ["ground", "rock", "water"],
    doubleDamageTo: ["bug", "steel", "grass", "ice"],
    halfDamageFrom: ["bug", "steel", "fire", "grass", "ice", "fairy"],
    halfDamageTo: ["rock", "fire", "water", "dragon"],
    noDamageFrom: [],
    noDamageTo: [],
  },
  water: {
    doubleDamageFrom: ["grass", "electric"],
    doubleDamageTo: ["ground", "rock", "fire"],
    halfDamageFrom: ["steel", "fire", "water", "ice"],
    halfDamageTo: ["water", "grass", "dragon"],
    noDamageFrom: [],
    noDamageTo: [],
  },
  grass: {
    doubleDamageFrom: ["flying", "poison", "bug", "fire", "ice"],
    doubleDamageTo: ["ground", "rock", "water"],
    halfDamageFrom: ["ground", "water", "grass", "electric"],
    halfDamageTo: [
      "flying",
      "poison",
      "bug",
      "steel",
      "fire",
      "grass",
      "dragon",
    ],
    noDamageFrom: [],
    noDamageTo: [],
  },
  electric: {
    doubleDamageFrom: ["ground"],
    doubleDamageTo: ["flying", "water"],
    halfDamageFrom: ["flying", "steel", "electric"],
    halfDamageTo: ["grass", "electric", "dragon"],
    noDamageFrom: [],
    noDamageTo: ["ground"],
  },
  psychic: {
    doubleDamageFrom: ["bug", "ghost", "dark"],
    doubleDamageTo: ["fighting", "poison"],
    halfDamageFrom: ["fighting", "psychic"],
    halfDamageTo: ["steel", "psychic"],
    noDamageFrom: [],
    noDamageTo: ["dark"],
  },
  ice: {
    doubleDamageFrom: ["fighting", "rock", "steel", "fire"],
    doubleDamageTo: ["flying", "ground", "grass", "dragon"],
    halfDamageFrom: ["ice"],
    halfDamageTo: ["steel", "fire", "water", "ice"],
    noDamageFrom: [],
    noDamageTo: [],
  },
  dragon: {
    doubleDamageFrom: ["ice", "dragon", "fairy"],
    doubleDamageTo: ["dragon"],
    halfDamageFrom: ["fire", "water", "grass", "electric"],
    halfDamageTo: ["steel"],
    noDamageFrom: [],
    noDamageTo: ["fairy"],
  },
  dark: {
    doubleDamageFrom: ["fighting", "bug", "fairy"],
    doubleDamageTo: ["ghost", "psychic"],
    halfDamageFrom: ["ghost", "dark"],
    halfDamageTo: ["fighting", "dark", "fairy"],
    noDamageFrom: ["psychic"],
    noDamageTo: [],
  },
  fairy: {
    doubleDamageFrom: ["poison", "steel"],
    doubleDamageTo: ["fighting", "dragon", "dark"],
    halfDamageFrom: ["fighting", "bug", "dark"],
    halfDamageTo: ["poison", "steel", "fire"],
    noDamageFrom: ["dragon"],
    noDamageTo: [],
  },
} as const;

export type TypeDefenses = typeof typeDefenses;

export const effectivenessMultiplier: Record<
  number,
  { value: string; bgColor: string }
> = {
  0.5: {
    value: "1/2",
    bgColor: "#a30100",
  },
  0.25: {
    value: "1/4",
    bgColor: "#509806",
  },
  0: {
    value: "0",
    bgColor: "#2e3336",
  },
  1: {
    value: "",
    bgColor: "#fff",
  },
  2: {
    value: "2",
    bgColor: "#509806",
  },
  4: {
    value: "4",
    bgColor: "#509806",
  },
=======
>>>>>>> main
};
