import { useEffect, useState } from "react";
import { PokemonList } from "../pages/home/HomePage";
import { generations } from "../constants/generations";
import { fetchPokemonListByGeneration } from "../services/api/pokemonService";
import PokemonCard from "./PokemonCard";

export type PokemonListData = {
  genID: string;
  genName: string;
  pokemonData: PokemonList[];
};

function PokemonCardList() {
  const [pokemonData, setPokemonData] = useState<PokemonListData[]>([]);

  useEffect(() => {
    const fetchAllGenerations = async () => {
      try {
        const results: PokemonListData[] = [];

        for (const generation of generations) {
          const data = await fetchPokemonListByGeneration(
            generation.limit,
            generation.offset
          );

          const monsList: PokemonList[] = [];

          data.results.forEach((pokemon: PokemonList) => {
            monsList.push(pokemon);
          });

          results.push({
            genID: generation.id,
            genName: generation.name,
            pokemonData: monsList,
          });
        }

        setPokemonData(results);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    };

    fetchAllGenerations();
  }, []);

  // console.log(pokemonData);

  return (
    <section className=" grid-cols-8 grid p-16 w-[75%] bg-white mt-12 rounded-t-[20px]">
      {pokemonData &&
        pokemonData.map((pokemon: PokemonListData, index) => (
          <div key={index}>
            <PokemonCard url={pokemon.pokemonData.url} />
          </div>
        ))}
    </section>
  );
}

export default PokemonCardList;
