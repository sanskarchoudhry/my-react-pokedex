import { axiosClient } from ".";

export const fetchGenerations = async (genID: string) => {
  const response = await axiosClient.get(
    `https://pokeapi.co/api/v2/generation/${genID}`
  );
  console.log(response);
};
