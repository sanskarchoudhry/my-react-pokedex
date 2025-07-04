import React, { useEffect, useState } from "react";
import { getFlattenedStats } from "../../../utils/flattenStatsArray";
import {
  fetchPokemonData,
  PokemonData,
} from "../../../services/api/pokemonService";
import { colorBars } from "../../../utils/interpolateColor";

export default function StatsWrapper({ pokemonName }: { pokemonName: string }) {
  const [pokemonData, setPokemonData] = useState<PokemonData>();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchPokemonData(pokemonName);
        setPokemonData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [pokemonName]);

  const flattenedStats = pokemonData
    ? getFlattenedStats(pokemonData.stats)
    : [];
  const totalStat = flattenedStats.reduce(
    (sum, stat) => sum + Number(stat.value),
    0
  );

  return (
    <section className="py-6 px-4 md:px-10">
      {pokemonData && (
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="font-bold text-4xl capitalize text-center mb-6 text-gray-800">
            Base Stats
          </h1>
          <ul className="space-y-4">
            {flattenedStats.map((stat, index) => {
              const color = colorBars(Number(stat.value));
              const widthPercent = Math.min(
                (Number(stat.value) / 300) * 175,
                100
              );

              return (
                <li key={index} className="flex items-center gap-4 w-full">
                  <div className="capitalize w-[150px] text-gray-600 font-medium shrink-0">
                    {stat.name}
                  </div>
                  <div className="text-sm font-semibold text-gray-700 w-10 shrink-0">
                    {stat.value}
                  </div>
                  <div className="flex-1 h-3 bg-gray-200 rounded overflow-hidden min-w-0">
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${widthPercent}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </li>
              );
            })}
            <li className="flex items-center gap-4 w-full">
              <div className="capitalize w-[150px] text-gray-600 font-medium shrink-0">
                Total
              </div>
              <div className="text-sm font-bold text-dark-gray w-10 shrink-0">
                {totalStat}
              </div>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}
