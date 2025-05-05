import { axiosClient } from ".";
import { Type } from "../../constants/pokemonType";
import { Ability, Species, SpriteUrl } from "../../types";
import { Stat } from "../../utils/flattenStatsArray";
import { PokemonForm } from "../../utils/getPokemonForms";

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
};

export const fetchPokemonSpeciesData = async (
  url: string
): Promise<PokemonSpeciesData | undefined> => {
  try {
    const response = await axiosClient.get(url);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};
