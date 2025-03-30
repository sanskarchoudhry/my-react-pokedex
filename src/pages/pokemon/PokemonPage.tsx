import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchPokemonData,
  PokemonData,
} from "../../services/api/pokemonService";
import EvolutionChain from "./_components/EvolutionChain";

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

  return (
    <div>
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
          <EvolutionChain url={pokemonData?.species?.url} />
        </div>
      )}
    </div>
  );
}
