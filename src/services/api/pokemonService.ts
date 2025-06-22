import { axiosClient } from ".";
import { Type } from "../../constants/pokemonType";
import { Ability, NameUrl, Species, SpriteUrl } from "../../types";
import { PokemonMove } from "../../utils/flattenPokemonMovesArray";
import { Stat } from "../../utils/flattenStatsArray";

export type PokemonData = {
  base_experience: string;
  abilities: Ability[];
  height: string;
  id: string;
  name: string;
  weight: string;
  stats: Stat[];
  types: Type[];
  sprites: SpriteUrl;
  species: Species;
  moves: PokemonMove[];
};

export const fetchPokemonData = async (
  id?: number,
  name?: string
): Promise<PokemonData> => {
  try {
    const response = await axiosClient.get(`/pokemon/${id ? id : name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    throw error;
  }
};

export const fetchPokemonListByGeneration = async (
  limit: number,
  offset: number
) => {
  try {
    const response = await axiosClient.get(
      `/pokemon/?limit=${limit}&offset=${offset}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    throw error;
  }
};

export const fetchEvolutionChain = async (url: string) => {
  try {
    const response = await axiosClient.get(url);
    const evolutionChainUrl: string = response?.data?.evolution_chain?.url;

    const evolutionChainResponse = await axiosClient.get(evolutionChainUrl);

    return evolutionChainResponse.data;
  } catch (error) {
    console.error(error);
  }
};

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
  generation: NameUrl;
};

export const fetchPokemonSpeciesData = async (
  pokemonName: string
): Promise<PokemonSpeciesData | undefined> => {
  try {
    const pokemonResponse = await fetchPokemonData(void 0, pokemonName);
    const speciesURL = pokemonResponse?.species?.url;
    const speciesResponse = await axiosClient.get(speciesURL);
    return speciesResponse?.data;
  } catch (error) {
    console.error(error);
  }
};

export type PokemonForm = {
  is_default: boolean;
  pokemon: {
    name: string;
    url: string;
  };
}[];

export async function getPokemonForms(
  url: string
): Promise<PokemonForm | undefined> {
  try {
    const pokemonFormsData = await fetchPokemonSpeciesData(url);
    return pokemonFormsData?.varieties;
  } catch (error) {
    console.error(error);
  }
}
