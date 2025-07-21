import { StatValues } from "../constants/pokemonStats";

export type Stat = {
  base_stat: string;
  effort: 0 | 1;
  stat: {
    name: string;
    url: string;
  };
};

export type FlattenedStat = {
  value: string;
  name: StatValues;
  effort: 0 | 1;
  url: string;
};

export function getFlattenedStats(stats: Stat[]): FlattenedStat[] {
  const flattenedStat: FlattenedStat[] = stats.map((stat: Stat) => {
    return {
      value: stat.base_stat,
      effort: stat.effort,
      name: stat.stat.name as StatValues,
      url: stat.stat.url,
    };
  });

  return flattenedStat;
}

// TODO: Convert value from string to number. Or check which would be better
