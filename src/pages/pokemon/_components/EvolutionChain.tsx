import { useEffect, useState } from "react";
import {
  EvolutionChainData,
  fetchEvolutionData,
} from "../../../services/api/evolutionService";
import { useParams } from "react-router-dom";
import { flattenEvolutionTree } from "../../../utils/evolutionLine";
import { getIdFromUrl } from "../../../utils";

export default function EvolutionChain() {
  const [evolutionChainData, setEvolutionChainData] =
    useState<EvolutionChainData>();
  const { name } = useParams();

  useEffect(() => {
    const fetchEvolutionChainData = async () => {
      if (name) {
        const response = await fetchEvolutionData(name);
        setEvolutionChainData(response);
      }
    };

    fetchEvolutionChainData();
  }, [name]);

  if (!evolutionChainData) return null;

  const evolutionTree = flattenEvolutionTree(evolutionChainData);

  return (
    <section className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Evolution Chain
      </h2>
      <div className="space-y-8">
        {evolutionTree.map((stage, stageIndex) => (
          <div key={stageIndex} className="flex justify-center flex-wrap gap-6">
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
                <div className="capitalize font-semibold text-gray-700">
                  {pokemon.name}
                </div>

                {pokemon.evolution_details.length > 0 && (
                  <div className="text-xs text-gray-500 text-center">
                    {pokemon.evolution_details[0].trigger.name === "use-item" &&
                      `Use ${
                        pokemon.evolution_details[0].item?.name ?? "item"
                      }`}
                    {pokemon.evolution_details[0].trigger.name === "level-up" &&
                      `Level up ${
                        pokemon.evolution_details[0].min_level
                          ? `at lvl ${pokemon.evolution_details[0].min_level}`
                          : ""
                      }`}
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
