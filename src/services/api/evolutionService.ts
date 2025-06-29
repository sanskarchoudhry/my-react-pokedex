import { axiosClient } from ".";
import { NameUrl } from "../../types";
import { fetchPokemonSpeciesData } from "./pokemonService";

export type EvolutionChainData = {
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainData[];
  is_baby: boolean;
  species: NameUrl;
};

export type EvolutionDetail = {
  gender: number | null;
  held_item: NameUrl | null;
  item: NameUrl | null;
  known_move: NameUrl | null;
  known_move_type: NameUrl | null;
  location: NameUrl | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: NameUrl | null;
  party_type: NameUrl | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: NameUrl | null;
  trigger: NameUrl;
  turn_upside_down: boolean;
};

export const fetchEvolutionData = async (
  pokemonName: string
): Promise<EvolutionChainData | undefined> => {
  try {
    const species = await fetchPokemonSpeciesData(pokemonName);
    const evolutionChainUrl = species?.evolution_chain?.url;

    if (!evolutionChainUrl) {
      console.warn(`No evolution chain found for: ${pokemonName}`);
      return undefined;
    }

    const { data } = await axiosClient.get(evolutionChainUrl);
    return data.chain;
  } catch (error) {
    console.error("Error fetching evolution data:", error);
    return undefined;
  }
};
