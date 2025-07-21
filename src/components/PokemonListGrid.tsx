import { fetchPokemonData } from "@/services/api/server/pokemonService";
import { NameURL } from "@/types";
import PokemonCard from "./PokemonCard";

export default async function PokemonListGrid({
  pokemonList,
}: {
  pokemonList: NameURL[];
}) {
  const pokemonData = await Promise.all(
    pokemonList.map((pokemon) => fetchPokemonData(pokemon.name))
  );

  return (
    <section className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
      {pokemonData.map((pokemon, index) => {
        return <PokemonCard pokemonData={pokemon} key={index} />;
      })}
    </section>
  );
}
