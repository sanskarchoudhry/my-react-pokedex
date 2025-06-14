import React, { useEffect, useState } from "react";
import {
  FlattenedStat,
  getFlattenedStats,
  Stat,
} from "../../../utils/flattenStatsArray";
import { fetchPokemonData } from "../../../services/api/pokemonService";

export default function StatsWrapper({ pokemonName }: { pokemonName: string }) {
  const [pokemonStatData, setPokemonStatData] = useState<Stat[]>();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchPokemonData(void 0, pokemonName);
        setPokemonStatData(data.stats);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [pokemonName]);

  return (
    <div>
      {pokemonStatData &&
        getFlattenedStats(pokemonStatData).map((stat: FlattenedStat, index) => {
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
        })}
    </div>
  );
}
