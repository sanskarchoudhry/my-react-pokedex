import React, { useEffect, useState } from "react";
import { PokemonList } from "../pages/home/HomePage";
import { generations } from "../constants/generations";
import { fetchPokemonListByGeneration } from "../services/api/pokemonService";
import PokemonCard from "./PokemonCard";

export type PokemonListData = {
  genID: string;
  pokemonData: PokemonList;
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

          data.results.forEach((pokemon: PokemonList) => {
            results.push({
              genID: generation.id,
              pokemonData: pokemon,
            });
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
    <div className=" grid-cols-8 grid w-full p-16">
      {pokemonData &&
        pokemonData.map((pokemon: PokemonListData, index) => (
          <div key={index}>
            <PokemonCard url={pokemon.pokemonData.url} />
          </div>
        ))}
    </div>
  );
}

export default PokemonCardList;
