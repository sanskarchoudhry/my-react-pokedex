import { Ability, SpriteUrl, Species, NameURL } from "@/types";
import { axiosClient } from "..";
import { TypeInfo } from "@/constants/pokemonType";
import { Stat } from "@/utils/flattenStat";
import { VersionGroup } from "@/constants/generations";

export type PokemonMove = {
  move: NameURL;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: NameURL;
    order: number;
    version_group: {
      name: VersionGroup;
      url: string;
    };
  }[];
};

export type PokemonData = {
  base_experience: string;
  abilities: Ability[];
  height: string;
  id: string;
  name: string;
  weight: string;
  stats: Stat[];
  types: TypeInfo[];
  sprites: SpriteUrl;
  species: Species;
  moves: PokemonMove[];
};

export const fetchPokemonData = async (
  nameOrId: string
): Promise<PokemonData> => {
  try {
    const response = await axiosClient.get(`/pokemon/${nameOrId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    throw error;
  }
};

export const fetchPokemonByGeneration = async (
  limit: string,
  offset: string
): Promise<NameURL[]> => {
  try {
    const response = await axiosClient.get(
      `/pokemon/?limit=${limit}&offset=${offset}`
    );
    return response.data.results;
  } catch (error) {
    console.error("error fetching pokemon data", error);
    throw error;
  }
};

export type PokemonForm = {
  is_default: boolean;
  pokemon: {
    name: string;
    url: string;
  };
}[];

export type PokemonSpeciesData = {
  id: string;
  name: string;
  pokedex_numbers: {
    entry_number: string;
    pokedex: {
      name: string;
      url: string;
    };
  }[];
  varieties: PokemonForm;
  evolution_chain: {
    url: string;
  };
  generation: NameURL;
  egg_groups: NameURL[];
  capture_rate: number;
  base_happiness: number;
  growth_rate: NameURL;
  hatch_counter: number;
  genera: {
    genus: string;
    language: NameURL;
  }[];
};

export const fetchPokemonSpeciesData = async (
  pokemonIdOrName: string
): Promise<PokemonSpeciesData | undefined> => {
  try {
    const speciesResponse = await axiosClient.get(
      `/pokemon-species/${pokemonIdOrName}`
    );
    return speciesResponse?.data;
  } catch (error) {
    console.error(error);
  }
};
