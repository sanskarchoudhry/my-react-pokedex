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

  return (
    <section className=" flex flex-col gap-4 p-16 w-[75%] bg-white mt-12 rounded-t-[20px]">
      {pokemonData.length > 0 &&
        pokemonData.map((data: PokemonListData, index) => (
          <div key={index}>
            <div className=" mt-8">
              <h1 className=" font-bold text-4xl">{`${data.genName} Pokémon`}</h1>
              <div className=" grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                {data.pokemonData.map((pokemon: PokemonList) => {
                  return <PokemonCard url={pokemon.url} key={pokemon.name} />;
                })}
              </div>
            </div>
            <div className="w-[90%] h-0.5 bg-light-grey"></div>
          </div>
        ))}
    </section>
  );
}

export default PokemonCardList;
