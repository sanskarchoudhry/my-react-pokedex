import { axiosClient } from ".";
import { NameUrl } from "../../types";

export type MoveData = {
  accuracy: number;
  damage_class: NameUrl;
  name: string;
  type: NameUrl;
  power: number;
};

export const fetchMoveData = async (moveURL: string): Promise<MoveData> => {
  const response = await axiosClient.get(moveURL);
  return response.data;
};
