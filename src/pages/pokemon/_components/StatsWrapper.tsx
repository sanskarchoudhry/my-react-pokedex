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
    <section>
      {pokemonData && (
        <div className="flex">
          {/* <img
            src={
              pokemonData?.sprites?.other?.["official-artwork"]?.front_default
            }
            alt={`${pokemonData?.name} image`}
          /> */}
          <div className="flex flex-col">
            <h1 className="font-bold text-4xl capitalize text-center">
              Base Stats
            </h1>
            <ul>
              {getFlattenedStats(pokemonData?.stats).map(
                (stat: FlattenedStat, index) => {
                  return (
                    <li key={index} className="flex">
                      <div>{stat.name}</div>
                      <div>{stat.value}</div>
                      {/* <span> */}
                      {/* <a href={stat.url}> */}
                      {/* {stat.name} */}
                      {/* </a> */}
                      {/* </span> */}
                      {/* {stat.value} */}
                    </li>
                  );
                }
              )}{" "}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
