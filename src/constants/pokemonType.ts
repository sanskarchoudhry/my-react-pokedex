export type Type = {
  type: {
    name: PokemonType;
    url: string;
  };
};

export const types = {
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
} as const;

export type PokemonType = keyof typeof types;
