import {
  EvolutionChainData,
  EvolutionDetail,
} from "../services/api/evolutionService";

type EvolutionStage = {
  name: string;
  url: string;
  evolution_details: EvolutionDetail[];
};

type EvolutionTree = EvolutionStage[][];

export function flattenEvolutionTree(chain: EvolutionChainData): EvolutionTree {
  const result: EvolutionTree = [];

  // Stage 1: Base Pokémon
  result.push([
    {
      name: chain.species.name,
      url: chain.species.url,
      evolution_details: chain.evolution_details ?? [],
    },
  ]);

  // Stage 2: First Evolutions
  const firstEvolutions = chain.evolves_to.map((first) => ({
    name: first.species.name,
    url: first.species.url,
    evolution_details: first.evolution_details ?? [],
  }));

  if (firstEvolutions.length > 0) {
    result.push(firstEvolutions);
  }

  // Stage 3: Second Evolutions (e.g., final forms like Charizard)
  const secondEvolutions: EvolutionStage[] = [];
  chain.evolves_to.forEach((first) => {
    first.evolves_to.forEach((second) => {
      secondEvolutions.push({
        name: second.species.name,
        url: second.species.url,
        evolution_details: second.evolution_details ?? [],
      });
    });
  });

  if (secondEvolutions.length > 0) {
    result.push(secondEvolutions);
  }

  return result;
}
