import { useEffect, useState } from "react";
import {
  fetchPokemonData,
  fetchPokemonSpeciesData,
  PokemonData,
  PokemonSpeciesData,
} from "../../../services/api/pokemonService";
import StatsWrapper from "./StatsWrapper";
import MovesWrapper from "./MovesWrapper";
import PokemonInfo from "./PokemonInfo";
import EvolutionChain from "./EvolutionChain";
import { useParams } from "react-router-dom";

function PokemonDetails({ pokemonName }: { pokemonName: string }) {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState<PokemonData>();
  const [pokemonSpeciesData, setPokemonSpeciesData] =
    useState<PokemonSpeciesData>();
  const [selectedPokemonVariant, setSelectedPokemonVariant] = useState<string>(
    () => pokemonName
  );

  useEffect(() => {
    async function getSpeciesData() {
      const response = await fetchPokemonSpeciesData(id ?? " ");
      setPokemonSpeciesData(response);
    }

    async function getPokemonData() {
      const response = await fetchPokemonData(selectedPokemonVariant);
      setPokemonData(response);
    }

    getSpeciesData();
    getPokemonData();
  }, [selectedPokemonVariant]);

  const handlePokemonVariantChange = (pokeName: string) => {
    setSelectedPokemonVariant(pokeName);
  };

  return (
    <div className="flex flex-col gap-4 pt-8 p-16 w-[75%] bg-white mt-12 rounded-t-[20px] ">
      <h1 className="font-bold text-4xl capitalize text-center">
        {pokemonSpeciesData?.name}
      </h1>
      <ul className="flex gap-2 border-b border-b-gray-primary/20">
        {pokemonSpeciesData?.varieties &&
          pokemonSpeciesData?.varieties?.length > 1 &&
          pokemonSpeciesData?.varieties?.map((pokemon, index) => {
            return (
              <li
                onClick={() => {
                  handlePokemonVariantChange(pokemon.pokemon.name);
                }}
                key={index}
                className={`cursor-pointer p-1 px-2 rounded-t-[8px] border-[0.1px] border-gray-primary/20 border-b-white ${
                  pokemon.pokemon.name === selectedPokemonVariant
                    ? "bg-white"
                    : "bg-light-grey"
                } `}
              >
                {pokemon.pokemon.name}
              </li>
            );
          })}
      </ul>
      <PokemonInfo pokemonName={selectedPokemonVariant} />

      <StatsWrapper pokemonName={selectedPokemonVariant} />
      <EvolutionChain />
      {pokemonData && pokemonSpeciesData && (
        <MovesWrapper
          pokeMoves={pokemonData.moves}
          pokemonGeneration={pokemonSpeciesData?.generation?.url}
        />
      )}
    </div>
  );
}

export default PokemonDetails;
