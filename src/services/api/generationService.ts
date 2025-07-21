import { axiosClient } from ".";
import { NameUrl } from "../../types";

export type GenerationData = {
  abilities: [];
  id: number;
  main_region: NameUrl;
  moves: NameUrl[];
  name: string;
  pokemon_species: NameUrl[];
  types: NameUrl[];
  version_groups: NameUrl[];
};

export const fetchGenerationData = async (
  genID?: string
): Promise<GenerationData> => {
  const response = await axiosClient.get(`/generation/${genID}`);
  return response.data;
};
