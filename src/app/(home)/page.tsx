import { generations } from "@/constants/generations";
import {
  fetchPokemonByGeneration,
  fetchPokemonData,
  PokemonData,
} from "@/services/api/server/pokemonService";
import PokemonList from "./_components/PokemonListTable";

export default async function HomePage() {
  const pokemonListData: PokemonData[] = [];

  for (const generation of generations) {
    const pokemonList = await fetchPokemonByGeneration(
      String(generation.limit),
      String(generation.offset)
    );

    const generationData = await Promise.all(
      pokemonList.map((pokemon) => fetchPokemonData(pokemon.name))
    );

    pokemonListData.push(...generationData);
  }

  return (
    <section className="">
      <PokemonList pokemonListData={pokemonListData} />
    </section>
  );
}
