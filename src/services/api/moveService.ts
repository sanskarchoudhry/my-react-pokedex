import { axiosClient } from ".";
import { PokemonType } from "../../constants/pokemonType";
import { NameUrl } from "../../types";

export type MoveData = {
  accuracy: number;
  damage_class: NameUrl;
  name: string;
  pp: number;
  type: {
    name: PokemonType;
    url: string;
  };
  power: number;
  effect_entries: {
    effect: string;
    language: NameUrl;
    short_effect: string;
  }[];
  effect_chance: number;
  meta: {
    ailment: NameUrl;
    ailment_chance: number;
    category: NameUrl;
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
};

export const fetchMoveData = async (moveName?: string): Promise<MoveData> => {
  const response = await axiosClient.get(`/move/${moveName}`);
  return response.data;
};
