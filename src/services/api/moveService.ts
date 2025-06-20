import { axiosClient } from ".";
import { PokemonType } from "../../constants/pokemonType";
import { NameUrl } from "../../types";

export type MoveData = {
  accuracy: number;
  damage_class: NameUrl;
  name: string;
  type: {
    name: PokemonType;
    url: string;
  };
  power: number;
};

export const fetchMoveData = async (moveURL: string): Promise<MoveData> => {
  const response = await axiosClient.get(moveURL);
  return response.data;
};
