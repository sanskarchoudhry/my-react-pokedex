import {
  EvolutionChainData,
  EvolutionDetail,
} from "@/services/api/server/evolutionService";

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

export function getEvolutionMethod(
  detail: EvolutionDetail,
  pokeName: string
): string {
  const trigger = detail.trigger.name;

  switch (trigger) {
    case "level-up": {
      const conditions: string[] = [];

      if (detail.min_level) {
        conditions.push(`Level ${detail.min_level}`);
      }
      if (detail.time_of_day) {
        conditions.push(`during ${detail.time_of_day}`);
      }
      if (detail.min_happiness !== null) {
        conditions.push(`with happiness ≥ ${detail.min_happiness}`);
      }
      if (detail.min_beauty !== null) {
        conditions.push(`with beauty ≥ ${detail.min_beauty}`);
      }
      if (detail.min_affection !== null) {
        conditions.push(`with affection ≥ ${detail.min_affection}`);
      }
      if (detail.known_move?.name) {
        conditions.push(`knowing move ${detail.known_move.name}`);
      }
      if (detail.known_move_type?.name) {
        conditions.push(`knowing ${detail.known_move_type.name}-type move`);
      }
      if (detail.location?.name) {
        conditions.push(`at ${detail.location.name}`);
      }
      if (detail.relative_physical_stats !== null) {
        const statText =
          detail.relative_physical_stats === 1
            ? "Attack > Defense"
            : detail.relative_physical_stats === -1
            ? "Defense > Attack"
            : "Attack = Defense";
        conditions.push(statText);
      }

      return `Level up ${conditions.join(", ")}`;
    }

    case "use-item":
      return `Use ${detail.item?.name ?? "specific item"}`;

    case "trade":
      if (detail.held_item?.name) {
        return `Trade while holding ${detail.held_item.name}`;
      }
      if (detail.trade_species?.name) {
        return `Trade with ${detail.trade_species.name}`;
      }
      return "Trade";

    case "shed":
      return "Level 20, empty spot in party, Pokéball in bag";

    case "spin":
      return "spin around holding Sweet";

    case "three-critical-hits":
      return "achieve 3 critical hits in one battle";

    case "take-damage":
      return "near Dusty Bowl";

    case "agile-style-move":
      return "use Psyshield Bash 20 times in Agile Style";

    case "strong-style-move":
      return "use Barb Barrage 20 times in Strong Style";

    case "recoil-damage":
      return "receive 294 recoil damage in battle";
    case "other":
      switch (pokeName) {
        case "pawmot":
          return "walk 1,000 steps in Let's Go mode";
        case "maushold":
          return "Level 25";
        case "brambleghast":
          return "walk 1,000 steps in Let's Go mode";
        case "rabsca":
          return "walk 1,000 steps in Let's Go mode";
        case "palafin":
          return "Level 38, while in multiplayer";
        case "annihilape":
          return "Use Rage Fist 20 times";
        case "kingambit":
          return "defeat 3 Bisharp that are holding Leader's Crest";
        case "gholdengo":
          return "collect 999 Coins from Roaming Form";
        default:
          return "Unknown evolution mode";
      }
      break;

    default:
      return "Unknown evolution method";
  }
}
