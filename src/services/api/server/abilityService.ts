import { EffectEntries, FlavorTextEntries, NameURL } from "@/types";
import { axiosClient } from "..";

export type AbilityData = {
  effect_changes: [];
  effect_entries: EffectEntries[];
  generation: NameURL;
  id: string;
  pokemon: {
    is_hidden: boolean;
    pokemon: NameURL;
    slot: string;
  }[];
  flavor_text_entries: FlavorTextEntries[];
  name: string;
};

export async function fetchAbilityData(
  abilityName: string
): Promise<AbilityData> {
  try {
    const response = await axiosClient.get(`/ability/${abilityName}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
