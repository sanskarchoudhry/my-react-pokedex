import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchPokemonData,
  PokemonData,
} from "../../services/api/pokemonService";
import EvolutionChain from "./_components/EvolutionChain";
// import { getFlattenedStats } from "../../utils/flattenStatsArray";
// import StatsWrapper from "./_components/StatsWrapper";
import PokemonForms from "./_components/PokemonForms";
import Banner from "../../components/Banner";

export default function PokemonPage() {
  const { name } = useParams();
  const [pokemonData, setPokemonData] = useState<PokemonData>();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchPokemonData(void 0, name);
        setPokemonData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [name]);

  // if (pokemonData) {
  // console.log(getFlattenedStats(pokemonData?.stats));
  // }

  return (
    <main className="flex flex-col justify-center items-center bg-[url(/assets/images/bg-pattern.jpg)]">
      <Banner />
      {pokemonData && (
        <div className="select-none">
          <span className="">{pokemonData?.name}</span>
          {[pokemonData?.id]}
          {pokemonData?.height}
          <img
            src={
              pokemonData?.sprites?.other?.["official-artwork"]?.front_default
            }
            alt={pokemonData?.name}
          />
          <PokemonForms url={pokemonData?.species?.url} />
          <EvolutionChain url={pokemonData?.species?.url} />
          {/* <StatsWrapper stats={getFlattenedStats(pokemonData?.stats)} /> */}
        </div>
      )}
    </main>
  );
}
