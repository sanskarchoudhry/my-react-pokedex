import React from "react";
import { FlattenedStat } from "../../../utils/flattenStatsArray";

export default function StatsWrapper({ stats }: { stats: FlattenedStat[] }) {
  return (
    <div>
      {stats.map((stat: FlattenedStat, index) => {
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
