"use client";

import { usePokemonDetails } from "@/context/PokemonDetailsContext";
import {
  EvolutionChainData,
  fetchEvolutionData,
} from "@/services/api/server/evolutionService";
import {
  flattenEvolutionTree,
  getEvolutionMethod,
} from "@/utils/evolutionLine";
import { getIdFromUrl } from "@/utils/getIdFromUrl";
import { useState, useEffect } from "react";

export function EvolutionChain() {
  const { speciesData } = usePokemonDetails();

  const [evolutionChainData, setEvolutionChainData] =
    useState<EvolutionChainData>();

  useEffect(() => {
    (async () => {
      const data = await fetchEvolutionData(speciesData.evolution_chain.url);
      setEvolutionChainData(data);
    })();
  }, [speciesData]);

  if (!evolutionChainData) return null;

  const evolutionTree = flattenEvolutionTree(evolutionChainData);

  return (
    <section className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Evolution Chain
      </h2>
      <div className="space-y-8">
        {evolutionTree.map((stage, stageIndex) => (
          <div
            key={stageIndex}
            className="flex flex-col justify-center flex-wrap gap-6"
          >
            {stage.map((pokemon) => (
              <div
                key={pokemon.name}
                className="flex flex-col items-center space-y-2 w-[120px]"
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getIdFromUrl(
                    pokemon.url
                  )}.png`}
                  alt={pokemon.name}
                  className="w-20 h-20 object-contain"
                />
                <a href={`/pokemon/${getIdFromUrl(pokemon.url)}`}>
                  <div className="capitalize font-semibold text-gray-primary hover:text-link-blue hover:underline">
                    {pokemon.name}
                  </div>
                </a>

                {pokemon.evolution_details.length > 0 && (
                  <div className="text-xs text-gray-500 text-center">
                    {getEvolutionMethod(
                      pokemon.evolution_details[0],
                      pokemon.name
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
