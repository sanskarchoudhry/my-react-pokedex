import { axiosClient } from "..";
import { fetchPokemonSpeciesData } from "./pokemonService";

export type EvolutionChainData = {
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainData[];
  is_baby: boolean;
  species: NamedAPIResource;
};

export type EvolutionDetail = {
  gender: number | null;
  held_item: NamedAPIResource | null;
  item: NamedAPIResource | null;
  known_move: NamedAPIResource | null;
  known_move_type: NamedAPIResource | null;
  location: NamedAPIResource | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: NamedAPIResource | null;
  party_type: NamedAPIResource | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: NamedAPIResource | null;
  trigger: NamedAPIResource;
  turn_upside_down: boolean;
};

export type NamedAPIResource = {
  name: string;
  url: string;
};

export const fetchEvolutionData = async (
  evolutionChainURL: string
): Promise<EvolutionChainData | undefined> => {
  try {
    const { data } = await axiosClient.get(evolutionChainURL);
    return data.chain;
  } catch (error) {
    console.error("Error fetching evolution data:", error);
    return undefined;
  }
};
