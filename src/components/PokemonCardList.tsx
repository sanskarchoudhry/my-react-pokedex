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

type PokemonCardListProps = {
  generationRefs: React.RefObject<{
    [key: string]: HTMLDivElement | null;
  }>;
};

function PokemonCardList({ generationRefs }: PokemonCardListProps) {
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

          results.push({
            genID: generation.id,
            genName: generation.title,
            pokemonData: data.results,
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
    <section className="flex flex-col gap-4 p-16 w-[75%] bg-white mt-12 rounded-t-[20px]">
      {pokemonData.map((data) => (
        <div
          key={data.genID}
          ref={(el) => {
            generationRefs.current[data.genID] = el;
          }}
        >
          <div className="mt-8">
            <h1 className="font-bold text-4xl mt-24">{`${data.genName} Pokémon`}</h1>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {data.pokemonData.map((pokemon: PokemonList) => (
                <PokemonCard url={pokemon.url} key={pokemon.name} />
              ))}
            </div>
          </div>
          <div className="w-[90%] h-0.5 bg-light-grey"></div>
        </div>
      ))}
    </section>
  );
}

export default PokemonCardList;
