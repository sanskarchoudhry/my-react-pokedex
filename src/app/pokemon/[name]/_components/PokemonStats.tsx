"use client";
import { usePokemonDetails } from "@/context/PokemonDetailsContext";
import {
  fetchPokemonData,
  PokemonData,
} from "@/services/api/server/pokemonService";
import { getFlattenedStats } from "@/utils/flattenStat";
import { colorBars } from "@/utils/interpolateColors";
import { useEffect, useState } from "react";

export default function PokemonStats() {
  const { pokemonForm } = usePokemonDetails();
  const [pokemonData, setPokemonData] = useState<PokemonData>();
  useEffect(() => {
    async function fetchData() {
      const data = await fetchPokemonData(pokemonForm);
      setPokemonData(data);
    }

    fetchData();
  }, [pokemonForm]);

  const flattenedStats = pokemonData
    ? getFlattenedStats(pokemonData.stats)
    : [];
  const totalStat = flattenedStats.reduce(
    (sum, stat) => sum + Number(stat.value),
    0
  );

  return (
    <section className="py-2 md:px-6 w-[70%]">
      {pokemonData && (
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="font-bold text-3xl capitalize text-center mb-6 text-gray-800">
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
