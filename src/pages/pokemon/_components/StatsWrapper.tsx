import React, { useEffect, useState } from "react";
import {
  FlattenedStat,
  getFlattenedStats,
} from "../../../utils/flattenStatsArray";
import {
  fetchPokemonData,
  PokemonData,
} from "../../../services/api/pokemonService";

export default function StatsWrapper({ pokemonName }: { pokemonName: string }) {
  const [pokemonData, setPokemonData] = useState<PokemonData>();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchPokemonData(void 0, pokemonName);
        setPokemonData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [pokemonName]);

  return (
    <div>
      {pokemonData && (
        <div>
          <img
            src={
              pokemonData?.sprites?.other?.["official-artwork"]?.front_default
            }
            alt={`${pokemonData?.name} image`}
          />
          {getFlattenedStats(pokemonData?.stats).map(
            (stat: FlattenedStat, index) => {
              return (
                <ul key={index}>
                  <li>
                    <span>
                      <a href={stat.url}>{stat.name}</a>
                    </span>
                    {stat.value}
                  </li>
                </ul>
              );
            }
          )}{" "}
        </div>
      )}
    </div>
  );
}
