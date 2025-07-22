import { axiosClient } from "..";
import { NameURL } from "@/types";

export type GenerationData = {
  abilities: NameURL[];
  id: number;
  main_region: NameURL;
  moves: NameURL[];
  name: string;
  pokemon_species: NameURL[];
  types: NameURL[];
  version_groups: NameURL[];
};

export const fetchGenerationData = async (
  genID?: string
): Promise<GenerationData> => {
  const response = await axiosClient.get(`/generation/${genID}`);
  return response.data;
};
