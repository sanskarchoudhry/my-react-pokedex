import { generations } from "@/constants/generations";
import { fetchGenerationData } from "@/services/api/server/generationService";

import { fetchMoveData } from "@/services/api/server/moveService";
import MovesListTable from "./_components/MovesListTable";

export default async function PokemonMoveRootPage() {
  const moveListData = [];

  for (const generation of generations) {
    const moveList = (await fetchGenerationData(generation.id)).moves;

    const generationMoveData = await Promise.all(
      moveList.map((move) => fetchMoveData(move.name))
    );

    moveListData.push(...generationMoveData);
  }

  return (
    <section>
      <MovesListTable moveListData={moveListData} />
    </section>
  );
}
