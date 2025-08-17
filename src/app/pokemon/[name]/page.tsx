import {
  fetchPokemonData,
  fetchPokemonSpeciesData,
} from "@/services/api/server/pokemonService";
import PokemonDetailsWrapper from "./_components/PokemonDetailsWrapper";
import PokemonForms from "./_components/PokemonForms";
import PokemonStats from "./_components/PokemonStats";
import { PokemonTypeDefenses } from "./_components/PokemonTypeDefenses";
import PokemonMoves from "./_components/PokemonMoves";
import { EvolutionChain } from "./_components/EvolutinonChain";
import { formatName } from "@/utils/nameFormatter";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name: pokemonName } = await params;

  const speciesData = await fetchPokemonSpeciesData(pokemonName);

  const pokemonData = speciesData
    ? await fetchPokemonData(speciesData.id)
    : null;

  return (
    <section className="px-4">
      {pokemonData && speciesData && (
        <PokemonDetailsWrapper
          pokemonData={pokemonData}
          speciesData={speciesData}
        >
          <h1 className="font-bold text-4xl capitalize text-center text-gray-dark">
            {formatName(speciesData.name)}
          </h1>

          <PokemonForms />
          <section className="flex">
            <PokemonStats />
            <PokemonTypeDefenses />
          </section>
          <EvolutionChain />
          <PokemonMoves />
        </PokemonDetailsWrapper>
      )}
    </section>
  );
}
