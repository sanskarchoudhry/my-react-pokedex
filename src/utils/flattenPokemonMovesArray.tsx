import { versionGenerationMap, VersionGroup } from "../constants/generations";
import { NameUrl } from "../types";

export type PokemonMove = {
  move: NameUrl;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: NameUrl;
    order: number;
    version_group: {
      name: VersionGroup;
      url: string;
    };
  }[];
};

export type MoveDetails = {
  move: NameUrl;
  levelLearnedAt: number;
  learnedMethod: NameUrl;
};

type FlattenedPokemonMove = {
  [versionGroup in VersionGroup]?: MoveDetails[];
};

export const flattenedPokemonMove = (
  pokeMove: PokemonMove[]
): FlattenedPokemonMove[] => {
  const flattenMovesArray: FlattenedPokemonMove[] = [];

  for (const move of pokeMove) {
    const moveName = move.move.name;
    const moveURL = move.move.url;

    for (const item of move.version_group_details) {
      const versionGroup = item.version_group.name;
      const genIndex = Number(versionGenerationMap[versionGroup]) - 1;

      // Initialize generation entry if it doesn't exist
      if (!flattenMovesArray[genIndex]) {
        flattenMovesArray[genIndex] = {};
      }

      // Initialize versionGroup entry if it doesn't exist
      if (!flattenMovesArray[genIndex][versionGroup]) {
        flattenMovesArray[genIndex][versionGroup] = [];
      }

      // Push move details
      flattenMovesArray[genIndex][versionGroup]!.push({
        move: {
          name: moveName,
          url: moveURL,
        },
        levelLearnedAt: item.level_learned_at,
        learnedMethod: {
          name: item.move_learn_method.name,
          url: item.move_learn_method.url,
        },
      });
    }
  }

  console.log(flattenMovesArray);

  return flattenMovesArray;
};
