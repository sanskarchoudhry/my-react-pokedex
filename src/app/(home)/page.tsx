import { fetchAllPokemonMinified } from "@/services/api/server/pokemonService";
import PokemonList from "./_components/PokemonListTable";

export default async function HomePage() {

  const allPokemon = await fetchAllPokemonMinified();

  return (
    <section className="container mx-auto p-4">
      <PokemonList pokemonListData={allPokemon} />
    </section>
  );
}