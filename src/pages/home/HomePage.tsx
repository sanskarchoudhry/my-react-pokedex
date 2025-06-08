import React, { useEffect, useState } from "react";
import GenerationSiderbar from "../../components/GenerationSidebar";
import { fetchPokemonListByGeneration } from "../../services/api/pokemonService";
import { generations } from "../../constants/generations";
import { getGenerationIndex } from "../../utils";
import PokemonCard from "../../components/PokemonCard";
import Banner from "../../components/Banner";

export type PokemonList = {
  name: string;
  url: string;
};

export default function HomePage() {
  const [selectedGeneration, setSelectedGeneration] = useState<string>("gen1");
  const [pokemonList, setPokemonList] = useState<PokemonList[]>();

  const handleSelectedGeneration = (generationID: string): void => {
    setSelectedGeneration(generationID);
  };

  useEffect(() => {
    async function fetchPokemonListData() {
      const limit = generations[getGenerationIndex(selectedGeneration)].limit;
      const offset = generations[getGenerationIndex(selectedGeneration)].offset;

      const pokemonListData = await fetchPokemonListByGeneration(limit, offset);
      setPokemonList(pokemonListData?.results);
    }

    fetchPokemonListData();
  }, [selectedGeneration]);

  return (
    <main className="flex flex-col justify-center items-center">
      <Banner />
      {/* <section className="flex w-full justify-between"> */}
      <GenerationSiderbar
        handleGeneration={handleSelectedGeneration}
        generationID={selectedGeneration}
      />

      <div className=" grid-cols-5 grid w-3/4 p-16">
        {pokemonList &&
          pokemonList.map((pokemon: PokemonList, index) => {
            return <PokemonCard url={pokemon.url} key={index} />;
          })}
      </div>
      {/* </section> */}
    </main>
  );
}
