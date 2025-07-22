import { NameURL } from "@/types";
import React from "react";
import AbilityTableRow from "./AbilityTableRow";

export default function AbilityTable({
  abilityList,
}: {
  abilityList: NameURL[];
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Pokemon</th>
          <th>Description</th>
          <th>Gen</th>
        </tr>
      </thead>
      <tbody>
        {abilityList.map((ability, index) => {
          return <AbilityTableRow ability={ability} key={index} />;
        })}
        <tr></tr>
      </tbody>
    </table>
  );
}
