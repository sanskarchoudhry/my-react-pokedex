import { fetchPokemonSpeciesData } from "../services/api/pokemonService";

export type PokemonForm = {
  is_default: boolean;
  pokemon: {
    name: string;
    url: string;
  };
}[];

export async function getPokemonForms(
  url: string
): Promise<PokemonForm | undefined> {
  try {
    const pokemonFormsData = await fetchPokemonSpeciesData(url);
    return pokemonFormsData?.varieties;
  } catch (error) {
    console.error(error);
  }
}
