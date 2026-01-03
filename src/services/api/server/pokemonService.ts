import { Ability, SpriteUrl, Species, NameURL } from "@/types";
import { axiosClient } from "..";
import { PokemonType, TypeInfo } from "@/constants/pokemonType";
import { VersionGroup } from "@/constants/generations";
import { StatValues } from "@/constants/pokemonStats";
import { Stat } from "@/utils/flattenStat";
import { graphqlUrl } from "@/config/envConfig";

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

export type MinifiedPokemon = {
  id: string;
  name: string;
  types: PokemonType[];
  stats: { name: StatValues; value: string }[];
  sprite: string;
};

type GraphQLResponse = {
  data: {
    pokemon_v2_pokemon: {
      id: number;
      name: string;
      pokemon_v2_pokemontypes: {
        pokemon_v2_type: {
          name: string;
        };
      }[];
      pokemon_v2_pokemonstats: {
        base_stat: number;
        pokemon_v2_stat: {
          name: string;
        };
      }[];
    }[];
  };
};

export async function fetchAllPokemonMinified(): Promise<MinifiedPokemon[]> {
  const query = `
    query {
      pokemon_v2_pokemon(limit: 1000) {
        id
        name
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
        pokemon_v2_pokemonstats {
          base_stat
          pokemon_v2_stat {
            name
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(graphqlUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
      cache: "force-cache",
    });

    // CAST THE RESPONSE HERE
    const responseBody = (await res.json()) as GraphQLResponse; 
    const { data } = responseBody;

    // Now TypeScript knows exactly what 'p' is. No more 'any'.
    return data.pokemon_v2_pokemon.map((p) => ({
      id: p.id.toString(),
      name: p.name,
      types: p.pokemon_v2_pokemontypes.map(
        (t) => t.pokemon_v2_type.name as PokemonType
      ),
      stats: p.pokemon_v2_pokemonstats.map((s) => ({
        name: s.pokemon_v2_stat.name as StatValues,
        value: s.base_stat.toString(),
      })),
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`,
    }));
  } catch (error) {
    console.error("Error fetching GraphQL data:", error);
    return [];
  }
}

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