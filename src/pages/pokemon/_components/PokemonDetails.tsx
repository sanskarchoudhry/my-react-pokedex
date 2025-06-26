import { useParams } from "react-router-dom";
import { useState } from "react";

import { usePokemonDetails } from "../../../hooks/usePokemonDetails";

import StatsWrapper from "./StatsWrapper";
import MovesWrapper from "./MovesWrapper";
import PokemonInfo from "./PokemonInfo";
import EvolutionChain from "./EvolutionChain";

export default function PokemonDetails() {
  const [selectedPokemonVariant, setSelectedPokemonVariant] = useState<
    string | null
  >(null);

  const { id } = useParams();

  const { pokemonData, speciesData } = usePokemonDetails(id ?? " ");

  const currentVariant = selectedPokemonVariant ?? pokemonData?.name;

  if (!speciesData) {
    return <div>Species</div>;
  }

  if (!pokemonData) return <div>Pokemon Data</div>;
  if (speciesData && pokemonData)
    return (
      <div className="flex flex-col gap-4 pt-8 p-16 w-[75%] bg-white mt-12 rounded-t-[20px]">
        <h1 className="font-bold text-4xl capitalize text-center">
          {speciesData.name}
        </h1>

        <ul className="flex gap-2 border-b border-b-gray-primary/20">
          {speciesData?.varieties?.length > 1 &&
            speciesData.varieties.map((variant, index) => (
              <li
                key={index}
                onClick={() => setSelectedPokemonVariant(variant.pokemon.name)}
                className={`cursor-pointer p-1 px-2 rounded-t-[8px] border-[0.1px] border-gray-primary/20 border-b-white ${
                  variant.pokemon.name === currentVariant
                    ? "bg-white"
                    : "bg-light-grey"
                }`}
              >
                {variant.pokemon.name}
              </li>
            ))}
        </ul>

        <PokemonInfo pokemonName={currentVariant!} />
        <StatsWrapper pokemonName={currentVariant!} />
        <EvolutionChain />
        {pokemonData.moves && speciesData.generation?.url && (
          <MovesWrapper
            pokeMoves={pokemonData.moves}
            pokemonGeneration={speciesData.generation.url}
          />
        )}
      </div>
    );
}
