import { axiosClient } from "..";
import { PokemonType } from "@/constants/pokemonType";
import { NameURL } from "@/types";

export type MoveData = {
  accuracy: number;
  damage_class: NameURL;
  name: string;
  pp: number;
  id: number;
  type: {
    name: PokemonType;
    url: string;
  };
  power: number;
  effect_entries: {
    effect: string;
    language: NameURL;
    short_effect: string;
  }[];
  effect_chance: number;
  meta: {
    ailment: NameURL;
    ailment_chance: number;
    category: NameURL;
    crit_rate: number;
    drain: number;
    flinch_chance: number;
    healing: number;
    max_hits: number;
    max_turns: number;
    min_hits: number;
    min_turns: number;
    stat_chance: number;
  };
  flavor_text_entries: {
    flavor_text: string;
    language: NameURL;
    version_group: NameURL;
  }[];
  generation: NameURL;
  learned_by_pokemon: NameURL[];
};

export const fetchMoveData = async (moveName?: string): Promise<MoveData> => {
  const response = await axiosClient.get(`/move/${moveName}`);
  return response.data;
};
