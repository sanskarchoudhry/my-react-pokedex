import { generations } from "@/constants/generations";
import { fetchPokemonByGeneration } from "@/services/api/server/pokemonService";
import React from "react";
import GenerationSideBar from "./_components/GenerationSideBar";
import PokemonListGrid from "@/components/PokemonListGrid";

export default async function PokemonGenerationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const pokemonList = await fetchPokemonByGeneration(
    String(generations[Number(id) - 1].limit),
    String(generations[Number(id) - 1].offset)
  );

  return (
    <div>
      <GenerationSideBar genID={id} />
      <PokemonListGrid pokemonList={pokemonList} />
    </div>
  );
}
